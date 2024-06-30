import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import QueryFormComp from "./component/QueryFormComp";
import {AppContext} from "../../context/AppContext";
import DataStatusMessage from "../../component/DataStatusMessage";
import HousingApi from "../../apiurl/HousingApi";
import BreedsApi from "../../apiurl/BreedsApi";
import ImportApi from "../../apiurl/ImportApi";

const ImportPage = () => {
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = ['id', 'date', 'breeds', 'housing', 'average weight', 'quantity']
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState();
    const [avgWeight, setAvgWeight] = useState()
    const [quanity, setQuanity] = useState()
    const [breeds, setBreeds] = useState();
    const [housingID, setHousingID] = useState();
    const [allHousing, setAllHousing] = useState([]);
    const [allBreeds, setAllBreeds] = useState([]);

    const getAllBreeds = async () => {
        try {
            const response = await client.get(BreedsApi.BREEDS)
            setAllBreeds(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllHousing = async () => {
        try {
            const response = await client.get(HousingApi.HOUSING)
            setAllHousing(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllImport = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(ImportApi.IMPORT)
            setTableData(await response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const findImport = async () => {
        try {
            const importation = {
                "date": date,
                "avgWeight": avgWeight,
                "quanity": quanity,
                "breeds": breeds,
                "housingID": housingID,
            }
            const response = await client.post(ImportApi.FIND, importation)
            setTableData(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteImport = async (record) => {
        try {
            const importation = {
                "importID": record.importID
            }
            const response = await client.delete(ImportApi.IMPORT, {
                data: importation
            })

            if (response.status === 204) {
                console.log('deleted successfully')
                getAllHousing()

            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setDate('')
        setBreeds('')
        setAvgWeight('')
        setQuanity('')
        setHousingID('')
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`Do you want to delete ${record.breedsName} at ${record.date} ?`);
        if (result) deleteImport(record)
    };

    const buttons = [
        {
            func: findImport,
            name: 'Find Import',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },

    ]

    useEffect(() => {
        getAllImport()
        getAllBreeds()
        getAllHousing()
    }, []);

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={'Import'} buttons={buttons}
                               {...{
                                   date, setDate, breeds, setBreeds, housingID, setHousingID, avgWeight, setAvgWeight,
                                   quanity, setQuanity, allBreeds, allHousing
                               }}
                />

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addimport')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Add Housing
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg="Loading Data..." textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ? (
                <TableComp tableData={tableData} columnHeader={columnHeader}
                           editePage={'editImport'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg="No Data Found" textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default ImportPage