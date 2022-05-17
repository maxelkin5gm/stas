import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./store/store";

import './styles/index.css';
import 'antd/dist/antd.min.css';
import containers from "./styles/containers.module.scss";

import NavBar from "./components/NavBar/NavBar";
import StasTab from "./tabs/StasTab";
import SearchAllTab from "./tabs/SearchAllTab";
import AdminTab from "./tabs/AdminTab";
import ErrorModal from "./components/modals/ErrorModal";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>

            <NavBar/>

            <div className={containers.tabContainer}>
                <StasTab stasIndex={0}/>
                <StasTab stasIndex={1}/>
                <StasTab stasIndex={2}/>

                <SearchAllTab/>

                <AdminTab/>
            </div>

            <ErrorModal/>

        </Provider>
    </React.StrictMode>
);
