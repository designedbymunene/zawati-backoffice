"use client";

import { Input } from "@nextui-org/react";
import React from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  errors: any | FieldError;
  control: Control<FieldValues | any>;
  type?: string;
}

const FormInput = ({ control, label, name, errors, type }: FormInputProps) => {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Input
          ref={ref}
          type={type}
          value={value}
          label={label}
          onBlur={onBlur}
          onChange={onChange}
          variant="bordered"
          className="mt-5"
          isInvalid={!!errors[name]}
          errorMessage={!!errors[name] && errors[name]?.message}
        />
      )}
      rules={{ required: true }}
    />
  );
};

export default FormInput;
