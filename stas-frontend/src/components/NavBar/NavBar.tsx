import React from 'react';
import cl from './NavBar.module.scss'
import logo from './img/react-logo.svg';
import containers from '../../styles/containers.module.scss';
import Tab from "./Tab";
import Loader from "../Loader/Loader";

const NavBar = () => {
    return (
        <header className={cl.headerSection}>
            <div className={containers.container}>
                <div className={cl.header}>
                    <div className={cl.header__leftSide}>
                        <img src={logo} className={cl.header__logo} alt="logo"/>
                        <nav className={cl.header__nav}>
                            <Tab className={cl.header__link} classActive={cl.active} tabIndex={0}>СТАС 1</Tab>
                            <Tab className={cl.header__link} classActive={cl.active} tabIndex={1}>СТАС 2</Tab>
                            <Tab className={cl.header__link} classActive={cl.active} tabIndex={2}>СТАС 3</Tab>
                            <Tab className={cl.header__link} classActive={cl.active} tabIndex={3}>Поиск по
                                всем</Tab>
                            <Tab className={cl.header__link} classActive={cl.active} tabIndex={4}>Админ</Tab>
                            <Tab className={cl.header__link} classActive={cl.active} tabIndex={5}>Настройки</Tab>
                        </nav>
                    </div>
                    <Loader/>
                </div>
            </div>
        </header>
    );
};

export default NavBar;