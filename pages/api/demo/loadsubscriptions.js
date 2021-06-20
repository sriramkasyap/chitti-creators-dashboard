import Subscriber from "../../../src/models/Subscriber";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";

export default async (req, res) => {
  var subscribers = await Subscriber.find();
  var plans = await SubscriptionPlan.find();
  subscribers.forEach(async (user) => {
    var plan = Math.floor(Math.random() * (plans.length - 1));
    await Subscriber.findByIdAndUpdate(user._id, {
      $push: {
        subscriptions: plans[plan]._id,
      },
    });
    await SubscriptionPlan.findByIdAndUpdate(plans[plan]._id, {
      $push: {
        subscribers: user._id,
      },
    });
  });

  res.send({
    success: true,
  });
};
