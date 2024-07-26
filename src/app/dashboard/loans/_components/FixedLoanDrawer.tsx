import CustomDrawer, { Props } from "@/components/CustomDrawer";
import { FormInput } from "@/components/shared/form";
import FormGroupIdSelect from "@/components/shared/form/FormGroupIdSelect";
import FormLoanTypeSelect from "@/components/shared/form/FormLoanTypeSelect";
import FormMemberSelect from "@/components/shared/form/FormMemberSelect";
import FormProductsIdSelect from "@/components/shared/form/FormPeoductsIdSelect";
import {
	CreateFixedInterestLoanRequest,
	useCreateFixedInterestLoan,
} from "@/hooks/api/loans-api";
import { ModalHeader, ModalBody, Button } from "@nextui-org/react";
import { AxiosError } from "axios";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export interface ErrorMessage {
	ResultCode: string;
	ResultDesc: string;
	Message: string;
}

const FixedLoanDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<CreateFixedInterestLoanRequest>({
		mode: "onBlur",
		defaultValues: {
			LoanFee: "",
			GroupID: "",
			LoanType: "",
			ProductID: "",
			CustomerID: "",
			LoanAmtApplied: "",
			LoanInsurance: "",
			LoanDuration: "",
		},
	});

	const { mutate, isError, isSuccess, isPending, data, error } =
		useCreateFixedInterestLoan();

	const onSubmit = (data: CreateFixedInterestLoanRequest) => {
		return mutate(data, {
			onSuccess: (data) => {
				toast.success(data.data.Message);
				reset();
				onOpenChange(!isOpen);
			},
			onError: (error: AxiosError<ErrorMessage>, _, __) => {
				const errorMessage = error?.response?.data?.Message as string;
				toast.error(errorMessage);
			},
		});
	};

	return (
		<CustomDrawer isOpen={isOpen} onOpenChange={onOpenChange}>
			<ModalHeader className="flex flex-col gap-1 mt-5">
				Schedule Loan
			</ModalHeader>
			<ModalBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormGroupIdSelect
						label="Group Name"
						name="GroupID"
						control={control}
						errors={errors}
					/>
					<FormProductsIdSelect
						label="Products Name"
						name="ProductID"
						control={control}
						errors={errors}
					/>
					<FormMemberSelect
						label="Member Name"
						name="CustomerID"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Loan Fee"
						name="LoanFee"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Loan Amount Applied"
						name="LoanAmtApplied"
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
						label="Loan Duration"
						name="LoanDuration"
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
						Create Fixed Loan
					</Button>
				</form>
			</ModalBody>
		</CustomDrawer>
	);
};

export default FixedLoanDrawer;
