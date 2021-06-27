const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
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
  keywords: [String],
  status: { type: String, index: true },
  creator: { type: mongoose.ObjectId, index: true },
  createdAt: Date,
  lastSavedAt: Date,
  sentAt: Date,
  recipients: [mongoose.ObjectId],
});

module.exports =
  mongoose.models.Newsletter || mongoose.model("Newsletter", newsletterSchema);
