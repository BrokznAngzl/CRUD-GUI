import React from "react";
import FormButtonComp from "../../../component/form/FormButtonComp";
import FormBodyComp from "./FormBodyComp";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";

const QueryFormComp = (props) => {
    const {
        showForm, toggleForm, title, farmName,
        setFarmName, farmLocation, setFarmLocation, buttons
    } = props;

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp {...{toggleForm, showForm, title}}/>

            {showForm && (
                <FormBodyComp farmName={farmName} setFarmName={setFarmName}
                              farmLocation={farmLocation} setFarmLocation={setFarmLocation}/>
            )}

            {showForm && (
                <FormButtonComp buttons={buttons}/>
            )}
        </div>
    )

}

export default QueryFormComp