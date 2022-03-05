import rickymorty from "../img/rickymorty.png";
const defaultImg = rickymorty;
const numCharacters = 821;
const numEpisodes = 51;

let initialAlbumCharacters = Array(numCharacters).fill({
  id: 9999,
  name: "Not obtained",
  image: rickymorty,
});

let initialAlbumEpisodes = Array(numEpisodes).fill({
  id: 9999,
  name: "Not obtained",
  image: rickymorty,
});

if (localStorage.getItem("albumCharacters") !== null) {
  initialAlbumCharacters = JSON.parse(localStorage.getItem("albumCharacters"));
}

if (localStorage.getItem("albumEpisodes") !== null) {
  initialAlbumEpisodes = JSON.parse(localStorage.getItem("albumEpisodes"));
}

export const initialState = {
  data: [],
  albumCharacters: initialAlbumCharacters,
  albumEpisodes: initialAlbumEpisodes,
  originData: [],
  count: numCharacters,
  locations: [],
  locationCount: numEpisodes,
  episodesCount: numEpisodes,
  originCount: 1,
  infoPage: {
    currentData: [],
    page: 1,
    currentLocations: [],
    locationPage: 1,
    currentOriginData: [],
    originPage: 1,
  },
  packPage: {
    timerVal: 0,
    currentCards: Array(5).fill({
      id: 0,
      name: "Loading",
      type: "episode",
      image: defaultImg,
    }),
    packs: Array(4).fill(true),
  },
  albumPage: {
    charPage: 1,
    currentChars: [...initialAlbumCharacters.slice(0, 20)],
    epiPage: 1,
    currentEpis: [...initialAlbumEpisodes.slice(0, 20)],
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
    case "setTimer":
      return {
        ...state,
        packPage: { ...state.packPage, timerVal: action.value },
      };
    case "setCardPack":
      return {
        ...state,
        packPage: { ...state.packPage, currentCards: action.results },
      };
    case "closePack":
      const currentPacks = state.packPage.packs;
      let packs = currentPacks;
      packs[action.value] = false;
      if (packs.every((item) => !item)) {
        return {
          ...state,
          packPage: { ...state.packPage, packs: Array(4).fill(true) },
        };
      } else {
        return { ...state };
      }
    case "setOrigins":
      const arrayOrigins = Object.entries(action.originData);
      const originsFiltered = arrayOrigins.filter((e) => e[0] !== "unknown");
      return {
        ...state,
        countOrigin: arrayOrigins.length,
        infoPage: {
          ...state.infoPage,
          currentOriginData: originsFiltered,
        },
      };
    case "setOriginPage":
      return {
        ...state,
        infoPage: { ...state.infoPage, originPage: action.page },
      };
    case "addItem":
      if (action.value.itemType === "character") {
        let newAlbumCharacters = [...state.albumCharacters];
        newAlbumCharacters[action.value.itemId] = action.value.data;
        localStorage.setItem(
          "albumCharacters",
          JSON.stringify(newAlbumCharacters)
        );
        return { ...state, albumCharacters: newAlbumCharacters };
      } else if (action.value.itemType === "episode") {
        let newAlbumEpisodes = [...state.albumEpisodes];
        newAlbumEpisodes[action.value.itemId] = action.value.data;
        localStorage.setItem("albumEpisodes", JSON.stringify(newAlbumEpisodes));
        return { ...state, albumEpisodes: newAlbumEpisodes };
      } else {
        return { ...state };
      }
    case "setAlbumCharPage":
      return {
        ...state,
        albumPage: {
          ...state.albumPage,
          charPage: action.page,
          currentChars: action.currentAlbum,
        },
      };
    case "setAlbumEpiPage":
      return {
        ...state,
        albumPage: {
          ...state.albumPage,
          epiPage: action.page,
          currentEpis: action.currentAlbum,
        },
      };
    default:
      return { ...state };
  }
};
