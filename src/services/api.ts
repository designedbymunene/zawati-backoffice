import axios from "axios";

import { AuthSignInRequest } from "@/types/auth";
import { CreateMemberRequest, Member, GetMemberRequest } from "@/types/members";
import {
  CreateSavingsRequest,
  Savings,
  GetSavingsRequest,
} from "@/types/savings";
import {
  CreateGroupLeadersRequest,
  GroupMeeting,
  CreateGroupMeetingRequest,
  CreateGroupMemberRequest,
  CreateGroupProductsRequest,
  CreateGroupRequest,
  GetGroupLeadersRequest,
  Group,
} from "@/types/groups";

const BASE_URL = "https://apis.automittech.tech/";

export const axiosInstance = axios.create({ baseURL: BASE_URL });

export const authService = {
  signIn: async (credentials: AuthSignInRequest) => {
    const headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    const bodyContent = JSON.stringify({
      RequestID: "LoginValidate",
      ...credentials,
    });

    const response = await fetch(
      "https://apis.automittech.tech/",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = response.json();

    // console.log("🎌 Response data", data);
    return data;
  },
};

/**
 *
 * 	Group APIs
 *
 */

export const createGroup = async (data: CreateGroupRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "CreateGroup",
      ...data,
    })
  ).data;
};

export const getGroups = async (pageParam: number) => {
  return (
    await axiosInstance.post<Group[]>("", {
      RequestID: "GetGroups",
      Offset: String(pageParam),
      Limit: 3,
    })
  ).data;
};

export const getGroup = async (group_id: string) => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetGroups",
      GroupCode: group_id,
    })
  ).data;
};

export const searchGroups = async (group_name: string) => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetGroups",
      GroupName: group_name,
    })
  ).data;
};

export const getGroupProducts = async (group_id: string) => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetGroupProducts",
      GroupID: group_id,
    })
  ).data;
};

export const createGroupProducts = async (data: CreateGroupProductsRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "CreateGroupProducts",
      ...data,
    })
  ).data;
};

export const createGroupMember = async (data: CreateGroupMemberRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "CreateGroupMember",
      ...data,
    })
  ).data;
};

export const createGroupLeaders = async (data: CreateGroupLeadersRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "CreateGroupMember",
      ...data,
    })
  ).data;
};

export const getGroupLeaders = async (data: GetGroupLeadersRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetGroupLeaders",
      ...data,
    })
  ).data;
};

export const createGroupMeetings = async (data: CreateGroupMeetingRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "CreateGroupMeeting",
      ...data,
    })
  ).data;
};

export const getGroupMeetings = async (id: string) => {
  return (
    await axiosInstance.post<GroupMeeting[]>("", {
      RequestID: "GetGroupMeetings",
      GroupID: id,
    })
  ).data;
};

/**
 *
 *
 * 	Member APIs
 * 	CRUD
 *
 */

export const createMember = async (data: CreateMemberRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "CreateMember",
      ...data,
    })
  ).data;
};

export const getMembers = async (pageParam: number) => {
  return (
    await axiosInstance.post<Member[]>("", {
      RequestID: "GetMember",
      Offset: String(pageParam),
      Limit: 3,
    })
  ).data;
};

export const getMember = async (data: GetMemberRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetMember",
      ...data,
    })
  ).data;
};

export const searchMember = async (member_name: string) => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetMember",
      AnyName: member_name,
    })
  ).data;
};

/**
 *
 *
 * 	Savings APIs
 * 	CRUD
 *
 */

export const createSavings = async (data: CreateSavingsRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "AddSaving",
      ...data,
    })
  ).data;
};

export const getSavings = async (pageParam: number) => {
  return (
    await axiosInstance.post<Savings[]>("", {
      RequestID: "GetSavings",
      Offset: String(pageParam),
      Limit: 3,
    })
  ).data;
};

export const getSaving = async (data: GetSavingsRequest) => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetSavings",
      ...data,
    })
  ).data;
};

/**
 *
 *
 * 	Users APIs
 * 	CRUD
 *
 */

/**
 *
 * 	Product APIs
 *
 */

export const getProducts = async () => {
  return (
    await axiosInstance.post("", {
      RequestID: "GetProducts",
    })
  ).data;
};
