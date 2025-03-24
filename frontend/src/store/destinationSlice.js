import { createSlice } from "@reduxjs/toolkit";

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj)); // Ensures immutability

const destinationSlice = createSlice({
    name: "destination",
    initialState: {
        destinations: []
    },
    reducers: {
        setDestinations: (state, action) => {
            state.destinations = deepCopy(action.payload);
        },
        addDestinationToStore: (state, action) => {
            state.destinations = [...state.destinations, deepCopy(action.payload)];
        },
        removeDestinationFromStore: (state, action) => {
            state.destinations = state.destinations.filter(destination => destination._id !== action.payload);
        },
        updateDestinationInStore: (state, action) => {
            state.destinations = state.destinations.map(destination => {
                if (destination._id === action.payload._id) {
                    return {
                        ...deepCopy(destination),
                        ...deepCopy(action.payload), // Ensure full immutability
                        tableItinerary: action.payload.tableItinerary
                            ? {
                                ...deepCopy(action.payload.tableItinerary),
                                Itinerarys: [...(action.payload.tableItinerary.Itinerarys || [])]
                              }
                            : deepCopy(destination.tableItinerary),

                        term_Condition: action.payload.term_Condition
                            ? action.payload.term_Condition.map(condition => ({
                                ...deepCopy(condition),
                                list: [...(condition.list || [])]
                            }))
                            : deepCopy(destination.term_Condition),

                        packageIncludes: action.payload.packageIncludes
                            ? action.payload.packageIncludes.map(include => ({
                                ...deepCopy(include)
                            }))
                            : deepCopy(destination.packageIncludes),

                        CuttingPrice: action.payload.CuttingPrice
                            ? { ...deepCopy(action.payload.CuttingPrice) }
                            : deepCopy(destination.CuttingPrice),

                        policy: action.payload.policy
                            ? { ...deepCopy(action.payload.policy) }
                            : deepCopy(destination.policy),

                        flights: action.payload.flights
                            ? [...deepCopy(action.payload.flights)]
                            : deepCopy(destination.flights),

                        contactInfo: action.payload.contactInfo
                            ? { ...deepCopy(action.payload.contactInfo) }
                            : deepCopy(destination.contactInfo),

                        cityOverview: action.payload.cityOverview
                            ? [...deepCopy(action.payload.cityOverview)]
                            : deepCopy(destination.cityOverview),

                        transportOverview: action.payload.transportOverview
                            ? [...deepCopy(action.payload.transportOverview)]
                            : deepCopy(destination.transportOverview),

                        sightseeingOverview: action.payload.sightseeingOverview
                            ? [...deepCopy(action.payload.sightseeingOverview)]
                            : deepCopy(destination.sightseeingOverview),

                        hotels: action.payload.hotels
                            ? [...deepCopy(action.payload.hotels)]
                            : deepCopy(destination.hotels),

                        cancelPolicy: action.payload.cancelPolicy
                            ? [...deepCopy(action.payload.cancelPolicy)]
                            : deepCopy(destination.cancelPolicy),

                        gallaryImg: action.payload.gallaryImg
                            ? [...deepCopy(action.payload.gallaryImg)]
                            : deepCopy(destination.gallaryImg)
                    };
                }
                return deepCopy(destination);
            });
        }
    }
});

export const { setDestinations, addDestinationToStore, removeDestinationFromStore, updateDestinationInStore } = destinationSlice.actions;
export default destinationSlice.reducer;
