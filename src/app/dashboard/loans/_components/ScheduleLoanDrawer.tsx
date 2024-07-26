import CustomDrawer, { Props } from "@/components/CustomDrawer";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, ModalBody, ModalHeader } from "@nextui-org/react";
import FormInput from "@/components/shared/form/FormInput";
import { useCreateGroup } from "@/hooks/api/groups-api";
import FormLoanTypeSelect from "@/components/shared/form/FormLoanTypeSelect";
import FormGroupIdSelect from "@/components/shared/form/FormGroupIdSelect";
import FormProductsIdSelect from "@/components/shared/form/FormPeoductsIdSelect";
import toast from "react-hot-toast";

const ScheduleLoanDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      RequestID: "ScheduleLoan",
      GroupID: "",
      ProductID: "",
      LoanType: "",
      LoanFee: "",
      LoanInsurance: "",
      LoanCharges: "",
    },
  });

  const { mutate, isError, isSuccess, isPending, data, error } =
    useCreateGroup();

  const onSubmit = (data: any) => {
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
        Schedule Loan
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Loan Fee"
            name="LoanFee"
            control={control}
            errors={errors}
          />
          <FormInput
            label="Loan Insurance"
            name="LoanInsurance"
            control={control}
            errors={errors}
          />
          <FormInput
            label="LoanCharges"
            name="LoanCharges"
            control={control}
            errors={errors}
          />
          <FormGroupIdSelect
            label="Group Name"
            name="GroupID"
            control={control}
            errors={errors}
          />
          {isError && (
            <p className="my-2 text-red-400 text-center">
              Group has no members
            </p>
          )}
          <FormProductsIdSelect
            label="Products Name"
            name="ProductID"
            control={control}
            errors={errors}
          />
          <FormLoanTypeSelect
            label="Loan Type"
            name="LoanType"
            control={control}
            errors={errors}
          />
          <div className="pt-5" />
          <Button
            type="submit"
            className="w-full"
            isDisabled={isPending}
            isLoading={isPending}
            startContent={!isPending && <PlusIcon className="mr-2" />}
            color={"default"}
          >
            Schedule Loan
          </Button>
        </form>
      </ModalBody>
    </CustomDrawer>
  );
};

export default ScheduleLoanDrawer;
