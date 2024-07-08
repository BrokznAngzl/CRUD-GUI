import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import ImportApi from "../../apiurl/ImportApi";
import ExportApi from "../../apiurl/ExportApi";
import FormBodyComp from "./component/FormBodyComp";
import CustomerApi from "../../apiurl/CustomerApi";
import HousingApi from "../../apiurl/HousingApi";
import BreedsApi from "../../apiurl/BreedsApi";

const AddExportPage = () => {
    const {t} = useTranslation();
    const {setPage, client, editData} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [alertBox, setAlertBox] = useState(false)
    const [exportID, setExportID] = useState(editData.exportID)
    const [date, setDate] = useState(editData.date)
    const [quantity, setQuantity] = useState(editData.quantity)
    const [avgWeight, setAvgWeight] = useState(editData.avgweight);
    const [exportCode, setExportCode] = useState(editData.exportCode);
    const [importID, setImportID] = useState()
    const [customer, setCustomer] = useState()
    const [allImport, setAllImport] = useState([]);
    const [allCustomer, setallCustomer] = useState([]);

    const findImport = async (code) => {
        try {
            const response = await client.get(ImportApi.IMPORTCODE, {
                params: {
                    code: code
                }
            })
            setImportID(await response.data.importID)
        } catch (e) {
            console.log(e)
        }
    }

    const findCustomer = async (name) => {
        try {
            const response = await client.get(CustomerApi.NAME, {
                params: {
                    name: name
                }
            })
            setCustomer(await response.data.customerID)
        } catch (e) {
            console.log(e)
        }
    }

    const createExport = async () => {
        try {
            const exportation = {
                exportID: exportID,
                date: date,
                customerID: customer,
                importID: importID,
                exportCode: exportCode,
                quantity: quantity,
                avgweight: avgWeight
            }

            const response = await client.put(ExportApi.EXPORT, exportation);
            setResponseCode(response.status)
            setAlertBox(true)
        } catch (error) {
            setAlertBox(true)
        }
    }

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

    const resetForm = () => {
        setDate(editData.date)
        setQuantity(editData.quantity)
        setExportCode(editData.exportCode)
        setCustomer(editData.customerID)
        setAvgWeight(editData.avgweight)
        findCustomer(editData.customerName)
        findImport(editData.importCode)
    }

    const buttons = [
        {
            func: createExport,
            name: t('button.save.export'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-700',
        },
    ]

    useEffect(() => {
        findCustomer(editData.customerName)
        findImport(editData.importCode)
        getAllCustomer()
        getAllImport()
    }, []);

    useEffect(() => {
        if (alertBox) {
            const timer = setTimeout(() => {
                setAlertBox(false);
                setResponseCode()
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [alertBox]);

    return (
        <div>
            <div className="text-center m-5 mt-24 w-2/4">
                {alertBox && (
                    responseCode === 200 ? (
                        <SaveDataSuccessComp title={t('global.export')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.export')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.export.edit')} prevPage={'export'}/>
                <FormBodyComp
                    {...{
                        date, setDate,
                        importID, setImportID,
                        quantity, setQuantity,
                        allImport, allCustomer,
                        customer, setCustomer,
                        exportCode, buttons,
                        avgWeight, setAvgWeight
                    }}
                />

                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )

}

export default AddExportPage