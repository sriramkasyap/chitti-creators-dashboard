import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../src/middleware/withCreatorAuth";
import Newsletter from "../../../src/models/Newsletter";
import { getIronConfig } from "../../../src/utils";

export default withIronSession(
  withCreatorAuth(async (req, res) => {
    try {
      if (req.method === "GET") {
        // Get newsletters by creator

        var { creatorId } = req.creator;

        var { page, limit, status } = req.query;

        page = parseInt(page) || 0;
        limit = Math.min(parseInt(limit) || 10, 50); // Don't accept to return more than 50 records

        var newsletters = await Newsletter.find(
          {
            creator: creatorId,
            ...(status && { status }),
          },
          null,
          {
            sort: { createdAt: -1 },
          }
        )
          .limit(limit)
          .skip(limit * page);

        var totalCount = await Newsletter.count({
          creator: creatorId,
        });

        return res.send({
          success: true,
          newsletters,
          page,
          limit,
          totalCount,
        });
      } else if (req.method === "POST") {
        // Create a newsletter

        var { creatorId } = req.creator;

        var { newsletter } = req.body;

        var createdLetter = new Newsletter({
          ...newsletter,
          createdAt: Date.now(),
          lastSavedAt: Date.now(),
          sentAt: null,
          creator: creatorId,
          status: "draft",
          recipients: [],
        });

        await createdLetter.save();

        return res.send({
          success: true,
          newsletter: createdLetter,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(501).send({
        error: true,
        message: error.message,
      });
    }
  }),
  getIronConfig()
);
