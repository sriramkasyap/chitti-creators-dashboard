// POST /creators/signup - Sign up a creator
// POST /creators/login - login as a creator
// PUT /creators/profile - Update creator profile

import Creator from "../../../src/models/Creator";
import crypto from "crypto";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      var { fullName, emailId, password } = req.body;

      if (!(fullName && emailId && password)) {
        throw new Error("Invalid details submitted");
      }

      var md5 = crypto.createHash("md5");
      var hashedPass = md5.update(password).digest("hex");

      var newPlan = new SubscriptionPlan({
        planFee: 0,
        planFeatures: [],
        planRZPid: null,
        creator: null,
        subscribers: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      var newCreator = new Creator({
        emailId,
        password: hashedPass,
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
        plans: [],
        profile: {
          fullName,
          shortBio: null,
          longBio: null,
          displayPicture: null,
          categories: [],
        },
      });

      var creator = await newCreator.save();
      var plan = await newPlan.save();

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
};
