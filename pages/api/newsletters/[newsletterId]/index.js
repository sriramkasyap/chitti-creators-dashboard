import Newsletter from "../../../../src/models/Newsletter";

export default async (req, res) => {
  try {
    if (req.method === "PUT") {
      // Update a newsletter

      var creator = req.body.creatorId;
      // replace this with auth middleware

      var { newsletter } = req.body;

      const { newsletterId } = req.query;

      var prevNewsletter = await Newsletter.findById(newsletterId);
      if (prevNewsletter.status !== "draft") {
        throw new Error("Only draft newsletters can be edited");
      }

      if (!prevNewsletter.creator.equals(creator)) {
        throw new Error("You don't have permissions to edit this newsletter");
      }

      var result = await Newsletter.findByIdAndUpdate(
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
    } else {
      return res.status(404).send({
        error: true,
        message: "Invalid Request",
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
