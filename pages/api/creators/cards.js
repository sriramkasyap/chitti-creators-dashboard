import { withIronSession } from "next-iron-session";

import withCreatorAuth from "../../../src/middleware/withCreatorAuth";
import { getIronConfig } from "../../../src/utils";

import Creator from "../../../src/models/Creator";
import Subscriber from "../../../src/models/Subscriber";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import Newsletters from "../../../src/models/Newsletter";
import withDB from "../../../src/middleware/withDB";

export default withDB(
  withIronSession(
    withCreatorAuth(async (req, res) => {
      try {
        if (req.method === "GET") {
          const { creatorId } = req.creator;

          const creator = await Creator.findById(creatorId);
          if (!creator) throw new Error("User not found");

          const plans = await SubscriptionPlan.find({
            _id: {
              $in: creator.plans,
            },
          }).lean(true);

          if (!plans || plans.length < 1)
            throw new Error("You haven't created any plans");

          const subscriberPromises = plans.map(async (plan) => {
            const subscriberCount = await Subscriber.countDocuments({
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

          const newslettersSent = await Newsletters.countDocuments({
            creator: creatorId,
            status: "published",
          });

          const subscribers = await Promise.all(subscriberPromises);

          const subscribersByPlans = subscribers.reduce(
            (counts, { planFee, subscriberCount }) => {
              if (planFee > 0) {
                return {
                  activeCount: counts.activeCount + subscriberCount,
                  paidCount: counts.paidCount + subscriberCount,
                  paidFee: (counts.paidCount + subscriberCount) * planFee,
                };
              }
              return {
                activeCount: counts.activeCount + subscriberCount,
                paidCount: counts.paidCount,
                paidFee: counts.paidFee,
              };
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
        }
        throw new Error("Invalid Request");
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
