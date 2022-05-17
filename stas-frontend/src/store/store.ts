import {combineReducers, createStore} from "redux";
import {appReducer} from "./appReducer/appReducer";
import {stasReducer} from "./stasReducer/stasReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    stasList: stasReducer,
})

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;