import { withIronSession } from "next-iron-session";
import { sendMail } from "../../../../src/helpers/mailHelper";
import withCreatorAuth from "../../../../src/middleware/withCreatorAuth";
import Creator from "../../../../src/models/Creator";
import Newsletter from "../../../../src/models/Newsletter";
import SubscriptionPlan from "../../../../src/models/SubscriptionPlan";
import { getIronConfig, tablifyEmailer } from "../../../../src/utils";

export default withIronSession(
  withCreatorAuth(async (req, res) => {
    try {
      if (req.method === "POST") {
        // Publish the newsleter and send

        var { creatorId, emailId } = req.creator;

        var { newsletterId } = req.query;
        var { planId } = req.body;

        if (!(newsletterId && planId)) throw new Error("Invalid  Request");

        var newsletter = await Newsletter.findById(newsletterId);

        if (!newsletter) throw new Error("Newsletter does not exist");
        if (newsletter.status !== "draft")
          throw new Error("Only draft newsletters can be sent");

        if (!newsletter.creator.equals(creatorId))
          throw new Error("You are not authorized to perform this action.");

        var plan = await SubscriptionPlan.findById(planId);
        if (!plan) throw new Error("Plan does not exist");

        var creator = await Creator.findById(creatorId);

        // Queue the newsletter to be sent to all the recipients

        newsletter.recipients = plan.subscribers;
        newsletter.status = "published";
        newsletter.lastSavedAt = Date.now();
        newsletter.sentAt = Date.now();
        var tabled = tablifyEmailer(newsletter.body);

        await sendMail(
          creator.emailId,
          creator.fullName,
          newsletter.emailSubject,
          tabled
        );

        await newsletter.save();

        return res.send({
          success: true,
          newsletter,
        });
      } else {
        res.status(404).send({
          error: true,
          message: "Invalid Request",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(501).send({
        error: true,
        message: error.message,
      });
    }
  }),
  getIronConfig()
);
