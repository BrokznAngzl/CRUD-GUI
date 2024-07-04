import React from "react";
import FormButtonComp from "../../../component/form/FormButtonComp";
import FormBodyComp from "./FormBodyComp";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";

const QueryFormComp = (props) => {
    const {
        toggleForm, showForm, title, cause, setCause, buttons
    } = props;

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp {...{toggleForm, showForm, title}}/>

            {showForm && (
                <FormBodyComp {...{cause, setCause}} />
            )}

            {showForm && (
                <FormButtonComp {...{buttons}}/>
            )}
        </div>
    )

}

export default QueryFormComp