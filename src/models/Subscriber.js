const { models, Schema, model } = require("mongoose");

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

const SubscriberSchema = Schema({
  name: String,
  email: { type: String, index: true, unique: true },
  registeredAt: Date,
  subscriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubscriptionPlan",
    },
  ],
  payments: [Object],
});

export default models.Subscriber || model("Subscriber", SubscriberSchema);
