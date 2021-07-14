import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../../src/middleware/withCreatorAuth";
import withDB from "../../../../src/middleware/withDB";
import Creator from "../../../../src/models/Creator";
import SubscriptionPlan from "../../../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../../../src/utils";

export default withDB(
  withIronSession(
    withCreatorAuth(async (req, res) => {
      try {
        if (req.method === "POST") {
          // Add plan for the creator

          const { creatorId } = req.creator;

          const { planFee, planFeatures } = req.body;

          if (!(planFee && planFeatures)) throw new Error("Invalid request");

          let plan = new SubscriptionPlan({
            planFee,
            planFeatures,
            planRZPid: null,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            creator: creatorId,
            subscribers: [],
          });

          await plan.save();

          plan = { ...plan.toObject() };

          await Creator.findByIdAndUpdate(creatorId, {
            $push: {
              plans: plan._id,
            },
          });

          return res.send({
            success: true,
            plan,
          });
        }
        throw new Error("Invalid request");
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
