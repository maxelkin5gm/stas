import React from 'react';
import {useTypeSelector} from "../../hooks/useTypeSelector";

import cl from "./Loader.module.scss"

const Loader = () => {
    const isLoading = useTypeSelector((state) => state.app.isLoading)

    if (!isLoading) return null;

    return (
        <div className={cl.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;