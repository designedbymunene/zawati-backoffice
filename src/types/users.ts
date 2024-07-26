export interface User {
	Permissions: string[];
	Role: string;
	Status: string;
	UserID: string;
	UserName: string;
}

export interface UserData {
	Permissions: Permission[][];
	Role: string;
	Status: string;
	UserID: string;
	UserName: string;
}

export type Permission = {
	PermissionCode: string;
};
