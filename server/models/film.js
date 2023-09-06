import mongoose from 'mongoose';

const FilmShema = mongoose.Schema ({
    poster: {
        _id: String,
        url: String,
        previewUrl: String,
      },
      id: { type: Number, required: true},
      type: String,
      name: String,
      description: String,
      shortDescription: String,
      year: Number
      
})

export default mongoose.model("Film", FilmShema);
