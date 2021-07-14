import withDB from "../../../src/middleware/withDB";
import Subscriber from "../../../src/models/Subscriber";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";

export default withDB(async (req, res) => {
  const subscribers = await Subscriber.find();
  const plans = await SubscriptionPlan.find();
  const subPromises = subscribers.map(async (user) => {
    const plan = Math.floor(Math.random() * plans.length);
    const r1 = Subscriber.findByIdAndUpdate(user._id, {
      $push: {
        subscriptions: plans[plan]._id,
      },
    });
    const r2 = SubscriptionPlan.findByIdAndUpdate(plans[plan]._id, {
      $push: {
        subscribers: user._id,
      },
    });

    return Promise.all([r1, r2]);
  });

  Promise.all(subPromises).then((r) => {
    console.log(r);
    res.send({
      success: true,
      r,
    });
  });
});
