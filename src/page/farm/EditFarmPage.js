import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import FarmApi from "../../apiurl/FarmApi";

const EditFarmPage = () => {
    const {setPage, client, editData} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [farmName, setFarmName] = useState(editData.farmName);
    const [farmLocation, setFarmLocation] = useState(editData.location)

    const editFarm = async () => {
        try {
            const farm = {
                "farmID": editData.farmID,
                "farmName": farmName,
                "location": farmLocation
            }

            const response = await client.put(FarmApi.FARM, farm);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const resetForm = () => {
        setFarmName(editData.farmName);
        setFarmLocation(editData.location)
    }

    const buttons = [
        {
            func: editFarm,
            name: 'Save Farm',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
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
                        <SaveDataSuccessComp title={'farm'} />
                    ) : (
                        <SaveDataFailedComp title={'farm'} />
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={'Edit Farm'} prevPage={'farm'}/>
                <FormBodyComp setFarmName={setFarmName} setFarmLocation={setFarmLocation}
                              farmName={farmName} farmLocation={farmLocation}/>
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )
}

export default EditFarmPage