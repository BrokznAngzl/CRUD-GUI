import React from "react";
import { useTranslation } from 'react-i18next';

const FormBodyComp = (props) => {
    const { t } = useTranslation();
    const {cause, setCause} = props

    return (
        <div className="p-6 space-y-6 border-x">
            <form>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label
                            className="text-sm font-medium text-gray-900 block mb-2"
                        >
                            {t('form.label.case.name')}
                        </label>
                        <input
                            value={cause}
                            onChange={(e) => setCause(e.target.value)}
                            type="text"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            placeholder={t('form.placeholder.case.name')}
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormBodyComp