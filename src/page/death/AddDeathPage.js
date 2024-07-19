import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import ImportApi from "../../apiurl/ImportApi";
import DeathApi from "../../apiurl/DeathApi";
import CaseApi from "../../apiurl/CaseApi";
import FormBodyComp from "./component/FormBodyComp";

const AddDeathPage = () => {
    const {t} = useTranslation();
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [date, setDate] = useState();
    const [importID, setImportID] = useState();
    const [cause, setCause] = useState();
    const [quanity, setQuanity] = useState()
    const [allCase, setAllCase] = useState([])
    const [allImport, setAllImport] = useState([]);

    const createDeath = async () => {
        try {
            const death = {
                "date": date,
                "quantity": quanity,
                "cause": cause,
                "importid": importID
            }

            const response = await client.post(DeathApi.DEATH, death);
            setResponseCode(response.status)
            setAlertBox(true)
        } catch (error) {
            setAlertBox(true)
        }
    }

    const getAllCase = async () => {
        try {
            const response = await client.get(CaseApi.CASE)
            setAllCase(await response.data)
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
        setQuanity('')
        setCause(null)
        setImportID(null)
    }

    const buttons = [
        {
            func: createDeath,
            name: t('button.save.death'),
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: t('button.reset.form'),
            colorStyle: 'bg-blue-600 hover:bg-blue-700',
        },
    ]

    useEffect(() => {
        getAllCase()
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
                    responseCode === 201 ? (
                        <SaveDataSuccessComp title={t('global.death')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.death')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.death.add')} prevPage={'death'}/>
                <FormBodyComp
                    {...{
                        date, setDate,
                        importID, setImportID,
                        cause, setCause,
                        quanity, setQuanity,
                        allCase, allImport
                    }}
                />

                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )

}

export default AddDeathPage