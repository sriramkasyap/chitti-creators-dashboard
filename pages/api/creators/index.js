import Creator from "../../../src/models/Creator";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      var creatorId = req.query.creator;
      // Replace this with auth

      var creator = await Creator.findById(creatorId);

      if (!creator) throw new Error("User not found");

      var plans = await SubscriptionPlan.find(
        {
          _id: {
            $in: creator.plans,
          },
        },
        {
          subscribers: 0, // No need to send subscribers list with every  auth call
        }
      );

      creator.plans = plans;
      creator = { ...creator.toObject() };
      delete creator.password;

      return res.send({
        success: true,
        creator,
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
};
