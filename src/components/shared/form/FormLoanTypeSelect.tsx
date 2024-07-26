import React from "react";
import { UserSearchIcon } from "lucide-react";
import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";

import { GetLoanTypes, useGetLoanTypes } from "@/hooks/api/loans-api";

interface FormSelectProps {
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormLoanTypeSelect = ({
  name,
  control,
  label,
  errors,
}: FormSelectProps) => {
  const { isPending, data } = useGetLoanTypes();

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
          isLoading={isPending}
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
          {data &&
            data.map((item: GetLoanTypes) => (
              <AutocompleteItem key={item.LoanTypeNo} textValue={item.LoanType}>
                <User name={item.LoanType} description={item.Description} />
              </AutocompleteItem>
            ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormLoanTypeSelect;
