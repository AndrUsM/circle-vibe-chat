import { useRef } from 'react';
import DatePicker from 'react-datepicker'

import './date-picker.scss';
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerInputProps {
  disabled?: boolean;
  value: Date | null;
  showTimeSelect?: boolean;
  onChange: (value: Date | null) => void;
}

const Input = <input type="text"  className='form-control_effect-hover text-input-generic-styles w-full'/>;

export const DatePickerInput: React.FC<DatePickerInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<DatePicker>(null);

  return (
    <DatePicker selected={value} onChange={onChange} customInput={Input} withPortal={true} ref={inputRef} {...rest} />
  )
} 