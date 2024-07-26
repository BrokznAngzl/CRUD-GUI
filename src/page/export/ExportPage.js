import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import ImportApi from "../../apiurl/ImportApi";
import CustomerApi from "../../apiurl/CustomerApi";
import ExportApi from "../../apiurl/ExportApi";
import QueryFormComp from "./component/QueryFormComp";

const DeathPage = () => {
    const {t} = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.id'), t('table.date'), t('table.export.code'), t('table.quantity'),
        t('table.weight'), t('table.import.code'), t('table.customer')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [importID, setImportID] = useState();
    const [quantity, setQuantity] = useState()
    const [customer, setCustomer] = useState()
    const [exportCode, setExportCode] = useState();
    const [allImport, setAllImport] = useState([]);
    const [allCustomer, setallCustomer] = useState([]);

    const getAllCustomer = async () => {
        try {
            const response = await client.get(CustomerApi.CUSTOMER)
            setallCustomer(await response.data)
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

    const getAllExport = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(ExportApi.EXPORT)
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

    const findExport = async () => {
        try {
            if (!startDate && !endDate && !exportCode && !quantity && !importID && !customer) {
                getAllExport()
            } else {
                setLoading(true)
                setTableData()
                const exportation = {
                    "startDate": startDate,
                    "endDate": endDate,
                    "exportCode": exportCode,
                    "quantity": quantity,
                    "importID": importID,
                    "customerID": customer
                }
                console.log(exportation)
                const response = await client.post(ExportApi.FIND, exportation)
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
            const exportation = {
                "exportID": record.exportID
            }
            const response = await client.delete(ExportApi.EXPORT, {
                data: exportation
            })

            if (response.status === 204) {
                console.log('deleted successfully')
                getAllExport()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setStartDate('')
        setEndDate('')
        setQuantity('')
        setExportCode('')
        setCustomer('')
        setImportID(null)
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.exportCode} at ${record.date} ?`);
        if (result) deleteRecord(record)
    };

    const buttons = [
        {
            func: findExport,
            name: t('button.find.export'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },
    ]

    useEffect(() => {
        getAllExport()
        getAllImport()
        getAllCustomer()
    }, []);

    return (
        <div >
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.export')}
                               {...{
                                   buttons,
                                   startDate, setStartDate,
                                   endDate, setEndDate,
                                   importID, setImportID,
                                   quantity, setQuantity,
                                   allImport, allCustomer,
                                   customer, setCustomer,
                                   exportCode, setExportCode
                               }}
                />

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addexport')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.export.add')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ? (
                <TableComp {...{tableData, columnHeader}} management={true}
                           editePage={'editexport'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    )
}

export default DeathPage