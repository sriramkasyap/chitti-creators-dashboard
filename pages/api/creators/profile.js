import Creator from "../../../src/models/Creator";

// Update Creator profile
export default async (req, res) => {
  if (req.method === "PUT") {
    try {
      const creatorId = req.body.id;
      // After auth, the creator ID comes here

      const { profile } = req.body;
      if (!profile) throw new Error("Invalid request");

      delete profile.emailId;
      delete profile._id;

      var creator = await Creator.findById(creatorId);

      if (!creator) throw new Error("Creator does not exist");

      var result = await Creator.findByIdAndUpdate(
        creatorId,
        {
          $set: { profile },
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
};
