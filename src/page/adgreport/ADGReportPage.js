import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import DeathApi from "../../apiurl/DeathApi";
import DeathRptApi from "../../apiurl/DeathRptApi";
import QueryFormComp from "./component/QueryFormComp";
import PDFGenerator from "../../generatepdf/PDFGenerator";
import ADGRptApi from "../../apiurl/ADGRptApi";
import ExportApi from "../../apiurl/ExportApi";

const ADGReportPage = () => {
    const {t} = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {client} = useContext(AppContext);
    const columnHeader = [t('table.export.code'), t('table.date'), t('table.weight.gain'), t('table.day'),  t('table.rate.adg')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [exportID, setExportID] = useState();
    const [allExport, setAllExport] = useState([]);

    const getAllExport = async () => {
        try {
            const response = await client.get(ExportApi.EXPORT)
            setAllExport(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllADGReport = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(ADGRptApi.REPORT)
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

    const findADGRpt = async () => {
        try {
            if (!startDate && !endDate && !exportID) {
                getAllADGReport()
            } else {
                setLoading(true)
                setTableData()
                const ADGReqModel = {
                    "startDate": startDate,
                    "endDate": endDate,
                    "exportID": exportID
                }
                const response = await client.post(ADGRptApi.FIND, ADGReqModel)
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
                getAllADGReport()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setStartDate('')
        setEndDate('')
        setExportID(null)
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.importCode} at ${record.date} ?`);
        if (result) deleteRecord(record)
    };

    const buttons = [
        {
            func: findADGRpt,
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
        getAllADGReport()
        getAllExport()
    }, []);

    return (
        <div >
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.report.adg')}
                               buttons={buttons}
                               {...{
                                   startDate,
                                   setStartDate,
                                   endDate,
                                   setEndDate,
                                   exportID, setExportID,
                                   allExport
                               }}
                />

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) =>
                                PDFGenerator.exportPDF(t, columnHeader, tableData, t('form.header.report.adg'), 'AverageDailyGain.pdf')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.report.pdf')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ? (
                <TableComp editePage={''} deleteRecord={confirmDelete} management={false} {...{tableData, columnHeader}}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default ADGReportPage