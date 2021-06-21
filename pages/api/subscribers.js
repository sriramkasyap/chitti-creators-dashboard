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
        });
        if (!plans || plans.length < 1)
          throw new Error("You haven't created any plans");

        var subscriberIds = plans.reduce((list, plan) => {
          return [...list, ...plan.subscribers];
        }, []);

        var subscribers = await Subscriber.find(
          {
            _id: {
              $in: subscriberIds,
            },
          },
          {
            subscriptions: 0,
            registeredAt: 0,
            payments: 0,
          }
        );

        return res.send({
          success: true,
          subscribers,
          count: subscribers.length,
        });
      } else {
        throw new Error("Invalid Request");
      }
    } catch (error) {
      console.error(error);
      res.send(501).send({
        error: true,
        message: error.message,
      });
    }
  }),
  getIronConfig()
);
