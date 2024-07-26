import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";
import { UserSearchIcon } from "lucide-react";

interface SelectOptions {
  id: number;
  name: string;
  role: string;
  team: string;
  status: string;
  age: string;
  avatar: string;
  email: string;
}

interface FormSelectProps {
  options: Array<SelectOptions>;
  name: string;
  isLoading: boolean;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormAutoComplete = ({
  name,
  options,
  control,
  label,
  errors,
  isLoading,
}: FormSelectProps) => {
  return (
    <Controller
      key={name}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          label={label}
          className="mt-5"
          variant="bordered"
          isLoading={isLoading}
          selectedKey={value}
          onSelectionChange={onChange}
          isInvalid={!!errors[name]}
          errorMessage={!!errors[name] && errors[name]?.message}
          startContent={
            <UserSearchIcon
              className="text-default-400"
              strokeWidth={2.5}
              size={20}
            />
          }
        >
          {options.map((item) => (
            <AutocompleteItem key={item.id} textValue={item.name}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item.name}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.avatar}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{item.name}</span>
                    <span className="text-tiny text-default-400">
                      {item.team}
                    </span>
                  </div>
                </div>
                <Button
                  className="border-small mr-0.5 font-medium shadow-small"
                  radius="full"
                  size="sm"
                  variant="bordered"
                >
                  Add
                </Button>
              </div>
            </AutocompleteItem>
          ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormAutoComplete;
