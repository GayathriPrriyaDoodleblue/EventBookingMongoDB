import mongoose from "mongoose";

mongoose.connect('mongodb://127.0.0.1:27017/event',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

mongoose.connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
});