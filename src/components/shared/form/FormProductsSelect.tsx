import React from "react";
import { Autocomplete, AutocompleteItem, User } from "@nextui-org/react";
import { UserSearchIcon } from "lucide-react";
import { FieldErrors, FieldValues, Control, Controller } from "react-hook-form";

import { useFetchProducts } from "@/hooks/api/products-api";

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

const FormProductsSelect = ({
  name,
  control,
  label,
  errors,
}: FormSelectProps) => {
  const { isPending, data } = useFetchProducts();

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

export default FormProductsSelect;
