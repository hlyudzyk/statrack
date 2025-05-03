import React from 'react';

const TextareaField = ({ label, value, onChange, readonly }) => (
  <div className="pt-3 pb-6 space-y-4">
    <div className="flex flex-col space-y-2">
      <label>{label}</label>
      <textarea
        disabled={readonly}
        value={value}
        onChange={onChange}
        className={
          readonly
            ? "w-full p-4 border border-gray-400 rounded-xl cursor-not-allowed resize-none"
            : "w-full p-4 border border-gray-600 rounded-xl resize-none"
        }
        rows={4}
      />
    </div>
  </div>
);

export default TextareaField;
