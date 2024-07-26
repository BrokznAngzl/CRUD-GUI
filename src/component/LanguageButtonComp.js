import React from "react";

const LanguageButtonComp = (props) => {
    const { toggleLanguage, lang, setLang, target, title} = props
    const btnClassName = lang === target ?
        // text-blue-600 hover:text-blue-900
        'flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 ' +
        'focus:ring-blue-600 focus:ring-inset text-blue-600 shadow bg-white dark:text-white dark:bg-blue-600'
        : 'flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-blue-600 ' +
        'focus:ring-inset hover:text-blue-800 focus:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-400';

    return (
        <button onClick={() => toggleLanguage(target)} role="tab" type="button"
                className={btnClassName}
                aria-selected="">
            {title}
        </button>
)
}

export default LanguageButtonComp