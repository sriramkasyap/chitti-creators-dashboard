// POST /creators/signup - Sign up a creator
// POST /creators/login - login as a creator
// PUT /creators/profile - Update creator profile

import crypto from "crypto";
import { withIronSession } from "next-iron-session";
import withDB from "../../../src/middleware/withDB";
import Creator from "../../../src/models/Creator";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import { getIronConfig } from "../../../src/utils";

export default withDB(
  withIronSession(async (req, res) => {
    if (req.method === "POST") {
      try {
        const { fullName, emailId, password } = req.body;

        if (!(fullName && emailId && password)) {
          throw new Error("Invalid details submitted");
        }

        const md5 = crypto.createHash("md5");
        const hashedPass = md5.update(password).digest("hex");

        const newPlan = new SubscriptionPlan({
          planFee: 0,
          planFeatures: [],
          planRZPid: null,
          creator: null,
          subscribers: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        const newCreator = new Creator({
          emailId,
          password: hashedPass,
          registeredAt: Date.now(),
          lastLoginAt: Date.now(),
          plans: [],
          profile: {
            fullName,
            shortBio: null,
            longBio: null,
            displayPicture:
              "https://res.cloudinary.com/chitti/image/upload/v1625153666/displayPictures/exo4wokokwruqb62xtcj.jpg",
            categories: [],
          },
        });

        let creator = await newCreator.save();
        let plan = await newPlan.save();

        creator = await Creator.findByIdAndUpdate(
          creator._id,
          {
            $push: {
              plans: plan._id,
            },
          },
          {
            new: true,
          }
        );

        plan = await SubscriptionPlan.findByIdAndUpdate(
          plan._id,
          {
            $set: {
              creator: creator._id,
            },
          },
          {
            new: true,
          }
        );

        creator = creator.toObject();
        creator.plans = [plan];
        delete creator.password;

        req.session.set("creator", {
          emailId,
          creatorId: creator._id,
        });

        await req.session.save();

        res.send({
          success: true,
          creator,
        });
      } catch (error) {
        if (error.code && error.code === 11000) {
          return res.status(501).send({
            error: true,
            message:
              "An account already exists with this email addrress. Please Log in",
          });
        }
        console.error(typeof error);
        res.status(501).send({
          error: true,
          message: error.message,
        });
      }
    } else {
      res.status(404).send({
        error: true,
        message: "API endpoint not found",
      });
    }
  }, getIronConfig())
);
