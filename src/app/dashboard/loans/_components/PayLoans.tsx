import CustomDrawer, { Props } from "@/components/CustomDrawer";
import { FormInput } from "@/components/shared/form";
import FormGroupIdSelect from "@/components/shared/form/FormGroupIdSelect";
import FormLoanTypeSelect from "@/components/shared/form/FormLoanTypeSelect";
import FormMemberSelect from "@/components/shared/form/FormMemberSelect";
import FormProductsIdSelect from "@/components/shared/form/FormPeoductsIdSelect";
import { PayLoanRequest, usePayLoan } from "@/hooks/api/loans-api";
import { ModalHeader, ModalBody, Button } from "@nextui-org/react";
import { AxiosError } from "axios";
import { PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export interface ErrorMessage {
	ResultCode: string;
	ResultDesc: string;
	Message: string;
}

const PayLoanDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
	const searchParams = useSearchParams();

	const reference = searchParams.get("reference");
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<PayLoanRequest>({
		mode: "onBlur",
		defaultValues: {
			TransactionType: "P",
			ReceiptNo: "",
			Amount: "",
			PaymenyReference: reference,
			Status: "1",
		},
	});

	const { mutate, isError, isSuccess, isPending, data, error } = usePayLoan();

	const onSubmit = (data: PayLoanRequest) => {
		return mutate(data, {
			onSuccess: (data) => {
				toast.success(data.data.Message);
				reset();
				onOpenChange(!isOpen);
			},
			onError: (error: AxiosError<ErrorMessage>) => {
				const errorMessage = error?.response?.data?.Message as string;
				toast.error(errorMessage);
			},
		});
	};

	return (
		<CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalHeader className="flex flex-col gap-1 mt-5">Pay Loan</ModalHeader>
			<ModalBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label="Amount"
						name="Amount"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Receipt Number"
						name="ReceiptNo"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Payment Reference"
						name="PaymenyReference"
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
						Pay Loan
					</Button>
				</form>
			</ModalBody>
		</CustomDrawer>
	);
};

export default PayLoanDrawer;
