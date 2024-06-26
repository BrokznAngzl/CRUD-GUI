import React from 'react';
import SidebarComp from "../component/SidebarComp";
import MainContentComp from "../component/MainContentComp";
import {SidebarProvider} from '../context/AppContext';


const IndexPage = () => {
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-gray-100">
                <SidebarComp/>
                <MainContentComp/>
            </div>
        </SidebarProvider>

    );
};

export default IndexPage;
