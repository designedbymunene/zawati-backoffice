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

// src/types.ts
export interface GroupDetails {
  GroupName: string;
  Status: string;
  Town: string;
  County: string;
  Constituency: string;
  Ward: string;
}

export interface CustomerDetails {
  CustomerNumber: string;
  CustomerName: string;
  IDNumber: string;
  PhoneNumber: string;
  DateJoined: string;
}

export interface CustomerEarnings {
  Savings: string;
  InterestPaid: string;
}

export interface CustomerLoans {
  SemiLoanBalance: string;
  SemiLoanInterestBalance: string;
  LoanBalance: string;
  LoanInterestBalance: string;
}

export interface CustomerPayout {
  ActualPayout: string;
}

export interface CustomerData {
  GroupDetails: GroupDetails;
  CustomerDetails: CustomerDetails;
  CustomerEarnings: CustomerEarnings;
  CustomerLoans: CustomerLoans;
  CustomerPayout: CustomerPayout;
}
