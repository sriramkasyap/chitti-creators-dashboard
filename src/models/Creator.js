const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

const SubscrptionPlanSchema = new mongoose.Schema({
  planFee: Number,
  planFeatures: [String],
  planRZPid: { type: String, index: true },
  createdAt: Number,
  updatedAt: Number,
});

const CreatorSchema = new mongoose.Schema({
  fullName: String,
  emailId: { type: String, index: true },
  password: String,
  shortBio: String,
  longBio: String,
  displayPicture: String,
  registeredAt: Date,
  lastLoginAt: Date,
  plans: [SubscrptionPlanSchema],
  categories: [String],
});

module.exports = mongoose.model("Creator", CreatorSchema);
