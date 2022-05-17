import React from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";
import {useTypeDispatch} from "../../hooks/useTypeDispatch";

import {AppStateActionTypes} from "../../store/appReducer/appReducer.type";

interface TabProps {
    children: React.ReactNode,
    className?: string,
    classActive: string,
    tabIndex: number
}

const Tab = ({children, className, classActive, tabIndex}: TabProps) => {

    const tabIndexStore = useTypeSelector((state) => state.app.tabIndex);
    const dispatch = useTypeDispatch()

    const classNameCalc = (tabIndexStore === tabIndex) ? `${className} ${classActive}` : className;

    return (
        <button
            className={classNameCalc}
            onClick={() => dispatch({
                type: AppStateActionTypes.SET_TAB,
                tabIndex: tabIndex
            })}
        >{children}</button>
    );
};

export default Tab;