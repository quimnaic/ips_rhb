export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    company: string;
}

export interface AuthResponse {
    user: User;
    access_token: string;
}
