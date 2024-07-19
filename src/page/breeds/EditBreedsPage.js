import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import BreedsApi from "../../apiurl/BreedsApi";

const EditBreedsPage = () => {
    const { t } = useTranslation();
    const {setPage, client, editData} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [breedsName, setBreedsName] = useState(editData.breedsName);

    const editBreeds = async () => {
        try {
            const breeds = {
                "breedsID": editData.breedsID,
                "breedsName": breedsName
            }

            const response = await client.put(BreedsApi.BREEDS, breeds);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const resetForm = () => {
        setBreedsName(editData.breedsName);
    }

    const buttons = [
        {
            func: editBreeds,
            name: t('button.save.breeds'),
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
                        <SaveDataSuccessComp title={t('global.breeds')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.breeds')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.breeds.edit')} prevPage={'breeds'}/>
                <FormBodyComp breedsName={breedsName} setBreedsName={setBreedsName} />
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )
}

export default EditBreedsPage