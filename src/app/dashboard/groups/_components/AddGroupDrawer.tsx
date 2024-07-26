import CustomDrawer, { Props } from "@/components/CustomDrawer";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, ModalBody, ModalHeader } from "@nextui-org/react";
import FormInput from "@/components/shared/form/FormInput";
import FormCountySelect from "@/components/shared/form/FormCountySelect";
import FormConstituencySelect from "@/components/shared/form/FormConstituencySelect";
import FormWardSelect from "@/components/shared/form/FormWardSelect";
import {
	generateUniqueDigits,
	getCurrentDateTimeString,
	textToSlug,
} from "@/lib/helper";
import { useCreateGroup } from "@/hooks/api/groups-api";
import toast from "react-hot-toast";

const AddGroupDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			GroupName: "",
			GroupDescription: "",
			PhoneNumber: "",
			Town: "",
			ConstituencyID: "",
			CountyID: "",
			WardID: "",
			RegCertNo: "",
		},
	});

	const { mutate, isError, isSuccess, isPending, data, error } =
		useCreateGroup();

	const onSubmit = (data: any) => {
		const uniqueDigitString: string = generateUniqueDigits();
		const submitData = {
			RequestID: "CreateGroup",
			GroupCode: `KE/${data.CountyID}/${uniqueDigitString}`,
			Slug: textToSlug(data.GroupName),
			RegistrationDate: getCurrentDateTimeString(),
			PostalAddress: "0",
			PostalCode: "0",
			CountryCode: "KE",
			...data,
		};

		console.log("Submit Data", submitData);

		return mutate(submitData);
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
			<ModalHeader className="flex flex-col gap-1 mt-5">Add Group</ModalHeader>
			<ModalBody>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormInput
						label="Group Name"
						name="GroupName"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Group Description"
						name="GroupDescription"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Phone Number"
						name="PhoneNumber"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Registration Certificate Number"
						name="RegCertNo"
						control={control}
						errors={errors}
					/>
					<FormInput
						label="Town"
						name="Town"
						control={control}
						errors={errors}
					/>
					<FormCountySelect
						control={control}
						errors={errors}
						label="County"
						name="CountyID"
						key={"county"}
					/>
					<FormConstituencySelect
						control={control}
						errors={errors}
						label="Constituency"
						name="ConstituencyID"
						key={"constituency"}
					/>
					<FormWardSelect
						control={control}
						errors={errors}
						label="Ward"
						name="WardID"
						key={"ward"}
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
						Add Group
					</Button>
				</form>
			</ModalBody>
		</CustomDrawer>
	);
};

export default AddGroupDrawer;
