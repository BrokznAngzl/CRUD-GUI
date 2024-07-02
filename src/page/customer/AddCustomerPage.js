import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import CustomerApi from "../../apiurl/CustomerApi";

const AddFarmPage = () => {
    const { t } = useTranslation();
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [customerName, setCustomerName] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    const createCustomer = async () => {
        try {
            const customer = {
                "customerName": customerName,
                "email": email,
                "phone": phone
            }

            console.log(customer)

            const response = await client.post(CustomerApi.CUSTOMER, customer);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const resetForm = () => {
        setCustomerName('')
        setEmail('')
        setPhone('')
    }

    const buttons = [
        {
            func: createCustomer,
            name: t('button.save.customer'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-700',
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
                    responseCode === 201 ? (
                        <SaveDataSuccessComp title={t('global.customer')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.customer')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.customer.add')} prevPage={'customer'}/>
                <FormBodyComp setCustomerName={setCustomerName} setEmail={setEmail} setPhone={setPhone}
                              customerName={customerName} email={email} phone={phone}/>
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )

}

export default AddFarmPage