import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../../src/middleware/withCreatorAuth";
import SubscriptionPlan from "../../../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../../../src/utils";

export default withIronSession(
  withCreatorAuth(async (req, res) => {
    try {
      if (req.method === "PUT") {
        // Update a plan

        var { creatorId } = req.creator;

        var { plan } = req.body;
        var { planId } = req.query;

        // Creators should not be able to update these details
        delete plan.creator;
        delete plan.createdAt;
        delete plan.updatedAt;
        delete plan.planRZPid;
        delete plan.subscribers;

        var planToUpdate = await SubscriptionPlan.findById(planId);

        if (!planToUpdate.creator.equals(creatorId))
          throw new Error("You don't have permissions to edit this plan");

        plan = await SubscriptionPlan.findByIdAndUpdate(
          planId,
          {
            $set: {
              ...plan,
              updatedAt: Date.now(),
            },
          },
          { new: true }
        );

        return res.send({
          success: true,
          plan,
        });
      } else {
        throw new Error("Invalid request");
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
