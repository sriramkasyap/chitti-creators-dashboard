import { isValidObjectId } from "mongoose";
import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../../src/middleware/withCreatorAuth";
import withDB from "../../../../src/middleware/withDB";
import SubscriptionPlan from "../../../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../../../src/utils";

export default withDB(
  withIronSession(
    withCreatorAuth(async (req, res) => {
      try {
        if (req.method === "PUT") {
          // Update a plan

          const { creatorId } = req.creator;

          let { plan } = req.body;
          const { planId } = req.query;

          // Creators should not be able to update these details
          delete plan.creator;
          delete plan.createdAt;
          delete plan.updatedAt;
          delete plan.planRZPid;
          delete plan.subscribers;

          const planToUpdate = await SubscriptionPlan.findById(planId);

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
        }
        if (req.method === "GET") {
          const { planId } = req.query;

          if (!isValidObjectId(planId))
            throw new Error("The requested plan does not exist");

          const plan = await SubscriptionPlan.findById(planId).lean();

          if (plan && plan._id) {
            return res.send({
              success: true,
              plan,
            });
          }
          throw new Error("The requested plan does not exist");
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
  )
);
