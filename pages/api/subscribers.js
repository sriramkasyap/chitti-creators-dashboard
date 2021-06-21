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
          var planSubs = await Subscriber.find({
            _id: {
              $in: plan.subscribers,
            },
          }).lean(true);

          return {
            planId: plan._id,
            subscribers: planSubs,
            count: planSubs.length,
          };
        });

        var subscribers = await Promise.all(subscriberPromises);
        var count = subscribers.reduce((sum, { count }) => sum + count, 0);

        return res.send({
          success: true,
          subscribers,
          count,
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
