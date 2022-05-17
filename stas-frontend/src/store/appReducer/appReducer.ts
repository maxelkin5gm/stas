import {AppAction, AppState, AppStateActionTypes} from "./appReducer.type";

const initialStore: AppState = {
    tabIndex: 0,
    isLoading: false,
    errorModal: {
        visible: false,
        title: "",
        text: ""
    }
}

export const appReducer = (state: AppState = initialStore, action: AppAction): AppState => {
    switch (action.type) {

        case AppStateActionTypes.SET_TAB:
            return {
                ...state,
                tabIndex: action.tabIndex
            };

        case AppStateActionTypes.SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        case AppStateActionTypes.SET_ERROR_MODAL:
            return {
                ...state,
                errorModal: {
                    visible: action.visible,
                    title: action.title,
                    text: action.text
                }
            }

        default:
            return state;
    }
}