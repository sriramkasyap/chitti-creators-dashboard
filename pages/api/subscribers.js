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

        var { page, limit } = req.query;

        limit = Math.min(parseInt(limit || 10), 50);
        page = parseInt(page || 0);

        var creator = await Creator.findById(creatorId);
        if (!creator) throw new Error("Unauthorized Request");

        var plans = await SubscriptionPlan.find({
          _id: {
            $in: creator.plans,
          },
        }) // Find the creator's plans
          .lean(true); // Get only Javascript objects

        var [paidPlan] = plans.filter((plan) => plan.planFee !== 0); // Find the paid plan

        var subscribers = await Subscriber.find(
          {
            subscriptions: {
              $in: creator.plans,
            },
          }, // Get all subscribers for the creator's plans
          {
            name: 1,
            email: 1,
            subscriptions: 1,
            _id: 0,
          }, // Project only required fields
          {
            limit,
            skip: page * limit,
          } // Limit as per pagination request
        ).lean(true);

        subscribers = subscribers.map((sub) => {
          // Determine the subscription type
          var subscriptionType = "Free";
          if (paidPlan && paidPlan._id) {
            // If the creator has a paid plan
            sub.subscriptions = sub.subscriptions.map((s) => s.toString());
            subscriptionType = sub.subscriptions.includes(
              paidPlan._id.toString()
            )
              ? "Paid"
              : "Free";
          }
          delete sub.subscriptions; // Do not send other subscriptions' details
          return {
            ...sub,
            subscriptionType,
          };
        });

        var totalCount = await Subscriber.count({
          subscriptions: {
            $in: creator.plans,
          },
        });

        return res.send({
          success: true,
          subscribers,
          totalCount,
          limit,
          page,
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
