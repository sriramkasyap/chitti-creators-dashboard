import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../src/middleware/withCreatorAuth";
import withDB from "../../../src/middleware/withDB";
import Creator from "../../../src/models/Creator";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../../src/utils";

export default withDB(
  withIronSession(
    withCreatorAuth(async (req, res) => {
      try {
        if (req.method === "GET") {
          const { creatorId } = req.creator;

          let creator = await Creator.findById(creatorId);
          if (!creator) throw new Error("User not found");

          const plans = await SubscriptionPlan.find(
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
