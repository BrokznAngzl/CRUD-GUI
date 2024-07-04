import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import React from "react";
import FormButtonComp from "../../../component/form/FormButtonComp";
import FormBodyComp from "./FormBodyComp";
import FormQueryHeaderComp from "../../../component/form/FormQueryHeaderComp";

const QueryFormComp = (props) => {
    const {
        toggleForm, showForm, title, setCustomerName, setEmail,
        setPhone, customerName, email, phone, buttons
    } = props;

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <FormQueryHeaderComp {...{toggleForm, showForm, title}}/>

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