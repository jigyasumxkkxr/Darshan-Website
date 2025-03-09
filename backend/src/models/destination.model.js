import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
    overview: String,
    inclusion: [{ inclussion: String }],
    exclusion: [{ exclussion: String }],
    packageName: String,
    type: String,
    onePaxOccupancy: Number,
    twoPaxOccupancy: Number,
    term_Condition: [
        {
            heading: String,
            term_Condition: String,
            list: [String],
        },
    ],
    cancelPolicy: [String],
    hotels: [String],
    star: Number,
    rateType: String,
    packageCotagory: String,
    noOfDays: Number,
    noOfNights: Number,
    packageImgUrl: String,
    gallaryImg: [
        {
            prference: Number,
            img: String,
        },
    ],
    stayCity: String,
    tableItinerary: {
        Itinerarys: [
            {
                Days: Number,
                Heading: String,
                Itinerary: [
                    {
                        DayNumber: String,
                        Description:String,
                        Counter: Number,
                    },
                ],
            },
        ],
    },
    packageIncludes: [
        {
            Available: Boolean,
            Class: String,
            Name: String,
        },
    ],
    CuttingPrice: {
        IsActive: Boolean,
        Amount: Number,
    },
    isOnlineBooking: Boolean,
    policy: {
        sday: Number,
        smonth: Number,
        syear: Number,
        startDate: Date,
        endDate: Date,
        bookingType: String,
        fixdDates: [String],
    },
    currCode: String,
    currSymbol: String,
    conversionRate: Number,
    countryCode: String,
});

export const Destination = mongoose.model("Destination", DestinationSchema);

