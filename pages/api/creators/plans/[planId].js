import SubscriptionPlan from "../../../../src/models/SubscriptionPlan";

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      // Update a plan

      var creator = req.body.creatorId;
      // replace this with auth middleware

      var { plan } = req.body;
      var { planId } = req.query;

      // Creators should not be able to update these details
      delete plan.creator;
      delete plan.createdAt;
      delete plan.updatedAt;
      delete plan.planRZPid;
      delete plan.subscribers;

      var planToUpdate = await SubscriptionPlan.findById(planId);

      if (!planToUpdate.creator.equals(creator))
        throw new Error("You don't have permissions to edit this plan");

      plan = await SubscriptionPlan.findByIdAndUpdate(
        planId,
        {
          $set: {
            ...plan,
            updatedAt: Date.now(),
          },
        },
        { new: true }
      );

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
