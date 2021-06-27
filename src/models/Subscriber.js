// To be deleted after frontend deployment

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

/**
 * SUBSCRIBER
 *
 * id
 * name
 * email
 * subscriptions
 * registeredAt
 * payments
 *
 */

const SubscriberSchema = mongoose.Schema({
  name: String,
  email: { type: String, index: true, unique: true },
  registeredAt: Date,
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
    },
  ],
  payments: [Object],
});

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", SubscriberSchema);
