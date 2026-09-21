const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: {
            type: String,
            default: "listingimagg",
        },
        url: {
            type: String,
            default: "https://in.pinterest.com/pin/844493676349408/",
            set: (v) => v === "" ? "https://in.pinterest.com/pin/844493676349408/" : v,
        },

    },
    price: Number,
    location: String,
    country: String,
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }, ],
});


listingSchema.post("findOneAndDelete", async function(doc) {
    if (listing = doc) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews
            }
        })
    }
});





const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;