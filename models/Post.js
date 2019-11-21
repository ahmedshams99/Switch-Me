const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    goToTutorials: {
        type: [Number],
        required: true
    },
    openForDoubleSwitch: {
        type: Boolean,
        default: false,
        required: true
    },
    requestors: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "User",
        required: true
    }
    });
    module.exports = Post = mongoose.model("Post", PostSchema);