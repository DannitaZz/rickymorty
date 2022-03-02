export const initialState = {
  data: [],
  count: 1,
  locations: [],
  locationCount: 1,
  infoPage: {
    currentData: [],
    page: 1,
    currentLocations: [],
    locationPage: 1,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "getData":
      const data = action.data;
      const count = action.count;
      return {
        ...state,
        data: data,
        count: count,
        infoPage: { ...state.infoPage, currentData: data, page: 1 },
      };
    case "setInfoPage":
      return {
        ...state,
        infoPage: {
          ...state.infoPage,
          page: action.page,
          currentData: action.currentData,
        },
      };
    case "getLocations":
      const locations = action.data;
      const locationCount = action.count;
      return {
        ...state,
        locations: locations,
        locationCount: locationCount,
        infoPage: {
          ...state.infoPage,
          currentLocations: locations,
          locationPage: 1,
        },
      };
    case "setLocations":
      return {
        ...state,
        infoPage: {
          ...state.infoPage,
          locationPage: action.locationPage,
          currentLocations: action.currentLocations,
        },
      };
    default:
      return { ...state };
  }
};
