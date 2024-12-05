const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    Title: {type: String, required: true},
    Author: {type: String, required: true},
    Publisher: {type: String, required: true},
    PublicationYear: {type: Number, required: true},
    Genre: {type: String, required: true},
    Pages: {type: Number, required: true}
}, {
    timestamps: true,
});

module.exports = mongoose.model("Book", bookSchema);