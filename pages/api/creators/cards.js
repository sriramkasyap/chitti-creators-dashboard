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
            }
          ).lean(true);

          return {
            planId: plan._id,
            subscriptionType: plan.planFee === 0 ? "Free" : "Paid",
            subscribers: planSubs,
            count: planSubs.length,
            planFee: plan.planFee,
          };
        });

        var newsletters = await Newsletters.find();
        var publishedNewsletters = newsletters.filter(
          (newsletter) => newsletter.status === "published"
        );

        var subscribers = await Promise.all(subscriberPromises);
        var activeSubscribers = subscribers.reduce(
          (sum, { count }) => sum + count,
          0
        );
        var paidSubscribers = subscribers.find(
          (sub) => sub.subscriptionType === "Paid"
        );
        var revenue =
          paidSubscribers.planFee * paidSubscribers.subscribers.length;

        return res.send({
          success: true,
          subscribers,
          activeSubscribers,
          totalPaidSubscribers: paidSubscribers.subscribers.length,
          revenue,
          newslettersSent: publishedNewsletters.length,
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
