import React from "react";
import { useTranslation } from 'react-i18next';

const FormBodyComp = (props) => {
    const { t } = useTranslation();
    const {setFarmName, setFarmLocation, farmName, farmLocation} = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-full">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.farm.name')}
                        </label>
                        <input
                            value={farmName}
                            onChange={(e) => setFarmName(e.target.value)}
                            type="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={t('form.placeholder.farm.name')}
                            required
                        />
                    </div>
                    <div className="col-span-full">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.farm.location')}
                        </label>
                        <textarea
                            value={farmLocation}
                            onChange={(e) => setFarmLocation(e.target.value)}
                            rows="2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                            placeholder={t('form.placeholder.farm.location')}
                        ></textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormBodyComp