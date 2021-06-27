import Subscriber from "../../../src/models/Subscriber";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";

export default async (req, res) => {
  var subscribers = await Subscriber.find();
  var plans = await SubscriptionPlan.find();
  var subPromises = subscribers.map(async (user) => {
    var plan = Math.floor(Math.random() * plans.length);
    var r1 = await Subscriber.findByIdAndUpdate(user._id, {
      $push: {
        subscriptions: plans[plan]._id,
      },
    });
    var r2 = await SubscriptionPlan.findByIdAndUpdate(plans[plan]._id, {
      $push: {
        subscribers: user._id,
      },
    });

    return [r1, r2];
  });

  res.send({
    success: true,
    subPromises,
  });
};
