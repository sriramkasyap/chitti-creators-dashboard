import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../../src/middleware/withCreatorAuth";
import withDB from "../../../../src/middleware/withDB";
import Newsletter from "../../../../src/models/Newsletter";
import { getIronConfig } from "../../../../src/utils";

export default withDB(
  withIronSession(
    withCreatorAuth(async (req, res) => {
      try {
        if (req.method === "PUT") {
          // Update a newsletter

          const { creatorId } = req.creator;

          const { newsletter } = req.body;

          const { newsletterId } = req.query;

          const prevNewsletter = await Newsletter.findById(newsletterId);
          if (prevNewsletter.status !== "draft") {
            throw new Error("Only draft newsletters can be edited");
          }

          if (!prevNewsletter.creator.equals(creatorId)) {
            throw new Error(
              "You don't have permissions to edit this newsletter"
            );
          }

          const result = await Newsletter.findByIdAndUpdate(
            newsletterId,
            {
              $set: {
                ...newsletter,
                lastSavedAt: Date.now(),
              },
            },
            {
              new: true,
            }
          );

          return res.send({
            success: true,
            newsletter: result,
          });
        }
        return res.status(404).send({
          error: true,
          message: "Invalid Request",
        });
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
