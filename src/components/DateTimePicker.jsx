import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DateTimePicker.css';

// A thin wrapper around react-datepicker to match the app styling.
// Props:
// - selected: Date | null
// - onChange: (date: Date | null) => void
// - placeholderText: string
// - className: string
const CustomInput = React.forwardRef(({ value, onClick, placeholder, className }, ref) => {
  // Render a read-only input with a right-aligned icon so the formatted value always appears in the UI
  return (
    <div className="dtp-input-wrapper" onClick={onClick}>
      <input
        ref={ref}
        onClick={onClick}
        value={value}
        placeholder={placeholder}
        className={`${className} dtp-input`}
        readOnly
      />

      <button type="button" className="dtp-input-icon" onClick={onClick} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M7 10H11V14H7z" fill="currentColor" opacity="0.9" />
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM5 20V9h14v11H5z" fill="currentColor" />
          <path d="M17 12h-1v3h-3v1h4z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
});

export default function DateTimePicker({ selected, onChange, placeholderText = '', className = '' }) {
  return (
    <div className="dtp-wrapper">
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        timeFormat="hh:mm aa"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText={placeholderText}
        customInput={<CustomInput className={className} placeholder={placeholderText} />}
        /* Anchor to right side to prevent overlap with left flyer */
        popperPlacement="bottom-end"
        popperClassName="dtp-popper"
        popperProps={{ strategy: 'fixed' }}
        popperModifiers={[
          { name: 'offset', options: { offset: [0, 8] } },
          { name: 'preventOverflow', options: { enabled: false } },
          { name: 'flip', enabled: false },
        ]}
      />
    </div>
  );
}
