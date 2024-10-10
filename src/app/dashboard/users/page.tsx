"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
  Link,
  Tooltip,
  useDisclosure,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";

import { useFetchUsers } from "@/hooks/api/api";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import axiosService from "@/services/axios-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useUserStore } from "@/app/(auth)/_store";

export interface User {
  UsedID: string;
  UserName: string;
  UserPassword: string;
  RoleID: string;
  UserRole: string;
  DateCreated: string;
  Status: string;
  DetailsID: string;
  NoOfAttempts: string;
  ChangePassword: string;
}

const columns = [
  {
    key: "UsedID",
    label: "ID",
  },
  {
    key: "UserName",
    label: "User Name",
  },
  {
    key: "DateCreated",
    label: "Date Created",
  },
  {
    key: "NoOfAttempts",
    label: "Login Attempts",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export interface UserRoles {
  RoleID: string;
  RoleName: string;
  RoleCode: string;
  DateCreated: string;
  Status: string;
}

const UserPage = () => {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error, isSuccess } = useFetchUsers();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUserStore();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterUserRequest>();

  const userRoles = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      const response = await axiosService.post<UserRoles[]>("", {
        RequestID: "GetSystemRoles",
      });
      return response.data;
    },
  });

  const mutation = useRegisterUser();

  // status 2 - deactivated; 1 - active

  const onSubmit = (data: RegisterUserRequest) => {
    const payload = {
      ...data,
      DeviceID: "",
      DeviceMake: "",
      Platform: "0",
      UserID: "",
      Status: "1",
    };
    mutation.mutate(payload, {
      onSuccess(data, variables, context) {
        toast.success("User created successfully");
        reset();
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError(error, variables, context) {
        const errorMessage = error?.response?.data?.Message as string;
        toast.error(errorMessage);
      },
    });
  };

  const renderCell = React.useCallback((role: User, columnKey: React.Key) => {
    const cellValue = role[columnKey as keyof User];

    switch (columnKey) {
      case "UsedID":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{role.UsedID}</p>
          </div>
        );
      case "UserName":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{role.UserName}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {role.UserRole}
            </p>
          </div>
        );
      case "DateCreated":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {role.DateCreated}
            </p>
          </div>
        );
      case "NoOfAttempts":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize text-default-400">
              {role.NoOfAttempts}
            </p>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex gap-2">
            <Tooltip content="View role">
              <Tooltip content="Details">
                <Link href={`/dashboard/users/${role.UsedID}`}>
                  <Button isIconOnly variant="bordered" aria-label="View">
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </Tooltip>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const topContent = () => {
    return (
      <div className="flex flex-row justify-between align-center">
        <div />
        <Button
          color="primary"
          variant="bordered"
          startContent={<UserIcon />}
          onPress={onOpen}
        >
          Add user
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Table
        isHeaderSticky
        aria-label="User table"
        topContent={topContent()}
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={isSuccess ? (data as User[]) : isError ? [] : []}
          isLoading={isPending}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={isError ? error.message : "No users found"}
        >
          {(item) => (
            <TableRow key={item.RoleID}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create User Account
              </ModalHeader>
              <ModalBody>
                <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex mt-5 w-full flex-wrap md:flex-nowrap gap-4">
                    <Input
                      variant="bordered"
                      label="Name"
                      {...register("FullNames", {
                        required: "Name is required",
                      })}
                      isInvalid={Boolean(errors.FullNames)}
                      errorMessage={errors.FullNames?.message}
                    />
                    <Input
                      variant="bordered"
                      label="Username"
                      {...register("UserName", {
                        required: "Username is required",
                      })}
                      isInvalid={Boolean(errors.UserName)}
                      errorMessage={errors.UserName?.message}
                    />
                  </div>
                  <Input
                    variant="bordered"
                    label="National ID"
                    className="mt-5"
                    {...register("NationalID", {
                      required: "National ID is required",
                    })}
                    isInvalid={Boolean(errors.NationalID)}
                    errorMessage={errors.NationalID?.message}
                  />
                  <Input
                    variant="bordered"
                    label="Phone Number"
                    className="mt-5"
                    {...register("PhoneNo", {
                      required: "Phone Number is required",
                    })}
                    isInvalid={Boolean(errors.PhoneNo)}
                    errorMessage={errors.PhoneNo?.message}
                  />
                  <Select
                    variant="bordered"
                    isLoading={userRoles.isPending}
                    items={userRoles.data}
                    label="User Role"
                    placeholder="Select an user role"
                    className="mt-5"
                    {...register("UserRole", {
                      required: "User Role is required",
                    })}
                    isInvalid={Boolean(errors.UserRole)}
                    errorMessage={errors.UserRole?.message}
                  >
                    {(role) => (
                      <SelectItem key={role.RoleID}>{role.RoleName}</SelectItem>
                    )}
                  </Select>
                  <Input
                    label="Password"
                    variant="bordered"
                    type={isVisible ? "text" : "password"}
                    {...register("Password", {
                      required: "Password is required",
                    })}
                    isInvalid={Boolean(errors.Password)}
                    errorMessage={errors.Password?.message}
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeOffIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    className="my-5"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                  isDisabled={mutation.isPending}
                  isLoading={mutation.isPending}
                >
                  {mutation.isPending ? "Creating User..." : "Create User"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserPage;

export interface RegisterUserRequest {
  UserName: string;
  Password: string;
  FullNames: string;
  NationalID: string;
  PhoneNo: string;
  UserRole: string;
  DeviceID: string;
  DeviceMake: string;
  Platform: string;
  UserID: string;
  Status: string;
}

const registerUser = async (request: RegisterUserRequest) => {
  const response = await axiosService.post("", {
    RequestID: "CreateSystemUser",
    ...request,
  });
  return response.data;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
