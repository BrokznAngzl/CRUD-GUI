import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {useTranslation} from 'react-i18next';
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import ImportApi from "../../apiurl/ImportApi";
import CaseApi from "../../apiurl/CaseApi";
import DeathApi from "../../apiurl/DeathApi";

const EditDeathPage = () => {
    const {t} = useTranslation();
    const {setPage, client, editData} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [importID, setImportID] = useState(editData.importID);
    const [date, setDate] = useState(editData.date);
    const [cause, setCause] = useState();
    const [quanity, setQuanity] = useState(editData.quantity)
    const [allCase, setAllCase] = useState([])
    const [allImport, setAllImport] = useState([]);

    const findCase = async (name) => {
        try {
            const response = await client.get(CaseApi.CASENAME, {
                params: {
                    name: name
                }
            })
            setCause(await response.data.causeID)
        } catch (e) {
            console.log(e)
        }
    }

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

    const saveDeath = async () => {
        try {
            const death = {
                "deathID": editData.deathID,
                "date": date,
                "quantity": quanity,
                "cause": cause,
                "importid": importID
            }

            const response = await client.put(DeathApi.DEATH, death);
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
        findCase(editData.cause)
        findImport(editData.importCode)
        setDate(editData.date)
        setCause(editData.cause)
        setQuanity(editData.quantity)
    }

    const buttons = [
        {
            func: saveDeath,
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
        findCase(editData.cause)
        findImport(editData.importCode)
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
            <div className="text-center m-5 w-2/4">
                {alertBox && (
                    responseCode === 200 ? (
                        <SaveDataSuccessComp title={t('global.death')}/>
                    ) : (
                        <SaveDataFailedComp title={t('global.death')}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={t('form.header.death.edit')} prevPage={'death'}/>
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

export default EditDeathPage