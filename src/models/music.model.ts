import * as mongoose from "mongoose";

export const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: "Enter a title",
  },
  artist: {
    type: String,
    required: "Enter an artist",
  },
  genre: {
    type: String,
    required: "Enter a genre",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export const Music = mongoose.model("Music", MusicSchema);
