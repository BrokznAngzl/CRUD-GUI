import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import FormComp from "./component/FormComp";
import {AppContext} from "../../context/AppContext";
import DataStatusMessage from "../../component/DataStatusMessage";

const FarmPage = () => {
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = ['id', 'name', 'location']
    const [tableData, setTableData] = useState()
    const [loading, setLoading] = useState(false);

    const getAllFarm = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get('/farm')
            setTableData(await response.data)
            setLoading(false)
        }
        catch (error) {
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

    useEffect(() => {
        getAllFarm()
    }, []);

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <FormComp toggleForm={setQueryForm} showForm={queryForm}/>

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
                <TableComp tableData={tableData} columnHeader={columnHeader} deleteRecord={deleteFarm} />
            ) : (
                <DataStatusMessage msg="No Data Found" textColor={'text-red-600'}/>
            )}

        </div>
    );
};

export default FarmPage;
