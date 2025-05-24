import React from 'react';

const InputField = ({ label, value, onChange, readonly, dataTestId=null }) => (
    <div className="pt-3 pb-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <label>{label}</label>
        <input
            data-testid={dataTestId}
            disabled={readonly}
            type="text"
            value={value}
            onChange={onChange}
            className={readonly?"w-full p-4 border border-gray-400 rounded-xl cursor-not-allowed":
                "w-full p-4 border border-gray-600 rounded-xl"}
        />
      </div>
    </div>
);

export default InputField;
