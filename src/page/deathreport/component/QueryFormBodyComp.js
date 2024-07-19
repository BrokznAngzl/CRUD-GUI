import React from "react";
import {useTranslation} from 'react-i18next';

const QueryFormBodyComp = (props) => {
    const {t} = useTranslation();
    const {
        startDate, setStartDate, endDate, setEndDate, importID, setImportID, allImport
    } = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-1">
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
                    <div className="col-span-1">
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
                    <div className="col-span-2">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.death.import')}
                        </label>
                        <select value={importID} onChange={(e) => setImportID(e.target.value)
                        }
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                                sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">

                            <option key={0} value='' selected={importID === null}>
                                {t('form.placeholder.death.import')}
                            </option>

                            {
                                (allImport && allImport.length > 0) && (allImport.map((importation, index) => {
                                    return (
                                        <option key={index + 1} value={importation.importID}>
                                            {importation.importCode}
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

export default QueryFormBodyComp