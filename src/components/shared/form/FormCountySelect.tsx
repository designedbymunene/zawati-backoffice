import React from "react";
import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { UserSearchIcon } from "lucide-react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";

import { useGetCounty } from "@/hooks/api/location-api";
import useGroupStore from "@/app/dashboard/groups/store";

interface SelectOptions {
  CountyID: string;
  CountyCode: string;
  CountyName: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormCountySelect = ({
  name,
  control,
  label,
  errors,
}: FormSelectProps) => {
  const { isPending, data } = useGetCounty();

  const { onChangeCounty } = useGroupStore();

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
            onChangeCounty(newValue as string);
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
              <AutocompleteItem key={item.CountyID} textValue={item.CountyName}>
                <User name={item.CountyName} description={item.CountyCode} />
              </AutocompleteItem>
            ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormCountySelect;
