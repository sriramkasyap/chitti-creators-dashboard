import crypto from "crypto";
import withDB from "../../../src/middleware/withDB";
import Creator from "../../../src/models/Creator";
import SubscriptionPlan from "../../../src/models/SubscriptionPlan";
import { generateRandomString, ucFirst } from "../../../src/utils";

export default withDB(async (req, res) => {
  // Load Creators
  try {
    const { results } = await fetch(
      "https://randomuser.me/api/?results=50"
    ).then((response) => response.json());

    const hashedPass = crypto
      .createHash("md5")
      .update(generateRandomString())
      .digest("hex");

    const dataPromises = results.map(async (user) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve) => {
        const newPlan = new SubscriptionPlan({
          planFee: 0,
          planFeatures: [
            "One Newsletter every month",
            "Includes paid promotions",
            "My Content, directly delivered",
          ],
          planRZPid: null,
          creator: null,
          subscribers: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });

        const newCreator = new Creator({
          emailId: user.email,
          password: hashedPass,
          registeredAt: Date.now(),
          lastLoginAt: Date.now(),
          plans: [],
          profile: {
            fullName: `${ucFirst(user.name.title)}. ${user.name.first} ${
              user.name.last
            }`,
            shortBio: `Hi, I am ${ucFirst(user.name.title)}. ${
              user.name.first
            } ${
              user.name.last
            }. I work as a tech consultant. I regularly write about Computers, Microprocessors and Software. Do subscribe to my newsletter to read more.
            Peace.`,
            longBio: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            `,
            displayPicture: user.picture.large,
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
        resolve({ creator });
      });
    });

    Promise.all(dataPromises).then((allCreators) => {
      res.send({
        success: true,
        allCreators,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(501).send({
      error: true,
      message: error.message,
    });
  }
});
