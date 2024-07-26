"use client";

import { Select, SelectItem } from "@nextui-org/react";
import React from "react";

import { Control, Controller, FieldErrors, FieldValues } from "react-hook-form";

interface SelectOptions {
  label: string | number;
  value: string;
}

interface FormSelectProps {
  options: Array<SelectOptions>;
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormSelect = ({
  name,
  options,
  control,
  label,
  errors,
}: FormSelectProps) => {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, value, ref } }) => (
        <Select
          label={label}
          className="mt-5"
          variant="bordered"
          selectedKeys={[value]}
          onChange={onChange}
          isInvalid={!!errors[name]}
          errorMessage={!!errors[name] && errors[name]?.message}
        >
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormSelect;
