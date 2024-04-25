import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "must be atleast 2 characters"],
        maxlength: [32, "must be atmost 32 characters"]
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true,
    },
    parent:{
        ObjectId,
    },
});

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subSchema);

export default SubCategory;