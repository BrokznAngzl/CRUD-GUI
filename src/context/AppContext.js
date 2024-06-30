import React, {createContext, useState} from 'react';
import FarmPage from "../page/farm/FarmPage";
import EditFarmPage from "../page/farm/EditFarmPage";
import AddFarmPage from "../page/farm/AddFarmPage";
import axios from "axios";
import HousingPage from "../page/housing/HousingPage";
import AddHousingPage from "../page/housing/AddHousingPage";
import EditHousing from "../page/housing/EditHousing";
import CustomerPage from "../page/customer/CustomerPage";
import AddCustomerPage from "../page/customer/AddCustomerPage";
import EditCustomerPage from "../page/customer/EditCustomerPage";
import BreedsPage from "../page/breeds/BreedsPage";
import AddBreedsPage from "../page/breeds/AddBreedsPage";
import EditBreedsPage from "../page/breeds/EditBreedsPage";
import ImportPage from "../page/importation/ImportPage";
import AddImportPage from "../page/importation/AddImportPage";

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

        'customer': <CustomerPage/>,
        'addcustomer': <AddCustomerPage/>,
        'editcustomer': <EditCustomerPage/>,

        'breeds': <BreedsPage/>,
        'addbreeds': <AddBreedsPage/>,
        'editbreeds': <EditBreedsPage/>,

        'import': <ImportPage/>,
        'addimport': <AddImportPage/>,
        'editimport': <EditBreedsPage/>
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
