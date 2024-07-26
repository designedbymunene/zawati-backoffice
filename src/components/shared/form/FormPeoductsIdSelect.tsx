import React from "react";
import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { UserSearchIcon } from "lucide-react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";

import useScheduleStore from "@/app/dashboard/loans/_components/scheduleStore";
import { useGroupProducts } from "@/hooks/api/groups-api";
import { useScheduleGroupProducts } from "@/hooks/api/loans-api";

interface SelectOptions {
  ProductID: string;
  ProductCode: string;
  ProductName: string;
  ProductDescription: string;
  ProductCost: string;
  ContributionFrequency: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  errors: any | FieldErrors<FieldValues>;
  control: Control<FieldValues | any>;
}

const FormProductsIdSelect = ({
  name,
  control,
  label,
  errors,
}: FormSelectProps) => {
  const { selectedGroup } = useScheduleStore();

  console.log("selectedGroup", selectedGroup);

  const { isPending, data } = useScheduleGroupProducts(selectedGroup);

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
              <AutocompleteItem
                key={item.ProductID}
                textValue={item.ProductName}
              >
                <User name={item.ProductName} description={item.ProductCode} />
              </AutocompleteItem>
            ))}
        </Autocomplete>
      )}
      rules={{ required: true }}
    />
  );
};

export default FormProductsIdSelect;
