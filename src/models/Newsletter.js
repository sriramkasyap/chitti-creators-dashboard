const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/**
 * NEWSLETTER
 *
 * id
 * reference
 * emailSubject
 * body
 * status [ draft, published, deleted ]
 * createdAt
 * creator
 * lastSavedAt
 * sentAt
 * recipients
 * keywords
 *
 */

const newsletterSchema = mongoose.Schema({
  reference: String,
  emailSubject: String,
  body: String,
  status: { type: String, index: true },
  creator: mongoose.ObjectId,
  createdAt: Date,
  lastSavedAt: Date,
  sentAt: Date,
  recipients: [mongoose.ObjectId],
  keywords: [String],
});

module.exports = mongoose.model("Newsletter", newsletterSchema);
