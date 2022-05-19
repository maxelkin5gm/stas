import {combineReducers, createStore} from "redux";
import {appReducer} from "./appReducer/appReducer";
import {stasReducer} from "./stasReducer/stasReducer";
import {searchAllReducer} from "./searchAllReducer/searchAllReducer";

export const rootReducer = combineReducers({
    app: appReducer,
    stasList: stasReducer,
    searchAll: searchAllReducer
})

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;