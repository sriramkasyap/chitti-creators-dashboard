const { models, Schema, model } = require("mongoose");

/**
 * CREATOR
 *
 * id
 * fullName
 * emailId
 * password(md5Hashed)
 * shortBio
 * longBio
 * displayPicture
 * registeredAt
 * lastLoginAt
 * [SubscrptionPlans]
 * [NewsletterCategories]
 */

const CreatorSchema = new Schema({
  emailId: { type: String, index: true, unique: true },
  password: String,
  registeredAt: Date,
  lastLoginAt: Date,
  profile: {
    fullName: String,
    shortBio: String,
    longBio: String,
    displayPicture: String,
    categories: [String],
  },
  plans: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
    },
  ],
});

module.exports = models.Creator || model("Creator", CreatorSchema);
