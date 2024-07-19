import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import React from "react";
import FormButtonComp from "../../../component/form/FormButtonComp";
import FormBodyComp from "./FormBodyComp";
import FormHeaderComp from "../../../component/form/FormHeaderComp";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";

const QueryFormComp = (props) => {
    const {
        toggleForm, showForm, title, setBreedsName, breedsName, buttons } = props;

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp {...{title, toggleForm, showForm}}/>

            {showForm && (
                <FormBodyComp setBreedsName={setBreedsName} breedsName={breedsName} />
            )}

            {showForm && (
                <FormButtonComp buttons={buttons}/>
            )}
        </div>
    )

}

export default QueryFormComp