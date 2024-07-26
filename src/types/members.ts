export interface CreateMemberRequest {
	FirstName: string;
	OtherNames: string;
	DOB: string;
	Gender: string;
	Address: string;
	MaritalStatus: string;
	IDNumber: string;
	NextOfKin: string;
	NextOfKinRelationship: string;
	Email: string;
	PhoneNumber: string;
	WorkSector: string;
	County: string;
	Subcounty: string;
}

export interface GetMemberRequest {
	CustomerID?: string;
	AnyName?: string;
	PhoneNumber?: string;
}

export interface Member {
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
	DateCreated: string;
	County: string;
	SubCounty: string;
}
