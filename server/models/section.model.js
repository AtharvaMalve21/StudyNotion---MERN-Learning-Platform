import mongoose from "mongoose";
const Schema = mongoose.Schema;

const sectionSchema = new Schema(
  {
    sectionName: {
      type: String,
      required: true,
    },
    subSection: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubSection",
      },
    ],
  },
  { timestamps: true }
);

const Section = mongoose.model("Section", sectionSchema);
export default Section;
