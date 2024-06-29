import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import QueryFormComp from "./component/QueryFormComp";
import {AppContext} from "../../context/AppContext";
import DataStatusMessage from "../../component/DataStatusMessage";

const HousingPage = () => {
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = ['id', 'name', 'stall quanity', 'farm']
    const [tableData, setTableData] = useState()
    const [loading, setLoading] = useState(false);
    const [housingName, setHousingName] = useState(null)
    const [stallQuanity, setStallQuanity] = useState(null);
    const [farm, setFarm] = useState(null);
    const [allFarm, setAllFarm] = useState([])

    const getAllFarm = async () => {
        try {
            const response = await client.get('/farm')
            setAllFarm(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const findHousing = async () => {
        try {
            const housing = {
                "housingName": housingName,
                "stallQuanity": stallQuanity,
                "farmID": farm
            }
            const response = await client.post('/housing/find', housing)
            setTableData(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllHousing = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get('/housing')
            setTableData(await response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const deleteHousing = async (record) => {
        try {
            const housing = {
                "housingID": record.housingID
            }
            const response = await client.delete('/housing', {
                data: housing
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
        setHousingName('')
        setStallQuanity('')
        setFarm(null)
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`Do you want to delete ${record.housingName} ?`);
        if (result) deleteHousing(record)
    };

    const buttons = [
        {
            func: findHousing,
            name: 'Find Housing',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },

    ]

    useEffect(() => {
        getAllHousing()
        getAllFarm()
    }, []);

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={'Housing'}
                               setHousingName={setHousingName} housingName={housingName}
                               setStallQuanity={setStallQuanity} stallQuanity={stallQuanity}
                               setFarm={setFarm} farm={farm} allFarm={allFarm} buttons={buttons}
                />

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addhousing')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Add Housing
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg="Loading Data..." textColor={'text-gray-600'}/>
            ) : tableData ? (
                <TableComp tableData={tableData} columnHeader={columnHeader}
                           editePage={'edithousing'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg="No Data Found" textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default HousingPage