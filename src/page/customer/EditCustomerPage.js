import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import CustomerApi from "../../apiurl/CustomerApi";

const EditCustomerPage = () => {
    const { t } = useTranslation();
    const {setPage, client, editData} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [customerName, setCustomerName] = useState(editData.customerName);
    const [email, setEmail] = useState(editData.email);
    const [phone, setPhone] = useState(editData.phone);

    const editCustomer = async () => {
        try {
            const customer = {
                "customerID": editData.customerID,
                "customerName": customerName,
                "email": email,
                "phone": phone
            }

            const response = await client.put(CustomerApi.CUSTOMER, customer);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const resetForm = () => {
        setCustomerName(editData.customerName);
        setEmail(editData.email);
        setPhone(editData.phone)
    }

    const buttons = [
        {
            func: editCustomer,
            name: t('button.save.customer'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },

    ]

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
                        <SaveDataSuccessComp title={t('global.customer')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.customer')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.customer.edit')} prevPage={'customer'}/>
                <FormBodyComp customerName={customerName} setCustomerName={setCustomerName}
                              email={email} setEmail={setEmail} phone={phone} setPhone={setPhone}/>
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )
}

export default EditCustomerPage