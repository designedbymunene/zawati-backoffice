import { useDebounce } from "@uidotdev/usehooks";
import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupMembersType } from "./groups-api";
import toast from "react-hot-toast";

export interface MemberType {
  IDFront: any;
  IDBack: any;
  CustomerID: string;
  FirstName: string;
  OtherNames: string;
  DateOfBirth: string;
  Gender: string;
  Address: string;
  IDNumber: string;
  NextOfKin: string;
  NextOfKinRelationship: string;
  Email: string;
  PhoneNumber: string;
  WorkSector: string;
  DateCreated: Date;
  County: string;
  SubCounty: string;
}

interface AllMembersRequest {
  AnyName: string;
  Offset: string;
  Limit: string;
}

const fetchAllMembers = async (payload: AllMembersRequest) => {
  const response = await axiosService.post("", {
    RequestID: "GetMember",
    ...payload,
  });
  return response.data;
};

const useFetchAllMembers = (payload: AllMembersRequest) => {
  return useQuery({
    queryKey: ["members", payload],
    queryFn: () => fetchAllMembers(payload),
  });
};

const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMember) => {
      return axiosService.post("", newMember);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["members"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

export interface SearchGroupParams {
  searchTerm: string;
}

const useSearchGroupMembers = (params: SearchGroupParams) => {
  const [debouncedSearchTerm] = useDebounce(params.searchTerm, 500);

  return useQuery({
    queryKey: ["group-members", debouncedSearchTerm],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroupMembers",
        AnyName: debouncedSearchTerm,
      });

      return (await axiosService.post("", bodyContent))
        .data as GroupMembersType[];
    },
  });
};

const useGetMember = (id: string) => {
  return useQuery({
    queryKey: id ? ["member", id] : ["member"],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetMember",
        CustomerID: id,
      });

      return (await axiosService.post("", bodyContent)).data as MemberType[];
    },
  });
};

export interface MemberProducts {
  ProductCode: string;
  ProductName: string;
  ProductValue: string;
  ContributionFrequency: string;
}

const useGetMemberProducts = (id: string) => {
  return useQuery({
    queryKey: ["member-products", id],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetMemberProducts",
        CustomerID: id,
      });

      return (await axiosService.post("", bodyContent))
        .data as MemberProducts[];
    },
  });
};

export interface UnblockPinRequest {
  CustomerID: string;
  UserID: string;
}

const useUnblockPin = () => {
  return useMutation({
    mutationFn: (data: UnblockPinRequest) => {
      return axiosService.post("", {
        RequestID: "UnblockCustomerPIN",
        ...data,
      });
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.Message);
    },
    onError(error, variables, context) {
      if (error instanceof Error && error.response) {
        toast.error(error.response.data.Message);
      } else {
        toast.error("An unknown error occurred");
      }
    },
  });
};

export interface ChangeCustomerDeviceRequest {
  CustomerID: string;
  UserID: string;
  DeviceID: string;
  DeviceMake: string;
  Platform: string;
}

const useChangeCustomerDevice = () => {
  return useMutation({
    mutationFn: (data: ChangeCustomerDeviceRequest) => {
      return axiosService.post("", {
        RequestID: "ChangeCustomerDevice",
        ...data,
      });
    },
    onSuccess(data, variables, context) {
      toast.success(data.data.Message);
    },
    onError(error, variables, context) {
      if (error instanceof Error && error.response) {
        toast.error(error.response.data.Message);
      } else {
        toast.error("An unknown error occurred");
      }
    },
  });
};

export {
  useFetchAllMembers,
  useCreateMember,
  useSearchGroupMembers,
  useGetMember,
  useGetMemberProducts,
  useUnblockPin,
  useChangeCustomerDevice,
};
