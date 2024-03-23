import mongoose from "mongoose";

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = async () => {
    if (!process.env.MONGODB_URI) {
      throw new Error("Please define the MONGODB_URI environment variable");
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // For Mongoose v5 and above
    });

    return db;
  };
}

export default cached;

// import cached from './lib/mongo';
// async function myFunction() {
//     const db = await cached();
//     // Use the 'db' object for your MongoDB operations (queries, updates, etc.)
//   }
