import Creator from "../../../../src/models/Creator";
import SubscriptionPlan from "../../../../src/models/SubscriptionPlan";

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      // Add plan for the creator

      var creator = req.body.creatorId;
      // replace this with auth middleware

      var { planFee, planFeatures } = req.body;

      if (!(planFee && planFeatures)) throw new Error("Invalid request");

      var plan = new SubscriptionPlan({
        planFee,
        planFeatures,
        planRZPid: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        creator,
        subscribers: [],
      });

      await plan.save();

      plan = { ...plan.toObject() };

      await Creator.findByIdAndUpdate(creator, {
        $push: {
          plans: plan._id,
        },
      });

      return res.send({
        success: true,
        plan,
      });
    } else {
      throw new Error("Invalid request");
    }
  } catch (error) {
    console.error(error);
    res.status(501).send({
      error: true,
      message: error.message,
    });
  }
};
