// POST /creators/signup - Sign up a creator
// POST /creators/login - login as a creator
// PUT /creators/profile - Update creator profile

import Creator from "../../../src/models/Creator";
import crypto from "crypto";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      var { fullName, emailId, password } = req.body;

      if (!(fullName && emailId && password)) {
        throw new Error("Invalid details submitted");
      }

      var md5 = crypto.createHash("md5");
      var hashedPass = md5.update(password).digest("hex");

      var newCreator = new Creator({
        emailId,
        password: hashedPass,
        registeredAt: Date.now(),
        lastLoginAt: Date.now(),
        profile: {
          fullName,
          shortBio: null,
          longBio: null,
          displayPicture: null,
          plans: [
            {
              planFee: 0,
              planFeatures: null,
              planRZPid: null,
              createdAt: Date.now(),
              updatedAt: Date.now(),
            },
          ],
          categories: [],
        },
      });

      var creator = await newCreator.save();

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
