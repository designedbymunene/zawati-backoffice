export interface Group {
	GroupNo: string;
	CountryCode: string;
	CountyName: string;
	ConstituencyName: string;
	WardName: string;
	GroupName: string;
	GroupCode: string;
	status: string;
	RegistrationDate: string;
	RegCertNo: string;
	PhoneNumber: string;
	PostalAddress: string;
	PostalCode: string;
	Town: string;
	GroupDescription: string;
	DateCreated: string;
}

export interface CreateGroupRequest {
	WardID: string
	GroupCode: string
	GroupName: string
	Slug: string
	RegistrationDate: string
	RegCertNo: string
	PhoneNumber: string
	PostalAddress: string
	PostalCode: string
	Town: string
	GroupDescription: string
}

export interface CreateGroupProductsRequest {
	ProductID: string
	GroupID: string
}

export interface CreateGroupMemberRequest {
	CustomerID: string
	GroupID: string
}

export interface CreateGroupLeadersRequest {
	GroupID: string
	CustomerID: string
	RoleName: string
	UserID: string
}


export interface GetGroupLeadersRequest {
	CustomerID: string
	GroupID: string
}

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
	UserID: string
}