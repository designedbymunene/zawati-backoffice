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
    queryKey: ["meetings", data.GroupID],
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
    },
  });
}

const useCreateGroupMeeting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newMeeting: ICreateGroupMeeting) => {
      return axiosService.post("", newMeeting);
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

export { useGetGroupMeetings, useCreateGroupMeeting };
