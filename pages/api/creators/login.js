import crypto from "crypto";
import { withIronSession } from "next-iron-session";
import Creator from "../../../src/models/Creator";
import { getIronConfig } from "../../../src/utils";
export default withIronSession(async (req, res) => {
  try {
    if (req.method === "POST") {
      // Login the Creator

      if (req.session && req.session.get("creator"))
        throw new Error("You are already logged in!");

      var { emailId, password } = req.body;
      if (!(emailId && password)) throw new Error("Invalid Credentials");

      var hashedpass = crypto.createHash("md5").update(password).digest("hex");

      var creator = await Creator.findOne({
        emailId,
      });

      if (!creator || !creator._id)
        throw new Error("Invalid Login credentials");

      if (creator.password !== hashedpass)
        throw new Error("Invalid Login credentials");

      creator = creator.toObject();
      delete creator.password;

      req.session.set("creator", {
        creatorId: creator._id,
        emailId,
      });

      await req.session.save();

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
}, getIronConfig());
