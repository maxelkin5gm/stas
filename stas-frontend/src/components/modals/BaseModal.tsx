import React from 'react';

import cl from "./BaseModal.module.scss"
import {Button} from "antd";

interface BaseModalProps {
    children?: React.ReactNode

    onClose: () => void
}

const BaseModal = ({children, onClose}: BaseModalProps) => {
    return (
        <div className={cl.baseModal}>


            <div className={cl.baseModal__content}>

                {children}

                <Button danger type="default" size="large" onClick={onClose}>Закрыть</Button>

            </div>
        </div>
    );
};

export default BaseModal;