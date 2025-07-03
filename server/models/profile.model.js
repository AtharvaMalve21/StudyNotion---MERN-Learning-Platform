import mongoose from "mongoose";
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    profileImage: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      enum: [
        "Student",
        "Developer",
        "Designer",
        "Teacher",
        "Professor",
        "Researcher",
        "Engineer",
        "Data Scientist",
        "Product Manager",
        "Entrepreneur",
        "Mentor",
        "Content Creator",
        "Writer",
        "Analyst",
        "Marketer",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
