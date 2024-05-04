import mongoose, { Schema, model } from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

export default mongoose.model("Contact", contactSchema);
