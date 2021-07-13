import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../src/middleware/withCreatorAuth";
import withDB from "../../../src/middleware/withDB";
import Creator from "../../../src/models/Creator";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../../src/utils";

// Update Creator profile
export default withDB(
  withIronSession(
    withCreatorAuth(async (req, res) => {
      if (req.method === "PUT") {
        try {
          const { creatorId } = req.creator;

          const { profile } = req.body;
          console.log("myp", profile);
          if (!profile) throw new Error("Invalid request");

          const creator = await Creator.findById(creatorId);

          if (!creator) throw new Error("Creator does not exist");

          const result = await Creator.findByIdAndUpdate(
            creatorId,
            {
              $set: {
                profile: {
                  ...creator.profile,
                  ...profile,
                },
              },
            },
            {
              new: true,
            }
          ).lean();

          const plans = await SubscriptionPlan.find(
            {
              _id: {
                $in: creator.plans,
              },
            },
            {
              subscribers: 0,
            }
          );

          result.plans = plans;
          delete result.password;

          res.send({
            success: true,
            creator: result,
          });
        } catch (error) {
          console.error(error);
          res.status(501).send({
            error: true,
            message: error.message,
          });
        }
      } else {
        res.status(404).send({
          error: true,
          message: "Invalid Request",
        });
      }
    }),
    getIronConfig()
  )
);
