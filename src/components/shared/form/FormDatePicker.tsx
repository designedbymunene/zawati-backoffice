"use client";

import { Input } from "@nextui-org/react";
import React from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface FormDatePickerProps {
  name: string;
  label: string;
  errors: any | FieldError;
  control: Control<FieldValues | any>;
}

const FormDatePicker = ({
  control,
  label,
  name,
  errors,
}: FormDatePickerProps) => {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <DatePicker
          ref={ref}
          selected={value}
          onChange={onChange}
          onBlur={onBlur}
          withPortal
          dateFormat="MMMM d, yyyy"
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          customInput={
            <Input
              label={label}
              variant="bordered"
              className="mt-5"
              isInvalid={!!errors[name]}
              errorMessage={!!errors[name] && errors[name]?.message}
            />
          }
        />
      )}
      rules={{ required: true }}
    />
  );
};

export default FormDatePicker;
