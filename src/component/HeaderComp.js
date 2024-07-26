import React, {useContext, useState} from "react";
import {AppContext} from '../context/AppContext';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import LanguageButtonComp from "./LanguageButtonComp";

const HeaderComp = () => {
    const { t } = useTranslation();
    const [lang, setLang] = useState('en')
    const {sidebarItems, setSidebarItems} = useContext(AppContext);
    const toggleLanguage = (newLang) => {
        setLang(newLang)
        i18n.changeLanguage(newLang)
        const currentLanguage = i18n.language
        console.log("change language to : ", currentLanguage)
    };

    return (
        // <div className="fixed z-10 w-full flex items-center justify-between item h-16 bg-white border-b border-gray-200">
         <div className="fixed z-10 flex w-full h-16 items-center justify-start bg-white border-b border-gray-200">
             <div className="flex items-center px-4">
                 <button className="text-gray-500 focus:outline-none focus:text-gray-700">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                         onClick={(e) => {
                             setSidebarItems(!sidebarItems)
                         }}
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
                {/*<input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search"/>*/}
            </div>

             <div className="flex items-center">
                 <div className="flex items-center">
                     <div className="flex justify-center">
                         <nav
                             className="flex overflow-x-auto items-center p-1 space-x-1 rtl:space-x-reverse
                             text-sm text-gray-600 bg-gray-500/5 rounded-xl dark:bg-gray-500/20">
                             <LanguageButtonComp target={'en'} title={t('lang.eng.title')} {...{toggleLanguage, lang, setLang}} />
                             <LanguageButtonComp target={'th'} title={t('lang.th.title')} {...{toggleLanguage, lang, setLang}} />
                         </nav>
                     </div>
                 </div>
             </div>
         </div>
    )
}

export default HeaderComp