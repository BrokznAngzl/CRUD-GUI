import React, {createContext, useState} from 'react';
import FarmPage from "../page/farm/FarmPage";
import EditFarmPage from "../page/farm/EditFarmPage";
import AddFarmPage from "../page/farm/AddFarmPage";

// Create a context object
export const AppContext = createContext();

// Create a provider component
export const SidebarProvider = ({children}) => {
    const [sidebarItems, setSidebarItems] = useState(true);
    const [page, setPage] = useState('index');

    const pageComponents = {
        'farm': <FarmPage />,
        'addfarm': <AddFarmPage/>,
        'editfarm': <EditFarmPage/>,
        'werehouse': '',
    };

    return (
        <AppContext.Provider
            value={{sidebarItems, setSidebarItems, page, setPage, pageComponents}}>
            {children}
        </AppContext.Provider>
    );
};
