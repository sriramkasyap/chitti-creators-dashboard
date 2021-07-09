import { withIronSession } from "next-iron-session";
import withCreatorAuth from "../../../src/middleware/withCreatorAuth";
import withDB from "../../../src/middleware/withDB";
import Newsletter from "../../../src/models/Newsletter";
import { getIronConfig } from "../../../src/utils";

export default withDB(
  withIronSession(
    withCreatorAuth(async (req, res) => {
      try {
        if (req.method === "GET") {
          // Get newsletters by creator

          const { creatorId } = req.creator;

          const { status } = req.query;
          let { page, limit } = req.query;

          page = parseInt(page, 10) || 0;
          limit = Math.min(parseInt(limit, 10) || 10, 50); // Don't accept to return more than 50 records

          const newsletters = await Newsletter.find(
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

          const totalCount = await Newsletter.countDocuments({
            creator: creatorId,
            ...(status && { status }),
          });

          return res.send({
            success: true,
            newsletters,
            page,
            limit,
            totalCount,
          });
        }
        if (req.method === "POST") {
          // Create a newsletter

          const { creatorId } = req.creator;

          const { newsletter } = req.body;

          if (
            !newsletter ||
            !newsletter.reference ||
            !newsletter.emailSubject ||
            !newsletter.keywords ||
            !newsletter.body
          )
            throw new Error("Invalid Request");

          const createdLetter = new Newsletter({
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
  )
);
