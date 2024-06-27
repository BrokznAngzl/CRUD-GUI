import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {AiFillCaretLeft} from "react-icons/ai";
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormBodyComp from "./component/FormBodyComp";

const AddFarmPage = () => {
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [farmName, setFarmName] = useState();
    const [farmLocation, setFarmLocation] = useState()

    const createFarm = async () => {
        try {
            const farm = {
                "farmName": farmName,
                "location": farmLocation
            }

            const response = await client.post('/farm', farm);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setError(error);
        }
    }

    const resetForm =()=>{
        setFarmName(null)
        setFarmLocation(null)
    }

    const buttons = [
        {
            func: createFarm,
            name: 'Save Farm',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
            colorStyle: 'bg-blue-600 hover:bg-blue-700',
        },

    ]

    useEffect(() => {
        console.log(responseCode);
    }, [responseCode]);

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
                {(alertBox && responseCode === 201) && <SaveDataSuccessComp title={'farm'}/>}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={'Add Farm'}/>
                <FormBodyComp setFarmName={setFarmName} setFarmLocation={setFarmLocation}
                              farmName={farmName} farmLocation={farmLocation} />
                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )

}

export default AddFarmPage