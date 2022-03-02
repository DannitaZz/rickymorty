import { useReducer, createContext, useContext } from "react";
import { initialState, reducer } from "../hooks/reducer";

const StateContext = createContext();
const DispatchContext = createContext();

export function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useConsumer() {
  return [useContext(StateContext), useContext(DispatchContext)].map((ctx) => {
    if (ctx === undefined) throw new Error(`Provider not found`);
    return ctx;
  });
}
