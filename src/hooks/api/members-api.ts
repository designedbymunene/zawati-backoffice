import { useDebounce } from "@uidotdev/usehooks";
import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GroupMembersType } from "./groups-api";

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

const useFetchAllMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetMember",
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMember) => {
      return axiosService.post("", newMember);
    },
    onSettled: async (_, error) => {
      if (error) {
        // console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["members"] });
      }
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
        Platform: "0",
      });
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
