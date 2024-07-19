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
import EditImportPage from "../page/importation/EditImportPage";
import CasePage from "../page/case/CasePage";
import AddCasePage from "../page/case/AddCasePage";
import EditCasePage from "../page/case/EditCasePage";
import DeathPage from "../page/death/DeathPage";
import AddDeathPage from "../page/death/AddDeathPage";
import EditDeathPage from "../page/death/EditDeathPage";
import DeathReportPage from "../page/deathreport/DeathReportPage";
import ExportPage from "../page/export/ExportPage";
import AddExportPage from "../page/export/AddExportPage";
import EditExportPage from "../page/export/EditExportPage";
import ADGReportPage from "../page/adgreport/ADGReportPage";

export const AppContext = createContext();

export const SidebarProvider = ({children}) => {
    const [sidebarItems, setSidebarItems] = useState(true);
    const [page, setPage] = useState('farm');
    const [editData, setEditData] = useState({});
    const endpoint = 'http://localhost:8089/porkyapi'

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

        'case': <CasePage/>,
        'addcase': <AddCasePage/>,
        'editcase': <EditCasePage/>,

        'import': <ImportPage/>,
        'addimport': <AddImportPage/>,
        'editimport': <EditImportPage/>,

        'export': <ExportPage/>,
        'addexport': <AddExportPage/>,
        'editexport': <EditExportPage/>,

        'death': <DeathPage/>,
        'adddeath': <AddDeathPage/>,
        'editdeath': <EditDeathPage/>,

        'deathraterpt': <DeathReportPage/>,
        'adgrpt': <ADGReportPage/>,
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
