const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

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

const CreatorSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
    },
  ],
});

module.exports =
  mongoose.models.Creator || mongoose.model("Creator", CreatorSchema);
