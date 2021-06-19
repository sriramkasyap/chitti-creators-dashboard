const { Schema, model, models } = require("mongoose");

const SubscriptionPlanSchema = new Schema({
  planFee: Number,
  planFeatures: [String],
  planRZPid: { type: String, index: true },
  createdAt: Date,
  updatedAt: Date,
  creator: {
    type: Schema.Types.ObjectId,
    ref: "Creator",
  },
  subscribers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subscriber",
    },
  ],
});

export default models.SubscriptionPlan ||
  model("SubscriptionPlan", SubscriptionPlanSchema);
