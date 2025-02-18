import React from "react";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";
import FormButtonComp from "../../../component/form/FormButtonComp";
import QueryFormBodyComp from "./QueryFormBodyComp";

const QueryFormComp = (props) => {
    const {
        toggleForm, showForm, title, buttons,
        startDate, setStartDate, endDate, setEndDate, importID, setImportID, allImport
    } = props

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp showForm={showForm} toggleForm={toggleForm} title={title}/>

            {showForm && (
                <QueryFormBodyComp
                    {...{
                        startDate, setStartDate, endDate, setEndDate, importID, setImportID, allImport
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