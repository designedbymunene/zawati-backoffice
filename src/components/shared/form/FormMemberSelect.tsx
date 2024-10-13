import { MemberType, useFetchAllMembers } from "@/hooks/api/members-api";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { UserSearchIcon } from "lucide-react";
import React from "react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";

interface FormMemberSelectProps {
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormMemberSelect = ({
  name,
  control,
  label,
  errors,
}: FormMemberSelectProps) => {
  const { isPending, error, isError, data } = useFetchAllMembers({
    AnyName: "",
    Offset: "",
    Limit: "",
  });

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
            data.map((item: MemberType) => (
              <AutocompleteItem
                key={item.CustomerID}
                textValue={item.FirstName + " " + item.OtherNames}
                className="capitalize"
              >
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={item.FirstName}
                    className="flex-shrink-0"
                    size="sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-small">
                      {item.FirstName + " " + item.OtherNames}
                    </span>
                    <span className="text-tiny text-default-400">
                      {item.WorkSector}
                    </span>
                  </div>
                </div>
              </AutocompleteItem>
            ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormMemberSelect;
