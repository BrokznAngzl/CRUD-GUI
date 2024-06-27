import React from 'react';

const DataStatusMessage = (props) => {
    const { msg, textColor } = props;
    return (
        <div className="overflow-x-auto mx-5 my-4 rounded-lg border bg-gray-50">
            <p className={`px-6 py-2 ${textColor} text-xs font-medium`}>{msg}</p>
        </div>
    );
}

export default DataStatusMessage;
