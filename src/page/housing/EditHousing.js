import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import { useTranslation } from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import FarmApi from "../../apiurl/FarmApi";
import HousingApi from "../../apiurl/HousingApi";

const EditHousing = () => {
    const {t} = useTranslation();
    const {setPage, client, editData} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [housingName, setHousingName] = useState(editData.housingName);
    const [stallQuanity, setStallQuanity] = useState(editData.stallQuanity);
    const [allFarm, setAllFarm] = useState()
    const [farm, setFarm] = useState(null);

    const findFarm = async (name) => {
        const response = await client.get(FarmApi.FARMNAME, {
            params: {
                name: name
            }
        })
        setFarm(await response.data.farmID)
    }

    const editFarm = async () => {
        try {
            const housing = {
                "housingID": editData.housingID,
                "housingName": housingName,
                "stallQuanity": stallQuanity,
                "farmID": farm,
            }

            const response = await client.put(HousingApi.HOUSING, housing);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const getAllFarm = async () => {
        try {
            const response = await client.get(FarmApi.FARM)
            setAllFarm(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setHousingName(editData.housingName);
        setStallQuanity(editData.stallQuanity)
        setFarm(editData.farmID)
    }

    const buttons = [
        {
            func: editFarm,
            name: t('button.save.housing'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-400',
        },

    ]

    useEffect(() => {
        getAllFarm()
        findFarm(editData.farmName)
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
                        <SaveDataSuccessComp title={t('global.housing')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.housing')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.housing.edit')} prevPage={'housing'}/>
                <FormBodyComp setHousingName={setHousingName} housingName={housingName}
                              setStallQuanity={setStallQuanity} stallQuanity={stallQuanity}
                              setFarm={setFarm} farm={farm} allFarm={allFarm}/>
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )
}

export default EditHousing