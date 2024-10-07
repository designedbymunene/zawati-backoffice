import { GroupType } from "@/lib/types/group_type";
import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AllGroupsRequest {
  GroupName: string;
  Offset: string;
  Limit: string;
}

const fetchAllGroups = async (payload: AllGroupsRequest) => {
  const response = await axiosService.post("", {
    RequestID: "GetGroups",
    ...payload,
  });
  return response.data;
};

const useFetchAllGroups = (payload: AllGroupsRequest) => {
  return useQuery({
    queryKey: ["groups", payload],
    queryFn: () => fetchAllGroups(payload),
  });
};

const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newGroup) => {
      return axiosService.post("", newGroup);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

const useGroupProducts = (groupID: string) => {
  return useQuery({
    queryKey: ["groups", groupID],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroupProducts",
        GroupID: groupID,
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

export interface GroupMembersType {
  FirstName: string;
  CustomerID: string;
  OtherNames: string;
  IDNumber: string;
  PhoneNumber: string;
  YearOfBirth: string;
  Gender: string;
  EconomicSector: string;
  DateJoined: Date;
}

const useGetGroupMembers = (groupID: string) => {
  return useQuery({
    queryKey: ["group-members"],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroupMembers",
        GroupID: groupID,
      });

      return (await axiosService.post("", bodyContent))
        .data as GroupMembersType[];
    },
  });
};

export interface AddGroupMemberType {
  RequestID: string;
  GroupID: string;
  CustomerID: string;
}
const useAddGroupMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGroupMember: AddGroupMemberType) => {
      return axiosService.post("", newGroupMember);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["groups-members"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

interface CreateGroupLeaders {
  RequestID: string;
  GroupID: string;
  CustomerID: React.Key;
  RoleName: string;
  UserID: string;
}

const useCreateGroupLeaders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createGroupLeaders: CreateGroupLeaders) => {
      return axiosService.post("", createGroupLeaders);
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["groups-leader"] });
      toast.success(data.data.Message);
    },
    onError: (error) => {
      const errorMessage = error.response?.data.Message as string;
      toast.error(error.message);
    },
  });
};

export interface GetGroupLeadersType {
  id: string;
  GroupName: string;
  CustomerName: string;
  RoleCode: string;
  DateCreated: Date;
  DateUpdated: string;
  CreatedBy: string;
}

const useGetGroupLeaders = (groupID: string) => {
  return useQuery({
    queryKey: ["group-leader", groupID],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroupLeaders",
        GroupID: groupID,
      });

      return (await axiosService.post("", bodyContent))
        .data as GetGroupLeadersType[];
    },
  });
};

export {
  useFetchAllGroups,
  useCreateGroup,
  useGroupProducts,
  useGetGroupMembers,
  useAddGroupMember,
  useCreateGroupLeaders,
  useGetGroupLeaders,
};
