import crypto from "crypto";
import { withIronSession } from "next-iron-session";
import withDB from "../../../src/middleware/withDB";
import Creator from "../../../src/models/Creator";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../../src/utils";

export default withDB(
  withIronSession(async (req, res) => {
    try {
      if (req.method === "POST") {
        // Login the Creator

        if (req.session && req.session.get("creator"))
          throw new Error("You are already logged in!");

        const { emailId, password } = req.body;
        if (!(emailId && password)) throw new Error("Invalid Credentials");

        const hashedpass = crypto
          .createHash("md5")
          .update(password)
          .digest("hex");

        let creator = await Creator.findOne({
          emailId,
        });

        if (!creator || !creator._id)
          throw new Error("Incorrect Email ID or Password!");

        if (creator.password !== hashedpass)
          throw new Error("Incorrect Email ID or Password!");

        creator = creator.toObject();
        delete creator.password;

        creator.plans = await SubscriptionPlan.find(
          {
            creator: creator._id,
          },
          {
            subscribers: 0,
          }
        ).lean();

        req.session.set("creator", {
          creatorId: creator._id,
          emailId,
        });

        await req.session.save();

        return res.send({
          success: true,
          creator,
        });
      }
      throw new Error("Invalid Request");
    } catch (error) {
      console.error(error);
      res.status(501).send({
        error: true,
        message: error.message,
      });
    }
  }, getIronConfig())
);
