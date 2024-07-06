import React from "react";
import { useTranslation } from 'react-i18next';

const FormBodyComp = (props) => {
    const {t} = useTranslation();
    const {
        date, setDate, importID, setImportID, cause, setCause, quanity, setQuanity,
        allCase, allImport
    } = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.import.date')}
                        </label>
                        <input
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                        />
                    </div>
                    <div className="col-span-3">
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
                    <div className="col-span-3">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.death.case')}
                        </label>
                        <select value={cause} onChange={(e) => setCause(e.target.value)
                        }
                                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900
                                sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5">

                            <option key={0} value='' selected={cause === null}>
                                {t('form.placeholder.death.case')}
                            </option>

                            {
                                (allCase && allCase.length > 0) && (allCase.map((cuase, index) => {
                                    return (
                                        <option key={index + 1} value={cuase.causeID}>
                                            {cuase.cause}
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

export default FormBodyComp