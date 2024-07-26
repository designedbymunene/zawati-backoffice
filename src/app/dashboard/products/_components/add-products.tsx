import CustomDrawer, { Props } from "@/components/CustomDrawer";
import { TagIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, ModalBody, ModalHeader } from "@nextui-org/react";
import FormInput from "@/components/shared/form/FormInput";
import toast from "react-hot-toast";

import { useCreateProduct } from "@/hooks/api/products-api";
import { FormSelect } from "@/components/shared/form";

const AddProductsDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      RequestID: "CreateProduct",
      ProductCode: "",
      ProductName: "",
      ProductDesc: "",
      ProductCost: "",
      ProductFrequency: "",
    },
  });

  const { mutate, isError, isSuccess, isPending, data, error } =
    useCreateProduct();

  const onSubmit = (data: any) => {
    console.log("Submit Data", data);

    return mutate(data);
  };

  React.useEffect(() => {
    if (isSuccess) {
      toast.success(data?.data?.Message);
      reset();
      () => onOpenChange(!isOpen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data?.Message, isSuccess, reset]);

  return (
    <CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader className="flex flex-col gap-1 mt-5">
        Add Product
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Product Name"
            name="ProductName"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Product Code"
            name="ProductCode"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Product Description"
            name="ProductDesc"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Product Cost"
            name="ProductCost"
            control={control}
            errors={errors}
          />
          <FormSelect
            options={[
              { label: "Daily", value: "D" },
              { label: "Weekly", value: "W" },
              { label: "Monthly", value: "M" },
              { label: "Yearly", value: "Y" },
            ]}
            label="Product Frequency"
            name="ProductFrequency"
            control={control}
            errors={errors}
          />
          <div className="pt-5" />
          <Button
            type="submit"
            className="w-full"
            isDisabled={isPending}
            isLoading={isPending}
            startContent={!isPending && <TagIcon className="mr-2" />}
          >
            Add Product
          </Button>
        </form>
      </ModalBody>
    </CustomDrawer>
  );
};

export default AddProductsDrawer;
