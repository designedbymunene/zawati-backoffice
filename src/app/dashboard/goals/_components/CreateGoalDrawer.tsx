import React from 'react'
import { UserPlus2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Modal, ModalContent, ModalHeader, Button, ModalBody } from '@nextui-org/react';

import { Props } from '@/components/CustomDrawer';
import { FormInput } from '@/components/shared/form';
import { useCreateGoalMutation } from '@/hooks/api/goals-api';

const CreateGoalDrawer: React.FC<Props> = ({ isOpen, onOpenChange }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      GoalName: "",
      GoalDescription: "",
      GoalPeriod: "",
      Amount: "",
    },
  });

  const createGoal = useCreateGoalMutation();

  const onSubmit = (data: any) => {
    const goal_data = {
      ...data,
      CustomerID: customer?.CustomerID as string,
      GroupID: customer?.GroupID as string,
      PhoneNumber: customer?.PhoneNumber as string,
    };
    createGoal.mutate(goal_data);
  };

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
              label="Goal Name"
              name="GoalName"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Group Description"
              name="GoalDescription"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Group Period"
              name="GroupPeriod"
              control={control}
              errors={errors}
            />
            <FormInput
              label="Amount"
              name="Amount"
              control={control}
              errors={errors}
            />

          </form>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-5"
            isDisabled={createGoal.isPending}
            isLoading={createGoal.isPending}
            startContent={!createGoal.isPending && <UserPlus2 className="mr-2 h-5 w-5" />}
            color={"default"}
          >
            Create Member
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CreateGoalDrawer