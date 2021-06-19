import Creator from "../../../src/models/Creator";

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      var creatorId = req.query.creator;
      // Replace this with auth

      var creator = await Creator.findById(creatorId);

      if (!creator) throw new Error("User not found");

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
