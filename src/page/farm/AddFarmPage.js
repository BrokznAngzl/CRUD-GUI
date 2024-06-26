import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {AiFillCaretLeft} from "react-icons/ai";

const AddFarmPage = () => {
    const {setPage} = useContext(AppContext);

    return (
        <div className="bg-white relative m-5 mt-24 w-2/4 rounded-lg">
            <div className=" grid grid-cols-3 items-start justify-between px-5 py-4 rounded-t border">
                <button
                    type="button"
                ><AiFillCaretLeft
                    onClick={(e) => setPage('farm')}
                    className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg p-1.5 text-3xl items-start"/>
                </button>
                <h3 className="text-lg text-center font-semibold">
                    Add Farm
                </h3>
                <h3></h3>
            </div>


            <div className="p-6 space-y-6 border-x">
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

            <div className="p-6 border border-gray-200 rounded-b">
                <button
                    className="text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="submit"
                >
                    Save all
                </button>
            </div>
        </div>
    )

}

export default AddFarmPage