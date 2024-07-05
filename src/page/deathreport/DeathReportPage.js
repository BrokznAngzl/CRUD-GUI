import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import ImportApi from "../../apiurl/ImportApi";
import DeathApi from "../../apiurl/DeathApi";
import CaseApi from "../../apiurl/CaseApi";
// import QueryFormComp from "./component/QueryFormComp";
import DeathRptApi from "../../apiurl/DeathRptApi";
import QueryFormComp from "./component/QueryFormComp";

const DeathPage = () => {
    const {t} = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.import.code'), t('table.date'), t('table.quantity'), t('table.death'),  t('table.percentage')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [importID, setImportID] = useState();
    const [allImport, setAllImport] = useState([]);

    const getAllImport = async () => {
        try {
            const response = await client.get(ImportApi.IMPORT)
            setAllImport(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllDeathReport = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(DeathRptApi.REPORT)
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

    const findDeathRpt = async () => {
        try {
            if (!startDate && !endDate && !importID) {
                getAllDeathReport()
            } else {
                setLoading(true)
                setTableData()
                const death = {
                    "startDate": startDate,
                    "endDate": endDate,
                    "importCode": importID
                }
                console.log(death)
                const response = await client.post(DeathRptApi.FIND, death)
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
                getAllDeathReport()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setStartDate('')
        setEndDate('')
        setImportID(null)
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.importCode} at ${record.date} ?`);
        if (result) deleteRecord(record)
    };

    const buttons = [
        {
            func: findDeathRpt,
            name: t('button.find.report'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },
    ]

    useEffect(() => {
        getAllDeathReport()
        getAllImport()
    }, []);

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.report.death')}
                               buttons={buttons}
                               {...{
                                   startDate,
                                   setStartDate,
                                   endDate,
                                   setEndDate,
                                   importID, setImportID,
                                   allImport
                               }}
                />

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('adddeath')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.report.pdf')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ? (
                <TableComp editePage={'editdeath'} deleteRecord={confirmDelete} management={false} {...{tableData, columnHeader}}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default DeathPage