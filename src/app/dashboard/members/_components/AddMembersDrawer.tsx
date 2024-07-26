import { Props } from "@/components/CustomDrawer";
import { UserPlus2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import FormInput from "@/components/shared/form/FormInput";
import FormCountySelect from "@/components/shared/form/FormCountySelect";
import FormConstituencySelect from "@/components/shared/form/FormConstituencySelect";
import { useCreateMember } from "@/hooks/api/members-api";
import { FormSelect } from "@/components/shared/form";
import { nextOfKinRelationships } from "@/lib/data";
import FormDatePicker from "@/components/shared/form/FormDatePicker";
import toast from "react-hot-toast";

const AddMembersDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      FirstName: "",
      OtherNames: "",
      DOB: "",
      Gender: "",
      MaritalStatus: "",
      IDNumber: "",
      WorkSector: "",
      Email: "",
      PhoneNumber: "",
      NextOfKin: "",
      NextOfKinRelationship: "",
    },
  });

  const { mutate, isError, isSuccess, isPending, data, error } =
    useCreateMember();

  const onSubmit = (data: any) => {
    const submitData = {
      RequestID: "CreateMember",
      Gender: Array.from(data.Gender)[0],
      PhotoID: "1",
      Occupation: "1",
      Address: "1",
      CustomerNo: data.IDNumber,
      ...data,
    };

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
    <Modal
      scrollBehavior="inside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="blur"
      size="full"
      classNames={{
        wrapper: "flex justify-end",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 50,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      className="rounded-md max-w-3xl w-full h-screen max-h-screen"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 mt-5">
          Create Member
        </ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-x-5"
          >
            <FormInput
              label="First Name"
              name="FirstName"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Other Names"
              name="OtherNames"
              control={control}
              errors={errors}
            />
            <FormSelect
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
              name={"Gender"}
              label={"Gender"}
              errors={errors}
              control={control}
            />
            <FormInput
              label="Phone Number"
              name="PhoneNumber"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Email Address"
              name="Email"
              control={control}
              errors={errors}
            />
            <FormInput
              label="ID Number"
              name="IDNumber"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Work Sector"
              name="WorkSector"
              control={control}
              errors={errors}
            />
            <FormDatePicker
              control={control}
              errors={errors}
              label="Date Of Birth"
              name="DOB"
              key={"DOB"}
            />
            <FormCountySelect
              control={control}
              errors={errors}
              label="County"
              name="County"
              key={"county"}
            />
            <FormConstituencySelect
              control={control}
              errors={errors}
              label="Subcounty"
              name="SubCounty"
              key={"SubCounty"}
            />
            <FormInput
              label="Next of kin"
              name="NextOfKin"
              control={control}
              errors={errors}
            />
            <FormSelect
              options={nextOfKinRelationships}
              name={"NextOfKinRelationship"}
              label={"Next of kin relationship"}
              errors={errors}
              control={control}
            />
          </form>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-5"
            isDisabled={isPending}
            isLoading={isPending}
            startContent={!isPending && <UserPlus2 className="mr-2 h-5 w-5" />}
            color={"default"}
          >
            Create Member
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddMembersDrawer;
