import { GroupType } from "@/lib/types/group_type";
import axiosService from "@/services/axios-service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const useFetchAllGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroups",
      });

      return (await axiosService.post("", bodyContent)).data;
    },
  });
};

const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newGroup) => {
      return axiosService.post("", newGroup);
    },
    onSettled: async (_, error) => {
      if (error) {
        // console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["groups"] });
      }
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
  CustomerID: string;
  Firstname: string;
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
    onSettled: async (_, error) => {
      if (error) {
        // console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["group-members"] });
      }
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
    onSettled: async (_, error) => {
      if (error) {
        // console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["group-leader"] });
      }
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
