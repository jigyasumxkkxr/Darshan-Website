import { useState } from "react";
import { Button } from "@/components/ui/button";
import BasicDetailsForm from "./addTour/BasicDetailsForm";
import PricingDetailsForm from "./addTour/PricingDetailsForm";
import HotelDetailsForm from "./addTour/HotelDetailsForm";
import { PolicyDetailsForm } from "./addTour/PolicyDetailsForm";
import ItineraryDetailsForm from "./addTour/ItineraryDetailsForm";
import InclusionsExclusionsForm from "./addTour/InclusionsExclusionsForm";
import GalleryForm from "./addTour/GalleryForm";
import { AdditionalOptionsForm } from "./addTour/AdditionalOptionsForm";
import PackageDetailsForm from "./addTour/BasicDetailsForm";
import PackageIncludesForm from "./addTour/PackageIncludesForm ";
import TermsConditionsForm from "./addTour/TermsConditionsForm";
import { useAddDestination } from "@/hooks/destination.hook";

export default function AddDestinationTour() {

    const {loading, callApi:AddDestination} = useAddDestination();

    const [formData, setFormData] = useState({
        overview: "",
        packageName: "",
        packageCode: "",
        DestinationType: "Yatra",
        packageType: "",
        rateType: "",
        packageCotagory: "",
        startCity: "",
        endCity: "",
        startPoint: "",
        endPoint: "",
        stayCity: "",
        onePaxOccupancy: 0,
        twoPaxOccupancy: 0,
        childWithBed: 0,
        childWithOutBed: 0,
        extraAdult: 0,
        cityOverview: [],
        transportOverview: [],
        sightseeingOverview: [],
        hotels: [],
        tableItinerary: {
          Itinerarys: [],
        },
        cancelPolicy: [],
        policy: {},
        flights: [],
        contactInfo: {},
        packageImgUrl: "",
        gallaryImg: [],
        isOnlineBooking: false,
        isActive: false,
      
        // Newly added fields
        term_Condition: [
          {
            heading: "",
            term_Condition: "",
            list: [""],
          },
        ],
        noOfDays: 0,
        noOfNights: 0,
        currSymbol: "",
        currCode: "",
        conversionRate: 0,
        countryCode: "",
        packageIncludes: [
          {
            Available: false,
            Class: "",
            Name: "",
          },
        ],
        CuttingPrice: {
          IsActive: false,
          Amount: 0,
        },
      });
      


    const handleSubmit = async() => {
        console.log("Final Form Data:", formData);
        const res = await AddDestination(formData);
        if(res) {
            console.log("Destination Added Successfully");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Add Destination Tour</h1>

            <PackageDetailsForm formData={formData} setFormData={setFormData} />
            <PricingDetailsForm data={formData} setData={setFormData} />
            <HotelDetailsForm data={formData} setData={setFormData} />
            <PolicyDetailsForm formData={formData} setFormData={setFormData} />
            <ItineraryDetailsForm formData={formData} setFormData={setFormData} />
            <InclusionsExclusionsForm formData={formData} setFormData={setFormData} />
            <GalleryForm formData={formData} setFormData={setFormData} />
            <TermsConditionsForm formData={formData} setFormData={setFormData} />
            <PackageIncludesForm formData={formData} setFormData={setFormData}  />

            <Button className="mt-4 w-full" onClick={handleSubmit}>
                {loading? 'Loading...': 'Submit'}
            </Button>
        </div>
    );
}
