import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import QueryFormComp from "./component/QueryFormComp";
import {AppContext} from "../../context/AppContext";
import DataStatusMessage from "../../component/DataStatusMessage";

const FarmPage = () => {
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = ['id', 'name', 'location']
    const [tableData, setTableData] = useState()
    const [loading, setLoading] = useState(false);
    const [farmName, setFarmName] = useState();
    const [farmLocation, setFarmLocation] = useState();

    const getAllFarm = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get('/farm')
            setTableData(await response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const deleteFarm = async (record) => {
        try {
            const farm = {
                "farmID": record.farmID
            }
            const response = await client.delete('/farm', {
                data: farm
            })

            if (response.status === 204) {
                console.log('deleted successfully')
                getAllFarm()

            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setFarmName('')
        setFarmLocation('')
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`Do you want to delete ${record.farmName} ?`);
        if (result) deleteFarm(record)
    };

    const findFarm = async () => {
        try {
            if (!farmName && !farmLocation) {
                getAllFarm()
            } else {
                const farm = {
                    farmID: null,
                    farmName: farmName,
                    location: farmLocation,
                }
                setLoading(true)
                setTableData()
                const result = await client.post('/farm/find', farm);
                const queryResult = await result.data
                if (queryResult && queryResult.length > 0) {
                    setTableData(queryResult)
                }
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    useEffect(() => {
        getAllFarm()
    }, []);

    const buttons = [
        {
            func: findFarm,
            name: 'Find Farm',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },
    ]

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={'Farm'}
                               farmName={farmName} setFarmName={setFarmName}
                               farmLocation={farmLocation} setFarmLocation={setFarmLocation}
                               buttons={buttons}/>

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addfarm')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Add Farm
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg="Loading Data..." textColor={'text-gray-600'}/>
            ) : tableData ? (
                <TableComp tableData={tableData} columnHeader={columnHeader}
                           editePage={'editfarm'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg="No Data Found" textColor={'text-red-600'}/>
            )}

        </div>
    );
};

export default FarmPage;
