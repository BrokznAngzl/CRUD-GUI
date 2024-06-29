import React, {useEffect} from "react";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";
import FormBodyComp from "./FormBodyComp";
import FormButtonComp from "../../../component/form/FormButtonComp";

const QueryFormComp = (props) => {
    const {toggleForm, showForm, title, setHousingName, housingName, setStallQuanity,
        stallQuanity, setFarm, farm, allFarm, buttons} = props;

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp showForm={showForm} toggleForm={toggleForm} title={title}/>

            {showForm && (
                <FormBodyComp setHousingName={setHousingName} housingName={housingName} setStallQuanity={setStallQuanity}
                              stallQuanity={stallQuanity} setFarm={setFarm} farm={farm} allFarm={allFarm}/>
            )}

            {showForm && (
                <FormButtonComp buttons={buttons}/>
            )}
        </div>
    )

}

export default QueryFormComp