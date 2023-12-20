import mongoose, { Schema } from "mongoose";

const OfferSchema = new Schema(
  {
    temp: String,
  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.models.Offer || mongoose.model("Offer", OfferSchema);

export default Offer;
