/* eslint-disable no-param-reassign */
import { isValidObjectId } from "mongoose";

export default function withCreatorAuth(handler) {
  return (req, res) => {
    try {
      const creator = req.session.get("creator");
      if (
        !creator ||
        !creator.creatorId ||
        !isValidObjectId(creator.creatorId)
      ) {
        if (req.method === "GET") {
          throw new Error("You have to be logged in to access this!");
        } else {
          throw new Error("You have to be logged in to perform this action!");
        }
      }

      req.creator = creator;

      return handler(req, res);
    } catch (error) {
      console.error(error);
      req.session.destroy();
      res.status(401).json({
        error: true,
        message: error.message,
      });
    }
  };
}
