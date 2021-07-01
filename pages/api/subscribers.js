import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../src/middleware/withCreatorAuth";
import Creator from "../../src/models/Creator";
import Subscriber from "../../src/models/Subscriber";
import SubscriptionPlan from "../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../src/utils";

export default withIronSession(
  withCreatorAuth(async (req, res) => {
    try {
      if (req.method === "GET") {
        var { creatorId } = req.creator;

        const { page, limit } = req.query;

        var creator = await Creator.findById(creatorId);
        if (!creator) throw new Error("Unauthorized Request");

        var plans = await SubscriptionPlan.find({
          _id: {
            $in: creator.plans,
          },
        }).lean(true);

        if (!plans || plans.length < 1)
          throw new Error("You haven't created any plans");

        var subscriberPromises = plans.map(async (plan) => {
          var planSubs = await Subscriber.find(
            {
              _id: {
                $in: plan.subscribers,
              },
            },
            {
              name: 1,
              email: 1,
              _id: 0,
            },
            {
              limit: limit || 10,
              skip: (page || 0) * (limit || 10),
            }
          ).lean(true);

          return {
            planId: plan._id,
            subscribers: planSubs,
            subscriptionType: plan.planFee === 0 ? "Free" : "Paid",
            count: planSubs.length,
          };
        });

        var totalCount = await Subscriber.count({
          subscriptions: {
            $in: creator.plans,
          },
        });

        var subscribers = await Promise.all(subscriberPromises);

        return res.send({
          success: true,
          subscribers,
          totalCount,
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
