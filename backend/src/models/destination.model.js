import mongoose from "mongoose";

const DestinationSchema = new mongoose.Schema({
    overview: String,
    inclusion: [
        {
            inclussion: String
        }
    ],
    exclusion: [
        {
            exclussion: String
        }
    ],
    cityOverview: [String],
    DestinationType: {
        type: String,
        enum: ['Yatra', 'Pooja'],
        required: true
    },
    transportOverview: [String],
    sightseeingOverview: [String],
    packageName: String,
    type: String,
    onePaxOccupancy: Number,
    twoPaxOccupancy: Number,
    childWithBed: Number,
    childWithOutBed: Number,
    extraAdult: Number,
    term_Condition: [
        {
            heading: String,
            term_Condition: String,
            list: [String]
        }
    ],
    cancelPolicy: [String],
    hotels: [
        {
            cityName: String,
            hotelName: String,
            hotelHeading: String,
            hotelType: String,
            roomType: String,
            noOfRoom: Number,
            mealPlan: String,
            mealDetail: String,
            hotelDescription: String,
            hotelImg: String,
            starImg: String,
            noOfNight: String,
            pax1Rate: Number,
            pax2Rate: Number,
            pax3Rate: Number,
            pax4Rate: Number,
            extraAdltRate: Number,
            extraChldRate: Number,
            optionName: String,
            emtHotelCode: String,
            rating: Number,
            formatedDate: String,
            data: String,
            selectedRoom: String,
            htlDetailImg: String
        }
    ],
    ittImg: [String],
    itinararys: [String],
    flights: [String],
    packageCode: String,
    packageType: String,
    star: Number,
    rateType: String,
    packageCotagory: String,
    noOfDays: Number,
    noOfNights: Number,
    startCity: String,
    endCity: String,
    startPoint: String,
    endPoint: String,
    packageImgUrl: String,
    gallaryImg: [
        {
            prference: Number,
            img: String,
            id: Number,
            code: String
        }
    ],
    flightStatus: Boolean,
    stayCity: String,
    error: String,
    fxdDepartureUrl: String,
    pageId: String,
    isFixdDeparture: Boolean,
    searchId: String,
    fixedDates: [String],
    code: String,
    HtmlContent: String,
    isTableItinerary: Boolean,
    tableItinerary: {
        Itinerarys: [
            {
                Days: Number,
                Heading: String,
                Itinerary: [
                    {
                        PackageId: String,
                        PackageCode: String,
                        SubPackageId: String,
                        SubPackageName: String,
                        DayNumber: String,
                        UsedType: String,
                        Time: String,
                        Description: String,
                        ItineraryCode: String,
                        Counter: Number
                    }
                ]
            }
        ]
    },
    packageIncludes: [
        {
            Available: Boolean,
            Class: String,
            Name: String
        }
    ],
    CuttingPrice: {
        IsActive: Boolean,
        Amount: Number
    },
    ItineraryDocument: String,
    isOnlineBooking: Boolean,
    policy: {
        sday: Number,
        smonth: Number,
        syear: Number,
        startDate: Date,
        endDate: Date,
        bookingType: String,
        fixdDates: [String]
    },
    fixedMonths: [
        {
            year: Number,
            month: Number,
            total: Number
        }
    ],
    usedBy: String,
    isActive: Boolean,
    currCode: String,
    currSymbol: String,
    baseCurrCode: String,
    baseCurrSymbol: String,
    conversionRate: Number,
    countryCode: String,
    toCities: [
        {
            ExName: String,
            Active: Boolean,
            CityCode: String,
            CityName: String,
            Lat: Number,
            Long: Number,
            CountryCode: String,
            Country: String,
            Airports: [String],
            BusStation: [String],
            TrainStation: [String],
            HotelCity: String,
            ActivityCity: String
        }
    ],
    contactInfo: {
        Provider: String,
        Email: String,
        Mobile: String,
        CountryCode: String
    },
    selectedOption: {
        option: String,
        twoPaxRate: Number,
        tmpPaxRate: Number,
        twoPaxRackRate: Number,
        onePaxRate: Number,
        flightRate: Number,
        year: Number,
        month: Number,
        day: Number,
        star: Number,
        flight: Number,
        train: Number,
        bus: Number,
        cab: Number,
        trains: [String],
        flights: [String],
        buses: [String],
        cabs: [String],
        searchKey: String,
        updatedOn: Date
    },
    options: [
        {
            option: String,
            twoPaxRate: Number,
            tmpPaxRate: Number,
            twoPaxRackRate: Number,
            onePaxRate: Number,
            flightRate: Number,
            year: Number,
            month: Number,
            day: Number,
            star: Number,
            flight: Number,
            train: Number,
            bus: Number,
            cab: Number,
            trains: [String],
            flights: [String],
            buses: [String],
            cabs: [String],
            searchKey: String,
            updatedOn: Date
        }
    ],
    isAvail: Boolean,
    isHide: Boolean,
    IsHide: Boolean
});

export const Destination = mongoose.model("Destination", DestinationSchema);

