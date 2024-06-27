import React, {useContext, useState} from "react";
import '../Stysheet.css'
import {AppContext} from '../context/AppContext';
import SideMenuComp from "./SideMenuComp";
import {TbTable} from "react-icons/tb";
import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import { TbFileReport } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";

const SidebarComp = () => {
    const {sidebarItems, setSidebarItems, page, setPage} = useContext(AppContext);
    const [tableMenu, setTableMenu] = useState(true);
    const [reportMenu, setReportMenu] = useState(false);

    const sideMenuObj = [
        {
            title: 'Farm',
            href: 'farm'
        },
        {
            title: 'Housing',
            href: 'housing'
        },
        {
            title: 'ABC',
            href: 'ABC'
        },
    ]

    const sideReportObj = [
        {
            title: 'ABC Report',
            href: 'abcreport'
        },
        {
            title: 'DFG Report',
            href: 'dfgreport'
        },
    ]

    return (
        <div className={`md:flex md:flex-col w-64 bg-gray-800 sidebar ${sidebarItems ? 'show' : 'hidden'}`}>
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <span className="text-white font-bold uppercase">Porky Database</span>
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 bg-gray-800">
                    <div>
                        <div
                            className={"flex justify-between content-between w-full hover:bg-gray-700 text-gray-100 cursor-pointer"}
                            onClick={(e) => setTableMenu(!tableMenu)}>
                            <div>
                                <p
                                    className="flex items-center px-4 py-2">
                                    <TbTable className="h-5 w-5 mr-2"/>
                                    Table
                                </p>
                            </div>
                            <div className={"flex justify-content items-center px-4 py-2"}>
                                {
                                    tableMenu ? <AiFillCaretUp/> : <AiFillCaretDown/>
                                }
                            </div>
                        </div>

                        {
                            tableMenu && <SideMenuComp sideMenu={sideMenuObj}/>
                        }
                    </div>
                    <div>
                        <div
                            className={"flex justify-between content-between w-full hover:bg-gray-700 text-gray-100 cursor-pointer"}
                            onClick={(e) => setReportMenu(!reportMenu)}>
                            <div>
                                <p
                                    className="flex items-center px-4 py-2">
                                    <TbFileReport className="h-5 w-5 mr-2"/>
                                    Report
                                </p>
                            </div>
                            <div className={"flex justify-content items-center px-4 py-2"}>
                                {
                                    reportMenu ? <AiFillCaretUp/> : <AiFillCaretDown/>
                                }
                            </div>
                        </div>

                        {
                            reportMenu && <SideMenuComp sideMenu={sideReportObj}/>
                        }
                    </div>

                </nav>
            </div>
        </div>
    );
};

export default SidebarComp