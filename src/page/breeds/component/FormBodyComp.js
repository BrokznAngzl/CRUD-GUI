import React from "react";

const FormBodyComp = (props) => {
    const {breedsName, setBreedsName} = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            Breeds Name
                        </label>
                        <input
                            value={breedsName}
                            onChange={(e) => setBreedsName(e.target.value)}
                            type="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="Kurobuta"
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormBodyComp