import React, {useContext, useEffect, useState} from "react";
import TableComp from "../../component/TableComp";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import DataStatusMessage from "../../component/DataStatusMessage";
import CustomerApi from "../../apiurl/CustomerApi";
import QueryFormComp from "./component/QueryFormComp";

const CustomerPage = () => {
    const { t } = useTranslation();
    const [queryForm, setQueryForm] = useState(false);
    const {setPage, client} = useContext(AppContext);
    const columnHeader = [t('table.id'), t('table.name'), t('table.email'), t('table.phone')]
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false);
    const [customerName, setCustomerName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const getAllCustomer = async () => {
        try {
            setLoading(true)
            setTableData()
            const response = await client.get(CustomerApi.CUSTOMER)
            setTableData(await response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    const handlePhone = (value) => {
        //  pls check phone type
        setPhone(value)
    }

    const deleteCustomer = async (record) => {
        try {
            const customer = {
                "customerID": record.customerID
            }
            const response = await client.delete(CustomerApi.CUSTOMER, {
                data: customer
            })

            if (response.status === 204) {
                console.log('deleted successfully')
                getAllCustomer()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setCustomerName('')
        setEmail('')
        setPhone('')
    }

    const confirmDelete = (record) => {
        const result = window.confirm(`${t('alert.box.delete.request')} ${record.customerName} ?`);
        if (result) deleteCustomer(record)
    };

    const findFarm = async () => {
        try {
            if (!customerName && !email && !phone) {
                getAllCustomer()
            } else {
                const customer = {
                    customerID: null,
                    customerName: customerName,
                    email: email,
                    phone: phone,
                }
                setLoading(true)
                setTableData()
                const result = await client.post(CustomerApi.FIND, customer);
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
        getAllCustomer()
    }, []);

    const buttons = [
        {
            func: findFarm,
            name: t('button.find.customer'),
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
                <QueryFormComp toggleForm={setQueryForm} showForm={queryForm} title={t('form.header.customer')}
                               setCustomerName={setCustomerName} setEmail={setEmail} setPhone={handlePhone}
                               customerName={customerName} email={email} phone={phone} buttons={buttons}/>

                <div className="relative m-5 w-2/4">
                    <div className="flex items-center  justify-end px-1 py-3">
                        <button
                            onClick={(e) => setPage('addcustomer')}
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-green-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            {t('form.header.customer.add')}
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <DataStatusMessage msg={t('status.loading')} textColor={'text-gray-600'}/>
            ) : (tableData && tableData.length !== 0) ? (
                <TableComp tableData={tableData} columnHeader={columnHeader}
                           editePage={'editcustomer'} deleteRecord={confirmDelete}/>
            ) : (
                <DataStatusMessage msg={t('status.no.data')} textColor={'text-red-600'}/>
            )}

        </div>
    );
};

export default CustomerPage;
