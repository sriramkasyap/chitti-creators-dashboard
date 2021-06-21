import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../src/middleware/withCreatorAuth";
import Creator from "../../../src/models/Creator";
import { getIronConfig } from "../../../src/utils";

// Update Creator profile
export default withIronSession(
  withCreatorAuth(async (req, res) => {
    if (req.method === "PUT") {
      try {
        const { creatorId } = req.creator;

        const { profile } = req.body;
        if (!profile) throw new Error("Invalid request");

        var creator = await Creator.findById(creatorId);

        if (!creator) throw new Error("Creator does not exist");

        var result = await Creator.findByIdAndUpdate(
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
        );

        res.send({
          success: true,
          result,
        });
      } catch (error) {
        console.error(error);
        res.send({
          error: true,
          message: error.message,
        });
      }
    } else {
      re.status(404).send({
        error: true,
        message: "Invalid Request",
      });
    }
  }),
  getIronConfig()
);
