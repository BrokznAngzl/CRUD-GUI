import React from "react";

const FormButtonComp = (props) => {
    const {buttons} = props

    return (
        <div className="flex justify-between p-6 border border-gray-200 rounded-b">
            {buttons.map((button, index) => {
                console.log(button)
                return (
                    <button
                        key={index}
                        onClick={button.func}
                        className={`text-white ${button.colorStyle} font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                        type="submit"
                    >
                        {button.name}
                    </button>
                )
            })}

        </div>
    )
}

export default FormButtonComp