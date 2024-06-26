import {AiFillCaretDown, AiFillCaretUp} from "react-icons/ai";
import React from "react";

const FormComp = (props) => {
    const {showForm, toggleForm} = props;

    return (
        <div className="bg-white border rounded-lg  relative m-5 w-2/4">
            <div className="flex items-start border-b justify-between px-6 py-4 rounded-t">
                <h3 className="text-lg font-semibold">
                    Farm
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
                <div className="p-6 space-y-6">
                    <form action="#">
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="product-name"
                                    className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    name="product-name"
                                    id="product-name"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Apple Imac 27”"
                                    required
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="category"
                                    className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                    Category
                                </label>
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Electronics"
                                    required
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="brand"
                                    className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    id="brand"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="Apple"
                                    required
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label
                                    htmlFor="price"
                                    className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    placeholder="$2300"
                                    required
                                />
                            </div>
                            <div className="col-span-full">
                                <label
                                    htmlFor="product-details"
                                    className="text-sm font-medium text-gray-900 block mb-2"
                                >
                                    Product Details
                                </label>
                                <textarea
                                    id="product-details"
                                    rows="6"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                                    placeholder="Details"
                                ></textarea>
                            </div>
                        </div>
                    </form>
                </div>
            )}

            {showForm && (
                <div className="p-6 border-t border-gray-200 rounded-b">
                    <button
                        className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit"
                    >
                        Save all
                    </button>
                </div>
            )}
        </div>
    )

}

export default FormComp