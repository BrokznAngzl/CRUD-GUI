import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import QueryFormComp from "./component/QueryFormComp";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import FarmApi from "../../apiurl/FarmApi";
import HousingApi from "../../apiurl/HousingApi";

const HousingPage = () => {
    const { t } = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.id'), t('table.name'), t('table.stall'), t('table.farm')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [housingName, setHousingName] = useState(null)
    const [stallQuanity, setStallQuanity] = useState(null);
    const [farm, setFarm] = useState(null);
    const [allFarm, setAllFarm] = useState([])

    const getAllFarm = async () => {
        try {
            const response = await client.get(FarmApi.FARM)
            setAllFarm(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const findHousing = async () => {
        try {
            setLoading(true)
            setTableData()
            const housing = {
                "housingName": housingName,
                "stallQuanity": stallQuanity,
                "farmID": farm
            }
            const response = await client.post(HousingApi.FIND, housing)
            const queryResult = await response.data
            if (queryResult && queryResult.length > 0) {
                setTableData(queryResult)
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    const getAllHousing = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(HousingApi.HOUSING)
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
            const response = await client.delete(HousingApi.HOUSING, {
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
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.housingName} ?`);
        if (result) deleteHousing(record)
    };

    const buttons = [
        {
            func: findHousing,
            name: t('button.find.housing'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
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
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.housing')}
                               setHousingName={setHousingName} housingName={housingName}
                               setStallQuanity={setStallQuanity} stallQuanity={stallQuanity}
                               setFarm={setFarm} farm={farm} allFarm={allFarm} buttons={buttons}
                />

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addhousing')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.housing.add')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ? (
                <TableComp tableData={tableData} columnHeader={columnHeader}
                           editePage={'edithousing'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default HousingPage