import React, {useContext, useState} from "react";
import {AppContext} from "../context/AppContext";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import PaginationButtonComp from "./PaginationButtonComp";

const TableComp = (props) => {
    const {setPage} = useContext(AppContext);
    const {tableData, columnHeader, deleteRecord} = props

    const [pageNumber, setPageNumber] = useState(0); // Current page number
    const recordPerPage = 10;
    const pagesVisited = pageNumber * recordPerPage;
    const pageCount = Math.ceil(tableData.length / recordPerPage);
    const displayData = tableData.slice(pagesVisited, pagesVisited + recordPerPage);

    const changePage = (selected) => {
        setPageNumber(selected);
    };

    const prevPage = () => {
        if (pageNumber > 0) setPageNumber(pageNumber - 1)
    }
    const nextPage = () => {
        if (pageNumber < pageCount - 1) setPageNumber(pageNumber + 1)
    }

    return (
        <div className="overflow-x-auto mx-5 my-4 rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                <tr>
                    {
                        columnHeader.map((column) => {
                            return (
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {column}
                                </th>
                            )
                        })
                    }

                    <th scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        manage
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    displayData.map((record) => (
                        <tr key={record.id}>
                        {
                                Object.entries(record).map(([key, value]) => (
                                    <td key={key} className="px-6 py-4 whitespace-nowrap">{value}</td>
                                ))
                            }
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                                <a onClick={(e) => setPage('editfarm')}
                                   className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                <a onClick={(e) => deleteRecord(record)}
                                   className="ml-2 text-red-600 hover:text-red-900">Delete</a>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <div className={"px-6 py-2"}>
                <div className="flex justify-start text-center overflow-hidden">
                    <button
                        onClick={prevPage}
                        className="px-2 py-1 border rounded-l text-sm text-gray-600 bg-white hover:bg-gray-100">
                        <AiFillCaretLeft/>
                    </button>
                    {
                        Array.from({length: pageCount}, (_, index) => (
                            <PaginationButtonComp index={index} changePage={changePage} pageNumber={pageNumber}/>
                        ))
                    }
                    <button
                        onClick={nextPage}
                        className="px-2 py-1 border rounded-r text-sm text-gray-600 bg-white hover:bg-gray-100">
                        <AiFillCaretRight/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableComp;
