import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import QueryFormComp from "./component/QueryFormComp";
import CaseApi from "../../apiurl/CaseApi";

const CasePage = () => {
    const { t } = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.id'), t('table.case')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [cause, setCause] = useState();

    const getAllCase = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(CaseApi.CASE)
            setTableData(await response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const deleteCase = async (record) => {
        try {
            const caseDetail = {
                causeID: record.causeID
            }
            const response = await client.delete(CaseApi.CASE, {
                data: caseDetail
            })

            if (response.status === 204) {
                console.log('deleted successfully')
                getAllCase()

            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setCause('')
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.cause} ?`);
        if (result) deleteCase(record)
    };

    const findCase = async () => {
        try {
            if (!cause) {
                getAllCase()
            } else {
                const caseDetail = {
                    causeID: null,
                    cause: cause
                }
                setLoading(true)
                setTableData()
                const result = await client.post(CaseApi.FIND, caseDetail);
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
        getAllCase()
    }, []);

    const buttons = [
        {
            func: findCase,
            name: t('button.find.case'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },
    ]

    return (
        <div className="w-full mt-16">
            {/* form */}
            <div className={"flex justify-between"}>
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.case')} {...{
                    cause, setCause, buttons
                }}/>

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addcase')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.case.add')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ?(
                <TableComp {...{tableData, columnHeader}} management={true}
                           editePage={'editcase'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    );
};

export default CasePage;
