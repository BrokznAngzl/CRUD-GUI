import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import React from "react";
import FormButtonComp from "../../../component/form/FormButtonComp";
import FormBodyComp from "./FormBodyComp";

const QueryFormComp = (props) => {
    const {
        toggleForm, showForm, title, setCustomerName, setEmail,
        setPhone, customerName, email, phone, buttons
    } = props;

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <div className="flex items-start border-b justify-between px-6 py-4 rounded-t">
                <h3 className="text-lg font-semibold">
                    {title}
                </h3>
                <button
                    type="button"
                    onClick={(e) => toggleForm(!showForm)}
                    className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg p-1.5 ml-auto inline-flex items-center"
                >
                    {showForm ? <AiFillCaretUp/> : <AiFillCaretDown/>}
                </button>
            </div>

            {showForm && (
                <FormBodyComp setCustomerName={setCustomerName} setEmail={setEmail} setPhone={setPhone}
                              customerName={customerName} email={email} phone={phone}/>
            )}

            {showForm && (
                <FormButtonComp buttons={buttons}/>
            )}
        </div>
    )

}

export default QueryFormComp