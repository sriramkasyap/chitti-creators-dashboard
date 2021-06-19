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
 *
 */

const SubscriberSchema = mongoose.Schema({
  name: String,
  email: { type: String, index: true },
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
    },
  ],
});

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", SubscriberSchema);
