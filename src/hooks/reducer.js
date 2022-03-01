export const initialState = {
  data: [],
  count: 1,
  infoPage: {
    currentData: [],
    page: 1,
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "getData":
      const data = action.data;
      const count = action.count;
      return { ...state, data: data, count: count };
    case "setInfoPage":
      return {
        ...state,
        infoPage: {
          ...state.infoPage,
          page: action.page,
          currentData: action.currentData,
        },
      };
    default:
      return { ...state };
  }
};
