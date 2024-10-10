"use client";
import ErrorPage from "@/components/shared/ErrorPage";
import PendingState from "@/components/shared/PendingState";
import { axiosInstance } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import { RegisterUserRequest, useRegisterUser, UserRoles } from "../page";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosService from "@/services/axios-service";
import { Button, Select, SelectItem } from "@nextui-org/react";

interface UserProfileData {
  UsedID: string;
  UserName: string;
  UserPassword: string;
  RoleID: string;
  UserRole: string;
  NationalID: string | null;
  PhoneNo: string | null;
  DateCreated: string;
  Status: string;
  FullNames: string;
  NoOfAttempts: string;
  ChangePassword: string;
}

const UserProfile: FC = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [updateData, setUpdateData] = useState<{
    UserRole?: string;
    Status?: string;
  }>({
    UserRole: "",
    Status: "",
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await axiosInstance.post<UserProfileData[]>("", {
        RequestID: "GetSystemUsers",
        UserID: params.id,
      });
      return response.data;
    },
    select(data) {
      return data[0];
    },
  });

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

  const onSubmit = () => {
    console.log(updateData);
    const payload = {
      ...updateData,
      UserID: params.id,
      Status: "1",
    };
    mutation.mutate(payload, {
      onSuccess(data, variables, context) {
        toast.success("User updates successfully");
        router.back();
      },
      onError(error, variables, context) {
        const errorMessage = error?.response?.data?.Message as string;
        toast.error(errorMessage);
      },
    });
  };

  if (isPending) {
    return <PendingState />;
  }

  if (isError) {
    return <ErrorPage button="" error={error} link={" "} message="" />;
  }

  const statusLabel = data.Status === "1" ? "Active" : "Inactive";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">
          User Profile
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            User Name
          </label>
          <p className="text-lg">{data.UserName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Names
          </label>
          <p className="text-lg">{data.FullNames || "N/A"}</p>
        </div>
        <div className="mb-4">
          <Select
            variant="bordered"
            isLoading={userRoles.isPending}
            items={userRoles.data}
            label="User Role"
            placeholder={data.UserRole}
            selectedKeys={updateData?.UserRole}
            onSelectionChange={(item) =>
              setUpdateData({ UserRole: item.currentKey })
            }
          >
            {(role) => (
              <SelectItem key={role.RoleID}>{role.RoleName}</SelectItem>
            )}
          </Select>
          {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            UserRole
          </label>
          <p className="text-lg">{data.UserRole}</p> */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Date Created
          </label>
          <p className="text-lg">{data.DateCreated}</p>
        </div>
        <div className="mb-4">
          <Select
            variant="bordered"
            items={[
              { id: "0", label: "Active" },
              { id: "2", label: "Deactivate" },
            ]}
            label="User Status"
            placeholder={statusLabel}
            selectedKeys={updateData?.Role}
            onSelectionChange={(item) =>
              setUpdateData({ Status: item.currentKey })
            }
          >
            {(status) => (
              <SelectItem key={status.id}>{status.label}</SelectItem>
            )}
          </Select>
          {/* <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <span
            className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
              data.Status === "1"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {statusLabel}
          </span> */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            No. of Login Attempts
          </label>
          <p className="text-lg">{data.NoOfAttempts}</p>
        </div>
        {/* <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Change Password Required
          </label>
          <p className="text-lg">
            {data.ChangePassword === "1" ? "Yes" : "No"}
          </p>
        </div> */}
        <Button
          isLoading={mutation.isPending}
          isDisabled={mutation.isPending}
          onClick={onSubmit}
          className="w-full mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {mutation.isPending ? "Updating Profile..." : "Edit Profile"}
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
