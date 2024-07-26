import React from "react";
import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";

import { UserSearchIcon } from "lucide-react";

import useGroupStore from "@/app/dashboard/groups/store";
import { useGetConstituency } from "@/hooks/api/location-api";

interface SelectOptions {
  "Constituency ID": string;
  CountyID: string;
  ConstituencyCode: string;
  ConstituencyName: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormConstituencySelect = ({
  name,
  control,
  label,
  errors,
}: FormSelectProps) => {
  const { onChangeConstituency, countyID } = useGroupStore();

  const { isPending, data } = useGetConstituency(countyID);

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
          onSelectionChange={(newValue) => {
            onChangeConstituency(newValue as string);
            onChange(newValue);
          }}
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
            data.map((item: SelectOptions) => (
              <AutocompleteItem
                key={item["Constituency ID"]}
                textValue={item.ConstituencyName}
              >
                <User
                  name={item.ConstituencyName}
                  description={item.ConstituencyCode}
                />
              </AutocompleteItem>
            ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormConstituencySelect;
