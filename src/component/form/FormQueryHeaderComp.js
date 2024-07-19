import {AiFillCaretDown, AiFillCaretLeft} from "react-icons/ai";
import React from "react";

const FormQueryHeaderComp = (props) => {
    const {toggleForm, showForm, title} = props
    return (
        <div className="flex items-start border-b justify-between px-6 py-4 rounded-t">
            <h3 className="text-lg font-semibold">
                {title}
            </h3>
            <button
                type="button"
                onClick={(e) => toggleForm(!showForm)}
                className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ml-auto inline-flex items-center"
            >
                {showForm ? <AiFillCaretDown/> : <AiFillCaretLeft/>}
            </button>
        </div>
    )

}

export default FormQueryHeaderComp