import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema(
    {
        tittle: String,
        description: String,
        date: String,
        status: String
    }, {
        timestamps: true
    }
);

const Topic = mongoose.models.Topic  || mongoose.model("Topic", topicSchema)

export default Topic;