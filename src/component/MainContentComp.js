import React, {useContext} from "react";
import HeaderComp from "./HeaderComp";
import {AppContext} from '../context/AppContext';

const MainContentComp = () => {
    const {page, pageComponents} = useContext(AppContext);

    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            <HeaderComp/>
            <div className="p-4">
                <div className="mb-16"></div>
                {pageComponents[page]}

            </div>
        </div>
    );
};

export default MainContentComp

