import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import FarmApi from "../../apiurl/FarmApi";
import HousingApi from "../../apiurl/HousingApi";

const AddFarmPage = () => {
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [housingName, setHousingName] = useState(null)
    const [stallQuanity, setStallQuanity] = useState(null);
    const [farm, setFarm] = useState();
    const [allFarm, setAllFarm] = useState([])

    const createHousing = async () => {
        try {
            const housing = {
                "housingName": housingName,
                "stallQuanity": stallQuanity,
                "farmID": farm,
            }

            const response = await client.post(HousingApi.HOUSING, housing);
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
        setHousingName('')
        setStallQuanity('')
        setFarm(null)
    }

    const buttons = [
        {
            func: createHousing,
            name: 'Save Housing',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
            colorStyle: 'bg-blue-600 hover:bg-blue-700',
        },

    ]

    useEffect(() => {
        getAllFarm()
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
                        <SaveDataSuccessComp title={'housing'} />
                    ) : (
                        <SaveDataFailedComp title={'housing'} />
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={'Add Housing'} prevPage={'housing'}/>
                <FormBodyComp setHousingName={setHousingName} housingName={housingName}
                              setStallQuanity={setStallQuanity} stallQuanity={stallQuanity}
                              setFarm={setFarm} farm={farm} allFarm={allFarm}/>
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )

}

export default AddFarmPage