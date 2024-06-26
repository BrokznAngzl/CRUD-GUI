import React, {useContext} from "react";
import HeaderComp from "./HeaderComp";
import {AppContext} from '../context/AppContext';

const MainContentComp = () => {
    const {page, pageComponents} = useContext(AppContext);

    return (
        <div className="flex flex-col flex-1 overflow-y-auto">
            <HeaderComp/>
            <div className="p-4">
                {/*<h1 className="text-2xl font-bold">Welcome to my dashboard!</h1>*/}
                {/*<p className="mt-2 text-gray-600">This is an example dashboard using Tailwind CSS.</p>*/}

                {pageComponents[page]}

            </div>
        </div>
    );
};

export default MainContentComp

