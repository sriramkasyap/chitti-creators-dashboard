import { withIronSession } from "next-iron-session";

import withCreatorAuth from "../../../src/middleware/withCreatorAuth";
import { getIronConfig } from "../../../src/utils";

import Creator from "../../../src/models/Creator";
import Subscriber from "../../../src/models/Subscriber";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import Newsletters from "../../../src/models/Newsletter";

export default withIronSession(
  withCreatorAuth(async (req, res) => {
    try {
      if (req.method === "GET") {
        var { creatorId } = req.creator;

        var creator = await Creator.findById(creatorId);
        if (!creator) throw new Error("User not found");

        var plans = await SubscriptionPlan.find({
          _id: {
            $in: creator.plans,
          },
        }).lean(true);

        if (!plans || plans.length < 1)
          throw new Error("You haven't created any plans");

        var subscriberPromises = plans.map(async (plan) => {
          var subscriberCount = await Subscriber.count({
            _id: {
              $in: plan.subscribers,
            },
          });

          return {
            planId: plan._id,
            planFee: plan.planFee,
            subscriberCount,
          };
        });

        var newslettersSent = await Newsletters.count({
          creator: creatorId,
          status: "published",
        });

        var subscribers = await Promise.all(subscriberPromises);

        var subscribersByPlans = subscribers.reduce(
          (counts, { planFee, subscriberCount }) => {
            if (planFee > 0) {
              return {
                activeCount: counts.activeCount + subscriberCount,
                paidCount: counts.paidCount + subscriberCount,
                paidFee: (counts.paidCount + subscriberCount) * planFee,
              };
            } else {
              return {
                activeCount: counts.activeCount + subscriberCount,
                paidCount: counts.paidCount,
                paidFee: counts.paidFee,
              };
            }
          },
          {
            activeCount: 0,
            paidCount: 0,
            paidFee: 0,
          }
        );

        return res.send({
          success: true,
          activeSubscribers: subscribersByPlans.activeCount,
          totalPaidSubscribers: subscribersByPlans.paidCount,
          revenue: subscribersByPlans.paidFee,
          newslettersSent,
        });
      } else {
        throw new Error("Invalid Request");
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
