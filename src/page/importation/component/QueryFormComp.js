import React from "react";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";
import FormBodyComp from "./FormBodyComp";
import FormButtonComp from "../../../component/form/FormButtonComp";

const QueryFormComp = (props) => {
    const {
        toggleForm, showForm, title, buttons,
        date, setDate, breeds, setBreeds, housingID, setHousingID, avgWeight,
        setAvgWeight, quanity, setQuanity, allBreeds, allHousing
    } = props

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp showForm={showForm} toggleForm={toggleForm} title={title}/>

            {showForm && (
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
            )}

            {showForm && (
                <FormButtonComp buttons={buttons}/>
            )}
        </div>
    )

}

export default QueryFormComp