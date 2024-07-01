import React from "react";

const QueryFormBodyComp = (props) => {
    const {
        startDate, setStartDate, endDate, setEndDate, setAvgWeight, avgWeight, setQuanity, quanity, setBreeds, breeds,
        setHousingID, housingID, allHousing, allBreeds
    } = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            Start Date
                        </label>
                        <input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type="date"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="30-06-2024"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            End Date
                        </label>
                        <input
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type="date"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="30-07-2024"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            Breeds
                        </label>
                        <select value={breeds} onChange={(e) => setBreeds(e.target.value)
                        }
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                                sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">

                            <option key={0} value='' selected={breeds === null}>
                                Select Breeds
                            </option>

                            {
                                (allBreeds && allBreeds.length > 0) && (allBreeds.map((breeds, index) => {
                                    return (
                                        <option key={index + 1} value={breeds.breedsID}>
                                            {breeds.breedsName}
                                        </option>
                                    )
                                }))
                            }
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            Housing
                        </label>
                        <select value={housingID} onChange={(e) => setHousingID(e.target.value)
                        }
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                                sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">

                            <option key={0} value='' selected={breeds === null}>
                                Select Housing
                            </option>

                            {
                                (allHousing && allHousing.length > 0) && (allHousing.map((housing, index) => {
                                    return (
                                        <option key={index + 1} value={housing.housingID}>
                                            {housing.housingName}
                                        </option>
                                    )
                                }))
                            }
                        </select>
                    </div>
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            Average Weight (KG)
                        </label>
                        <input
                            value={avgWeight}
                            onChange={(e) => setAvgWeight(e.target.value)}
                            type="number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="10"
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            Quantity
                        </label>
                        <input
                            value={quanity}
                            onChange={(e) => setQuanity(e.target.value)}
                            type="number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder="20"
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QueryFormBodyComp