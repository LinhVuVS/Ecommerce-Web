import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
    description: String,
    image: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { toJSON: { getters: true }})


const Banner = mongoose.models.Banner || mongoose.model("Banner", BannerSchema);

export default Banner;