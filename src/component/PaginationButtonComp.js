import React from "react";

const PaginationButtonComp = (props) => {
    const {index, changePage, pageNumber} = props

    return (
        <button className={`px-2 py-1 border text-sm ${pageNumber==index? 'text-blue-400': 'text-gray-600'} bg-white hover:bg-gray-100`}
                onClick={(e) => changePage(index)}>
            {index + 1}
        </button>
    )

}

export default PaginationButtonComp