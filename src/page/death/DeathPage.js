import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import HousingApi from "../../apiurl/HousingApi";
import BreedsApi from "../../apiurl/BreedsApi";
import ImportApi from "../../apiurl/ImportApi";
import DeathApi from "../../apiurl/DeathApi";
import CaseApi from "../../apiurl/CaseApi";
import QueryFormComp from "./component/QueryFormComp";

const DeathPage = () => {
    const {t} = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.id'), t('table.date'), t('table.case'), t('table.quantity'), t('table.import.code') ]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [importCode, setImportCode] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [avgWeight, setAvgWeight] = useState()
    const [quanity, setQuanity] = useState()
    const [breeds, setBreeds] = useState();
    const [housingID, setHousingID] = useState();
    const [allCase, setAllCase] = useState([])
    const [allImport, setAllImport] = useState([]);

    const getAllCase = async () => {
        try {
            const response = await client.get(CaseApi.CASE)
            setAllCase(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllImport = async () => {
        try {
            const response = await client.get(ImportApi.IMPORT)
            setAllImport(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllDeath = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(DeathApi.DEATH)
            const queryResult = await response.data
            if (queryResult && queryResult.length > 0) {
                setTableData(queryResult)
            }
            setLoading(false)
            console.log(queryResult)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const findDeath = async () => {
        try {
            if (!startDate && !endDate && !breeds && !housingID && !avgWeight &&!quanity && !importCode) {
                getAllDeath()
            }
            else {
                setLoading(true)
                setTableData()
                const importation = {
                    "startDate": startDate,
                    "endDate": endDate,
                    "breedsID": breeds,
                    "housingID": housingID,
                    "avgWeight": avgWeight,
                    "quanity": quanity,
                    "importCode": importCode
                }
                const response = await client.post(ImportApi.FIND, importation)
                const queryResult = await response.data
                if (queryResult && queryResult.length > 0) {
                    setTableData(queryResult)
                }
                setLoading(false)
            }
        } catch (e) {
            console.log(e)
            setLoading(false)
        }
    }

    const deleteRecord = async (record) => {
        try {
            const death = {
                "deathID": record.deathID
            }
            const response = await client.delete(DeathApi.DEATH, {
                data: death
            })

            if (response.status === 204) {
                console.log('deleted successfully')
                getAllDeath()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setStartDate('')
        setEndDate('')
        setAvgWeight('')
        setQuanity('')
        setBreeds('')
        setHousingID('')
        setImportCode('')
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.importCode} at ${record.date} ?`);
        if (result) deleteRecord(record)
    };

    const buttons = [
        {
            func: findDeath,
            name: t('button.find.import'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },
    ]

    useEffect(() => {
        getAllDeath()
        getAllImport()
        getAllCase()
    }, []);

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.death')} buttons={buttons}
                               {...{
                                   startDate,
                                   setStartDate,
                                   endDate,
                                   setEndDate,
                                   breeds,
                                   setBreeds,
                                   housingID,
                                   setHousingID,
                                   avgWeight,
                                   setAvgWeight,
                                   quanity,
                                   setQuanity,
                                   allCase,
                                   allImport,
                                   importCode,
                                   setImportCode
                               }}
                />

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('adddeath')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.death.add')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ? (
                <TableComp tableData={tableData} columnHeader={columnHeader}
                           editePage={'editdeath'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default DeathPage