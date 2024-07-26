import { ICreateGroupMeeting } from "@/app/dashboard/groups/[id]/_components/GroupMeetings";
import axiosService from "@/services/axios-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface GroupMeetingsType {
  MeetingsID: string;
  GroupName: string;
  ScheduledDate: Date;
  OfficialAttending: string;
  MeetingStartedAt: string;
  MeetingEndedAt: string;
  NoOfAttendees: string;
  Penalizable: string;
  Status: string;
  OfficialComments: string;
}

const useGetGroupMeetings = (groupID: string) => {
  return useQuery({
    queryKey: ["meetings", groupID],
    queryFn: async () => {
      let bodyContent = JSON.stringify({
        RequestID: "GetGroupMeetings",
        GroupID: groupID,
      });

      return (await axiosService.post("", bodyContent))
        .data as GroupMeetingsType[];
    },
  });
};

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
