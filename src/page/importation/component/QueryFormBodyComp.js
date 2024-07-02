import React from "react";
import { useTranslation } from 'react-i18next';

const QueryFormBodyComp = (props) => {
    const {t} = useTranslation();
    const {
        startDate, setStartDate, endDate, setEndDate, setAvgWeight, avgWeight, setQuanity, quanity, setBreeds, breeds,
        setHousingID, housingID, allHousing, allBreeds, importCode, setImportCode
    } = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.date.start')}
                        </label>
                        <input
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            type="date"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        />
                    </div>
                    <div className="col-span-3">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.date.end')}
                        </label>
                        <input
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            type="date"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        />
                    </div>
                    <div className="col-span-3">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.breeds')}
                        </label>
                        <select value={breeds} onChange={(e) => setBreeds(e.target.value)
                        }
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                                sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">

                            <option key={0} value='' selected={breeds === null}>
                                {t('form.placeholder.import.breeds')}
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
                    <div className="col-span-3">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.housing')}
                        </label>
                        <select value={housingID} onChange={(e) => setHousingID(e.target.value)
                        }
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                                sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">

                            <option key={0} value='' selected={breeds === null}>
                                {t('form.placeholder.import.housing')}
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
                    <div className="col-span-2">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.weight')}
                        </label>
                        <input
                            value={avgWeight}
                            onChange={(e) => setAvgWeight(e.target.value)}
                            type="number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={t('form.placeholder.import.weight')}
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label
                            className="text-start text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.quantity')}
                        </label>
                        <input
                            value={quanity}
                            onChange={(e) => setQuanity(e.target.value)}
                            type="number"
                            className="text-start shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={t('form.placeholder.import.quantity')}
                            required
                        />
                    </div>
                    <div className="col-span-2">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.code')}
                        </label>
                        <input
                            value={importCode}
                            onChange={(e)=>setImportCode(e.target.value)}
                            type="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={t('form.placeholder.import.code')}
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QueryFormBodyComp