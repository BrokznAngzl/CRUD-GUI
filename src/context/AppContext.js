import React, {createContext, useState} from 'react';
import FarmPage from "../page/farm/FarmPage";
import EditFarmPage from "../page/farm/EditFarmPage";
import AddFarmPage from "../page/farm/AddFarmPage";
import axios from "axios";
import HousingPage from "../page/housing/HousingPage";
import AddHousingPage from "../page/housing/AddHousingPage";
import EditHousing from "../page/housing/EditHousing";

export const AppContext = createContext();

export const SidebarProvider = ({children}) => {
    const [sidebarItems, setSidebarItems] = useState(true);
    const [page, setPage] = useState('farm');
    const [editData, setEditData] = useState({});
    const endpoint = 'http://localhost:8080/porkyapi'

    const pageComponents = {
        'farm': <FarmPage/>,
        'addfarm': <AddFarmPage/>,
        'editfarm': <EditFarmPage/>,
        'housing': <HousingPage/>,
        'addhousing': <AddHousingPage/>,
        'edithousing': <EditHousing/>,
    };

    const client = axios.create({
        baseURL: endpoint,
        timeout: 10000,
    });

    return (
        <AppContext.Provider
            value={{
                sidebarItems, setSidebarItems, page, setPage, pageComponents,
                client, editData, setEditData
            }}>
            {children}
        </AppContext.Provider>
    );
};
