import Newsletter from "../../../../src/models/Newsletter";
import SubscriptionPlan from "../../../../src/models/SubscriptionPlan";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      // Publish the newsleter and send

      var creator = req.body.creatorId;
      // replace this with auth middleware
      var { newsletterId } = req.query;
      var { planId } = req.body;

      if (!(newsletterId && planId)) throw new Error("Invalid  Request");

      var newsletter = await Newsletter.findById(newsletterId);

      if (!newsletter) throw new Error("Newsletter does not exist");
      if (newsletter.status !== "draft")
        throw new Error("Only draft newsletters can be sent");

      var plan = await SubscriptionPlan.findById(planId);
      if (!plan) throw new Error("Plan does not exist");

      // Queue the newsletter to be sent to all the recipients

      newsletter.recipients = plan.subscribers;
      newsletter.status = "published";
      newsletter.lastSavedAt = Date.now();
      newsletter.sentAt = Date.now();

      newsletter.save();

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
};
