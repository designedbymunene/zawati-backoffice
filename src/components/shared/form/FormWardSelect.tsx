import React from "react";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  User,
} from "@nextui-org/react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";
import { UserSearchIcon } from "lucide-react";
import { useGetWards } from "@/hooks/api/location-api";
import useGroupStore from "@/app/dashboard/groups/store";

interface SelectOptions {
  WardID: string;
  ConstituencyID: string;
  WardCode: string;
  WardName: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormWardSelect = ({ name, control, label, errors }: FormSelectProps) => {
  const { constituencyID } = useGroupStore();

  const { isPending, error, isError, data } = useGetWards(constituencyID);

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
            data.map((item: SelectOptions) => (
              <AutocompleteItem key={item.WardID} textValue={item.WardName}>
                <User name={item.WardName} description={item.WardCode} />
              </AutocompleteItem>
            ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormWardSelect;
