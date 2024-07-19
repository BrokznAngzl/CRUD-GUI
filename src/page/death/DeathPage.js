import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import ImportApi from "../../apiurl/ImportApi";
import DeathApi from "../../apiurl/DeathApi";
import CaseApi from "../../apiurl/CaseApi";
import QueryFormComp from "./component/QueryFormComp";

const DeathPage = () => {
    const {t} = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.id'), t('table.date'), t('table.case'), t('table.quantity'), t('table.import.code')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [importID, setImportID] = useState();
    const [cause, setCause] = useState();
    const [quanity, setQuanity] = useState()
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
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const findDeath = async () => {
        try {
            if (!startDate && !endDate && !quanity && !cause && !importID) {
                getAllDeath()
            } else {
                setLoading(true)
                setTableData()
                const death = {
                    "startDate": startDate,
                    "endDate": endDate,
                    "quantity": quanity,
                    "cause": cause,
                    "importCode": importID
                }
                console.log(death)
                const response = await client.post(DeathApi.FIND, death)
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
        setQuanity('')
        setCause(null)
        setImportID(null)
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.importCode} at ${record.date} ?`);
        if (result) deleteRecord(record)
    };

    const buttons = [
        {
            func: findDeath,
            name: t('button.find.death'),
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
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.death')}
                               buttons={buttons}
                               {...{
                                   startDate,
                                   setStartDate,
                                   endDate,
                                   setEndDate,
                                   importID, setImportID,
                                   cause, setCause,
                                   quanity, setQuanity,
                                   allCase, allImport
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
                <TableComp {...{tableData, columnHeader}} management={true}
                           editePage={'editdeath'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default DeathPage