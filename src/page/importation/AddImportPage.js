import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormHeaderComp from "../../component/form/FormHeaderComp";
import FormButtonComp from "../../component/form/FormButtonComp";
import FormBodyComp from "./component/FormBodyComp";
import SaveDataFailedComp from "../../component/SaveDataFailedComp";
import FarmApi from "../../apiurl/FarmApi";
import HousingApi from "../../apiurl/HousingApi";
import ImportApi from "../../apiurl/ImportApi";
import BreedsApi from "../../apiurl/BreedsApi";

const AddFarmPage = () => {
    const {setPage, client} = useContext(AppContext);
    const [responseCode, setResponseCode] = useState();
    const [error, setError] = useState();
    const [alertBox, setAlertBox] = useState(false);
    const [date, setDate] = useState();
    const [avgWeight, setAvgWeight] = useState()
    const [quanity, setQuanity] = useState()
    const [breeds, setBreeds] = useState();
    const [housingID, setHousingID] = useState();
    const [allHousing, setAllHousing] = useState([]);
    const [allBreeds, setAllBreeds] = useState([]);

    const createImport = async () => {
        try {
            const importation = {
                "date": date,
                "avgWeight": avgWeight,
                "quanity": quanity,
                "breeds": breeds,
                "housingID": housingID,
            }

            console.log(importation)
            const response = await client.post(ImportApi.IMPORT, importation);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setAlertBox(true)
        }
    }

    const getAllHousing = async () => {
        try {
            const response = await client.get(HousingApi.HOUSING)
            setAllHousing(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const getAllBreeds = async () => {
        try {
            const response = await client.get(BreedsApi.BREEDS)
            setAllBreeds(await response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const resetForm = () => {
        setDate('')
        setBreeds('')
        setAvgWeight('')
        setQuanity('')
        setHousingID('')
    }

    const buttons = [
        {
            func: createImport,
            name: 'Save Import',
            colorStyle: 'bg-green-600 hover:bg-green-700',
        },
        {
            func: resetForm,
            name: 'Reset Form',
            colorStyle: 'bg-blue-600 hover:bg-blue-700',
        },

    ]

    useEffect(() => {
        getAllBreeds()
        getAllHousing()
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
                    responseCode === 201 ? (
                        <SaveDataSuccessComp title={'import'} />
                    ) : (
                        <SaveDataFailedComp title={'import'} />
                    )
                )}
            </div>

            <div className="bg-white relative m-5 w-2/4 rounded-lg">
                <FormHeaderComp setPage={setPage} title={'Add Import'} prevPage={'import'}/>
                <FormBodyComp
                    {...{
                        setDate,
                        date,
                        setAvgWeight,
                        avgWeight,
                        setQuanity,
                        quanity,
                        setBreeds,
                        breeds,
                        setHousingID,
                        housingID,
                        allHousing,
                        allBreeds,
                    }}
                />

                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )

}

export default AddFarmPage