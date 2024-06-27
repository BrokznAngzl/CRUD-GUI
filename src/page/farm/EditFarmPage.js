import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";
import {AiFillCaretLeft} from "react-icons/ai";
import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
import FormButtonComp from "../../component/form/FormButtonComp";

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

            const response = await client.put('/farm', farm);
            setResponseCode(response.status)
            setAlertBox(true)

        } catch (error) {
            setError(error);
        }
    }

    const resetForm =()=>{
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
                <div className=" grid grid-cols-3 items-start justify-between px-5 py-4 rounded-t border">
                    <button
                        type="button"
                    ><AiFillCaretLeft
                        onClick={(e) => setPage('farm')}
                        className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 text-3xl items-start"/>
                    </button>
                    <h3 className="text-lg text-center font-semibold">
                        Edit Farm
                    </h3>
                    <h3></h3>
                </div>


                <div className="p-6 space-y-6 border-x">
                    <form>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-full">
                                <label
                                    className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                    Farm Name
                                </label>
                                <input
                                    value={farmName}
                                    onChange={(e)=>setFarmName(e.target.value)}
                                    type="text"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Ichigo Farm"
                                    required
                                />
                            </div>
                            <div className="col-span-full">
                                <label
                                    className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                    Farm Location
                                </label>
                                <textarea
                                    value={farmLocation}
                                    onChange={(e)=>setFarmLocation(e.target.value)}
                                    rows="2"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                    placeholder="Chak Gum Bor"
                                ></textarea>
                            </div>
                        </div>
                    </form>
                </div>

                <FormButtonComp buttons={buttons}/>
            </div>
        </div>

    )
}

export default EditFarmPage