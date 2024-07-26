import React from "react";
import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { UserSearchIcon } from "lucide-react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";

import { useFetchAllGroups } from "@/hooks/api/groups-api";
import { GroupType } from "@/lib/types/group_type";
import useScheduleStore from "@/app/dashboard/loans/_components/scheduleStore";

interface FormSelectProps {
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormGroupIdSelect = ({
  name,
  control,
  label,
  errors,
}: FormSelectProps) => {
  const { isPending, data } = useFetchAllGroups();

  const { onSelectedGroup } = useScheduleStore();

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
            onSelectedGroup(newValue as string);
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
            data.map((item: GroupType) => (
              <AutocompleteItem key={item.GroupNo} textValue={item.GroupName}>
                <User name={item.GroupName} description={item.GroupCode} />
              </AutocompleteItem>
            ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormGroupIdSelect;
