import { User } from "./users";

export type AuthContextData = {
	isAuthenticated: boolean;
	authData?: User | null;
	isLoading: boolean;
	signIn(credentials: AuthSignInRequest): Promise<void>;
	signOut(): void;
};

export type AuthSignInRequest = {
	UserName: string;
	Password: string;
};
