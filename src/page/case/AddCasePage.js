import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import CaseApi from "../../apiurl/CaseApi";

const AddCasePage = () => {
    const {t} = useTranslation();
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [cause, setCause] = useState();

    const createCase = async () => {
        try {
            const caseDetail = {
                cause: cause
            }

            const response = await client.post(CaseApi.CASE, caseDetail);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const resetForm = () => {
        setCause('')
    }

    const buttons = [
        {
            func: createCase,
            name: t('button.save.case'),
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
                        <SaveDataSuccessComp title={t('global.case')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.case')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.case.add')} prevPage={'case'}/>
                <FormBodyComp {...{cause, setCause}}/>
                <FormButtonComp {...{buttons}}/>
            </div>
        </div>

    )

}

export default AddCasePage