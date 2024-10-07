import { ICreateGroupMeeting } from "@/app/dashboard/groups/[id]/_components/GroupMeetings";
import axiosService from "@/services/axios-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export interface GroupMeetingsType {
  MeetingsID: string;
  GroupName: string;
  ScheduledDate: string;
  OfficialAttending: string;
  MeetingStartedAt: string;
  MeetingEndedAt: string;
  NoOfAttendees: string;
  Penalizable: string;
  Status: string;
  OfficialComments: string;
}

export interface GroupBasicRequest {
  GroupName?: string;
  GroupID?: string;
  UserID: string;
}

const useGetGroupMeetings = (data: GroupBasicRequest) => {
  return useQuery({
    queryKey: ["meetings", data.GroupID, data.GroupName],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroupMeetings",
        ...data,
      });

      return (await axiosService.post("", bodyContent))
        .data as GroupMeetingsType[];
    },
  });
};

export const closeGroupMeetings = async (id: string) => {
  return (
    await axiosService.post("", {
      RequestID: "CloseGroupMeeting",
      MeetingID: id,
      Status: "1",
    })
  ).data;
};

export function useCloseGroupMeetings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => closeGroupMeetings(id),
    onError: (error) => {
      const errorMessage = error?.response?.data?.Message as string;
      toast.error(errorMessage);
    },
    onSuccess: (data, context) => {
      toast.success(data?.Message);
    },

    onSettled: async (_, error) => {
      if (error) {
        return error;
      }
      await queryClient.invalidateQueries({ queryKey: ["group-meeting"] });
      await queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });
}

const useCreateGroupMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMeeting: ICreateGroupMeeting) => {
      return axiosService.post("", newMeeting);
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.Message as string;
      toast.error(errorMessage);
    },
    onSuccess: (data, context) => {
      toast.success(data.data.Message);
    },
    onSettled: async (_, error) => {
      if (error) {
        // console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["meetings"] });
      }
    },
  });
};

export const getGroupMeetingAttendees = async (meeting_id: string) => {
  return (
    await axiosService.post("", {
      RequestID: "GetMeetingAttendees",
      MeetingID: meeting_id,
    })
  ).data;
};

const useGetGroupMeetingAttendees = (meeting_id: string) => {
  return useQuery({
    queryKey: ["attending-meetings", meeting_id],
    queryFn: () => getGroupMeetingAttendees(meeting_id),
  });
};

export const getGroupStartMeeting = async (meeting_id: string) => {
  return (
    await axiosService.post("", {
      RequestID: "StartGroupMeeting",
      MeetingID: meeting_id,
    })
  ).data;
};

const useStartGroupMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: getGroupStartMeeting,
    onError: (error) => {
      const errorMessage = error?.response?.data?.Message as string;
      toast.error(error.message);
    },
    onSuccess: (data, context) => {
      toast.success(data.Message);
    },
    onSettled: async (_, error) => {
      if (error) {
        // console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["meetings"] });
      }
    },
  });
};

export {
  useGetGroupMeetings,
  useCreateGroupMeeting,
  useGetGroupMeetingAttendees,
  useStartGroupMeeting,
};
