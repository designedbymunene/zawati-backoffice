import CustomDrawer, { Props } from "@/components/CustomDrawer";
import { FormInput, FormSelect } from "@/components/shared/form";
import FormGroupSelect from "@/components/shared/form/FormGroupSelect";
import FormMemberSelect from "@/components/shared/form/FormMemberSelect";
import FormProductsSelect from "@/components/shared/form/FormProductsSelect";
import { useCreateGroup } from "@/hooks/api/groups-api";
import { textToSlug } from "@/lib/helper";
import { ModalHeader, ModalBody, Button } from "@nextui-org/react";

import React from "react";
import { useForm } from "react-hook-form";

const AddSavingsDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      RequestID: "AddSaving",
      GroupID: "",
      CustomerID: "",
      ProductID: "",
      SavingsType: "",
      ReceiptNo: "",
      Amount: "",
      PaymenyReference: "",
      Status: "1",
    },
  });

  const { mutate, isError, isSuccess, isPending, data, error } =
    useCreateGroup();

  const onSubmit = (data: any) => {
    console.log("Submit Data", data);

    return mutate(data);
  };

  // React.useEffect(() => {
  //   if (isSuccess) {
  //     reset();
  //   }
  // }, [isSuccess, reset]);

  return (
    <CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalHeader className="flex flex-col gap-1 mt-5">
        Add Savings
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Receipt Number"
            name="ReceiptNo"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Paymeny Reference"
            name="PaymenyReference"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Amount"
            name="Amount"
            control={control}
            errors={errors}
          />
          <FormProductsSelect
            label="Products Name"
            name="ProductID"
            control={control}
            errors={errors}
          />
          <FormGroupSelect
            label="Group Name"
            name="GroupID"
            control={control}
            errors={errors}
          />
          <FormMemberSelect
            label="Member Name"
            name="CustomerID"
            control={control}
            errors={errors}
          />
          <FormSelect
            options={[
              { label: "Penalty", value: "P" },
              { label: "Membership fee", value: "MF" },
              { label: "Interest", value: "I" },
              { label: "Contribution", value: "C" },
            ]}
            label="Savings Type"
            name="SavingsType"
            control={control}
            errors={errors}
          />

          <Button
            type="submit"
            className="mt-5 w-full"
            isLoading={isPending}
            isDisabled={isPending}
            color={isSuccess ? "success" : isError ? "danger" : "default"}
          >
            Add Savings
          </Button>
        </form>
      </ModalBody>
    </CustomDrawer>
  );
};

export default AddSavingsDrawer;
