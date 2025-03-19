import mongoose from "mongoose";

const destinationTourPackagesSchema = new mongoose.Schema({
    Heading: {type: String, required: true},
    Description: {type: String},
    Destinations:[{type:mongoose.Schema.Types.ObjectId, ref:'Destination', required:true}],
    Details:[{
        heading: {type:String},
        description: {type:String}
    }],
    FAQ: [{
        Question:String,
        Answer:String
    }]
});

export const DestinationTourPackages = mongoose.model("DestinationTourPackages", destinationTourPackagesSchema);