const { models, Schema, model, ObjectId } = require("mongoose");

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

const newsletterSchema = Schema({
  reference: String,
  emailSubject: String,
  body: String,
  keywords: [String],
  status: { type: String, index: true },
  creator: { type: ObjectId, index: true },
  createdAt: Date,
  lastSavedAt: Date,
  sentAt: Date,
  recipients: [ObjectId],
});

module.exports = models.Newsletter || model("Newsletter", newsletterSchema);
