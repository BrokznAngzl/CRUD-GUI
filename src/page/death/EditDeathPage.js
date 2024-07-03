// import React, {useContext, useEffect, useState} from "react";
// import {AppContext} from "../../context/AppContext";
// import { useTranslation } from 'react-i18next';
// import SaveDataSuccessComp from "../../component/SaveDataSuccessComp";
// import FormHeaderComp from "../../component/form/FormHeaderComp";
// import FormButtonComp from "../../component/form/FormButtonComp";
// import FormBodyComp from "./component/FormBodyComp";
// import SaveDataFailedComp from "../../component/SaveDataFailedComp";
// import HousingApi from "../../apiurl/HousingApi";
// import ImportApi from "../../apiurl/ImportApi";
// import BreedsApi from "../../apiurl/BreedsApi";
//
// const EditDeathPage = () => {
//     const {t} = useTranslation();
//     const {setPage, client, editData} = useContext(AppContext);
//     const [responseCode, setResponseCode] = useState();
//     const [alertBox, setAlertBox] = useState(false);
//     const [importCode, setImportCode] = useState(editData.importCode);
//     const [date, setDate] = useState(editData.date);
//     const [avgWeight, setAvgWeight] = useState(editData.avgWeight);
//     const [quanity, setQuanity] = useState(editData.quanity)
//     const [breeds, setBreeds] = useState(editData.breedsID);
//     const [housingID, setHousingID] = useState();
//     const [allHousing, setAllHousing] = useState([]);
//     const [allBreeds, setAllBreeds] = useState([]);
//
//     const findHousing = async (name) => {
//         try {
//             const response = await client.get(HousingApi.HOUSINGNAME, {
//                 params: {
//                     name: name
//                 }
//             })
//             setHousingID(await response.data.housingID)
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//     const findBreeds = async (name) => {
//         try {
//             const response = await client.get(BreedsApi.BREEDSNAME, {
//                 params: {
//                     name: name
//                 }
//             })
//             setBreeds(await response.data.breedsID)
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//     const saveImport = async () => {
//         try {
//             const importation = {
//                 "importID": editData.importID,
//                 "date": date,
//                 "avgWeight": avgWeight,
//                 "quanity": quanity,
//                 "breeds": breeds,
//                 "housingID": housingID,
//             }
//
//             const response = await client.put(ImportApi.IMPORT, importation);
//             setResponseCode(response.status)
//             setAlertBox(true)
//
//         } catch (error) {
//             setAlertBox(true)
//         }
//     }
//
//     const getAllHousing = async () => {
//         try {
//             const response = await client.get(HousingApi.HOUSING)
//             setAllHousing(await response.data)
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//     const getAllBreeds = async () => {
//         try {
//             const response = await client.get(BreedsApi.BREEDS)
//             setAllBreeds(await response.data)
//         } catch (e) {
//             console.log(e)
//         }
//     }
//
//     const resetForm = () => {
//         findHousing(editData.housingName)
//         findBreeds(editData.breedsName)
//         setDate(editData.date)
//         setBreeds(editData.breedsID)
//         setAvgWeight(editData.avgWeight)
//         setQuanity(editData.quanity)
//     }
//
//     const buttons = [
//         {
//             func: saveImport,
//             name: t('button.save.import'),
//             colorStyle: 'bg-green-600 hover:bg-green-700',
//         },
//         {
//             func: resetForm,
//             name: t('button.reset.form'),
//             colorStyle: 'bg-blue-600 hover:bg-blue-700',
//         },
//     ]
//
//     useEffect(() => {
//         findHousing(editData.housingName)
//         findBreeds(editData.breedsName)
//         getAllBreeds()
//         getAllHousing()
//     }, []);
//
//     useEffect(() => {
//         if (alertBox) {
//             const timer = setTimeout(() => {
//                 setAlertBox(false);
//                 setResponseCode()
//             }, 2000);
//
//             return () => clearTimeout(timer);
//         }
//     }, [alertBox]);
//
//     console.log(editData)
//     return (
//         <div>
//             <div className="text-center m-5 mt-24 w-2/4">
//                 {alertBox && (
//                     responseCode === 200 ? (
//                         <SaveDataSuccessComp title={t('global.import')}/>
//                     ) : (
//                         <SaveDataFailedComp title={t('global.import')}/>
//                     )
//                 )}
//             </div>
//
//             <div className="bg-white relative m-5 w-2/4 rounded-lg">
//                 <FormHeaderComp setPage={setPage} title={t('form.header.import.edit')} prevPage={'import'}/>
//                 <FormBodyComp
//                     {...{
//                         setDate,
//                         date,
//                         setAvgWeight,
//                         avgWeight,
//                         setQuanity,
//                         quanity,
//                         setBreeds,
//                         breeds,
//                         setHousingID,
//                         housingID,
//                         allHousing,
//                         allBreeds,
//                         importCode,
//                     }}
//                 />
//
//                 <FormButtonComp buttons={buttons}/>
//             </div>
//         </div>
//
//     )
//
// }
//
// export default EditDeathPage