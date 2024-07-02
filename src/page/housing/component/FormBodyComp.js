import React from "react";
import { useTranslation } from 'react-i18next';

const FormBodyComp = (props) => {
    const { t } = useTranslation();
    const {
        setHousingName, housingName, setStallQuanity,
        stallQuanity, setFarm, farm, allFarm
    } = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-full">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.housing.name')}
                        </label>
                        <input
                            value={housingName}
                            onChange={(e) => setHousingName(e.target.value)}
                            type="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={t('form.placeholder.housing.name')}
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.housing.stall')}
                        </label>
                        <input
                            value={stallQuanity}
                            onChange={(e) => setStallQuanity(e.target.value)}
                            type="number"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={t('form.placeholder.housing.stall')}
                            required
                        />
                    </div>
                    <div className="col-span-1">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.housing.farm')}
                        </label>
                        <select value={farm} onChange={(e) => setFarm(e.target.value)
                        }
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                                sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">

                            <option key={0} value='' selected={farm === null}>
                                {t('form.placeholder.housing.farm')}
                            </option>

                            {
                                (allFarm && allFarm.length > 0) && (allFarm.map((farm, index) => {
                                    return (
                                        <option key={index + 1} value={farm.farmID}>
                                            {farm.farmName}
                                        </option>
                                    )
                                }))
                            }
                        </select>
                    </div>


                </div>
            </form>
        </div>
    )
}

export default FormBodyComp