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

const AddExportPage = () => {
    const {t} = useTranslation();
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [alertBox, setAlertBox] = useState(false)
    const [date, setDate] = useState()
    const [importID, setImportID] = useState()
    const [quantity, setQuantity] = useState()
    const [avgWeight, setAvgWeight] = useState();
    const [customer, setCustomer] = useState()
    const [exportCode, setExportCode] = useState();
    const [allImport, setAllImport] = useState([]);
    const [allCustomer, setallCustomer] = useState([]);

    const createExport = async () => {
        try {
            const exportation = {
                date: date,
                customerID: customer,
                importID: importID,
                exportCode: exportCode,
                quantity: quantity,
                avgweight: avgWeight
            }

            const response = await client.post(ExportApi.EXPORT, exportation);
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
        setDate('')
        setQuantity('')
        setExportCode('')
        setCustomer('')
        setAvgWeight('')
        setImportID(null)
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

    const generateExportCode = () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const digits = '0123456789';
        const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];
        setExportCode(`Ex${getRandomChar(letters)}${getRandomChar(digits)}${getRandomChar(digits)}${getRandomChar(letters)}`);
    };

    useEffect(() => {
        getAllCustomer()
        getAllImport()
        generateExportCode()
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
            <div className="text-center m-5 w-2/4">
                {alertBox && (
                    responseCode === 201 ? (
                        <SaveDataSuccessComp title={t('global.export')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.export')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.export.add')} prevPage={'export'}/>
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