export const meetings_column = [
  {
    key: "GroupName",
    label: "Group Name",
  },
  {
    key: "OfficialAttending",
    label: "Official Attending",
  },
  {
    key: "ScheduledDate",
    label: "Scheduled Date",
  },
  {
    key: "MeetingStartedAt",
    label: "Time",
  },

  {
    key: "Penalizable",
    label: "Penalizable",
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export interface GroupMeeting {
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

export interface CreateGroupMeetingRequest {
  GroupID: string;
  ScheduledDate: string;
  Start: string;
  End: string;
  UserID: string;
}

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
