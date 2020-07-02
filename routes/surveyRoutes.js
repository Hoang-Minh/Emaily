const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const express = require("express");
const mongoose = require("mongoose");
const Survey = require("../models/Survey");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate");

router.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(",").map((email) => ({ email: email.trim() })),
    _user: req.user.id,
    dateSent: Date.now(),
  });

  // where to send email
  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();
    res.send(user);
  } catch (error) {
    res.status(422).send(error);
  }
});

router.get("/api/surveys/:surveyId/:choice", (req, res) => {
  res.send("Thanks for voting");
});

router.post("/api/surveys/webhooks", (req, res) => {
  const p = new Path("/api/surveys/:surveyId/:choice");

  const uniqueEvents = _.chain(req.body)
    .map(({ url, email }) => {
      const match = p.test(new URL(url).pathname);
      if (match) {
        return {
          email,
          surveyId: match.surveyId,
          choice: match.choice,
        };
      }
    })
    .compact() // remove undefined element
    .uniqBy("email", "surveyId")
    // we do not have to wait for sendgrid to finish, hence, no async/await for this function
    .each(({ surveyId, email, choice }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false },
          },
        },
        {
          //$set can be used to update multiple records at a given time, so if you want to use $set for this case you would have something like:
          // $set: {'recipients.$.responded': true, lastResponded: new Date()},
          // Note: You don't need lastResponded: new Date() anymore on a new line.

          // Hope that helps :)
          //
          //Mongodb's document query language requires $set in this case. However, we're using mongoose for our communication. Mongoose is the one that is allowing this behavior. It's just a little "extra" convenience it provides.
          // Behind the scenes, mongoose will convert this to a $set operator.
          // Note that $set is still required for recipients.$.responded, as it is not a "top level" assignment.
          // For clarity:
          // {
          //   thisIsTopLevel: "some value",
          //   this.is.not.topLevel.it.is.nested: "some nested value"
          // }
          //$currentDate: { lastResponded: true }  it also works
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date(),
        }
      ).exec();
    })
    .value();

  console.log(uniqueEvents);
  res.send({});
});

router.get("/api/surveys", requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });
  res.send(surveys);
});

module.exports = router;
