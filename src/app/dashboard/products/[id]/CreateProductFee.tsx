import CustomDrawer, { Props } from "@/components/CustomDrawer";
import { FormInput, FormSelect } from "@/components/shared/form";
import { useCreateGroup } from "@/hooks/api/groups-api";
import { ProductFeesType, useCreateProduct } from "@/hooks/api/products-api";
import { textToSlug } from "@/lib/helper";
import { ModalHeader, ModalBody, Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const CreateProductFee: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const params = useParams<{ id: string }>();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      FeeName: "",
      FeeDesc: "",
      FeeType: "",
      FeeMode: "",
      FeeValue: "",
    },
  });

  const { mutate, isError, isSuccess, isPending, data, error } =
    useCreateProduct();

  const onSubmit = (data: any) => {
    const submitData = {
      RequestID: "CreateProductFees",
      FeeSlug: textToSlug(data.FeeName),
      ProductID: params.id,
      ...data,
    };

    return mutate(submitData);
  };

  return (
    <CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader className="flex flex-col gap-1 mt-5">
        Add Product Fee
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Fee Name"
            name="FeeName"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Fee Description"
            name="FeeDesc"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Fee Value"
            name="FeeValue"
            control={control}
            errors={errors}
          />
          <FormSelect
            label="Fee Type"
            name="FeeType"
            control={control}
            errors={errors}
            options={[
              { label: "Flat figure", value: "F" },
              { label: "Percentage", value: "P" },
            ]}
          />
          <FormSelect
            label="Fee Mode"
            name="FeeMode"
            control={control}
            errors={errors}
            options={[
              { label: "Recurring", value: "R" },
              { label: "Once", value: "O" },
            ]}
          />
          <Button
            type="submit"
            className="my-5 w-full"
            isLoading={isPending}
            isDisabled={isPending}
            color={isSuccess ? "success" : isError ? "danger" : "default"}
          >
            Create Product Fee
          </Button>
        </form>
      </ModalBody>
    </CustomDrawer>
  );
};

export default CreateProductFee;
