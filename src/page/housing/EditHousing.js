import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";

const EditHousing = () => {
    const {setPage, client, editData} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [housingName, setHousingName] = useState(editData.housingName);
    const [stallQuanity, setStallQuanity] = useState(editData.stallQuanity);
    const [allFarm, setAllFarm] = useState()
    const [farm, setFarm] = useState(null);

    const findFarm = async (name) => {
        const response = await client.get('/farm/farmname', {
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

            const response = await client.put('/housing', housing);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const getAllFarm = async () => {
        try {
            const response = await client.get('/farm')
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
            name: 'Save Housing',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
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
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [alertBox]);

    return (
        <div>
            <div className="text-center m-5 mt-24 w-2/4">
                {alertBox && (
                    responseCode === 200 ? (
                        <SaveDataSuccessComp title={'housing'}/>
                    ) : (
                        <SaveDataFailedComp title={'housing'}/>
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={'Edit Housing'} prevPage={'housing'}/>
                <FormBodyComp setHousingName={setHousingName} housingName={housingName}
                              setStallQuanity={setStallQuanity} stallQuanity={stallQuanity}
                              setFarm={setFarm} farm={farm} allFarm={allFarm}/>
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )
}

export default EditHousing