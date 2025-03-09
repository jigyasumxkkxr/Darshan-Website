import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Destination',
        required: true
    },
    subtype: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    adult: {
        type: Number,
        default: 0
    },
    child: {
        type: Number,
        default: 0
    },
    infant: {
        type: Number,
        default: 0
    },
    travelDate: {
        type: Date,  
    },
    specialRequests: {
        type: String  
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    totalAmmount:{
        type: Number,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending' 
    }
}, { timestamps: true });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
