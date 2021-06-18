// GET /newsletters - Get newsletters of the creator
// POST /newsletters - Create new Newsletter
// PUT /newsletters/{id} - Update Newsletter
// POST /newsleters/{action} - Publish newsletter
// DELETE /newsletters/{id} - delete newsletter

import Newsletter from "../../../src/models/Newsletter";

export default async (req, res) => {
  try {
    // Get newsletters by creator
    if (req.method === "GET") {
      var creator = req.query.creatorId;
      // replace this with auth middleware

      var { page, limit, status } = req.query;

      var newsletters = await Newsletter.find(
        {
          creator,
          ...(status && { status }),
        },
        null,
        {
          sort: { createdAt: -1 },
        }
      )
        .limit(limit || 10)
        .skip((limit || 10) * (page || 0));

      return res.send({
        success: true,
        newsletters,
      });
    } else if (req.method === "POST") {
      var creator = req.body.creatorId;
      // replace this with auth middleware

      var { newsletter } = req.body;

      console.log(newsletter);

      var createdLetter = new Newsletter({
        ...newsletter,
        createdAt: Date.now(),
        lastSavedAt: Date.now(),
        sentAt: null,
        creator,
        status: "draft",
        recipients: [],
      });

      createdLetter.save();

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
};
