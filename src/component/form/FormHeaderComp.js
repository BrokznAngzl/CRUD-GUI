import {AiFillCaretLeft} from "react-icons/ai";
import React from "react";

const FormHeaderComp = (props) => {
    const {setPage, title, prevPage} = props

    return (
        <div className=" grid grid-cols-3 items-start justify-between px-5 py-4 rounded-t border">
            <button
                type="button"
            ><AiFillCaretLeft
                onClick={(e) => setPage(prevPage)}
                className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 text-3xl items-start"/>
            </button>
            <h3 className="text-lg text-center font-semibold">
                {title}
            </h3>
            <h3></h3>
        </div>
    )
}

export default FormHeaderComp;