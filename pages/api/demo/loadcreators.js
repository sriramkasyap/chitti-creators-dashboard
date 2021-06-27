import Creator from "../../../src/models/Creator";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import { generateRandomString, ucFirst } from "../../../src/utils";
import crypto from "crypto";

export default async (req, res) => {
  // Load Creators
  try {
    var { data } = await fetch(
      "https://dummyapi.io/data/api/user?limit=10&page=7",
      {
        headers: {
          "app-id": "60cf03b08eb6a1260f81ff55",
        },
      }
    ).then((response) => response.json());

    var hashedPass = crypto
      .createHash("md5")
      .update(generateRandomString())
      .digest("hex");

    var allCreators = [];

    data.forEach(async (user) => {
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
        emailId: user.email,
        password: hashedPass,
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
        plans: [],
        profile: {
          fullName: `${ucFirst(user.title)}. ${user.firstName} ${
            user.lastName
          }`,
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
      allCreators.push(creator);
    });

    return res.send({
      success: true,
      allCreators,
    });
  } catch (error) {
    console.error(error);
    res.status(501).send({
      error: true,
      message: error.message,
    });
  }
};
