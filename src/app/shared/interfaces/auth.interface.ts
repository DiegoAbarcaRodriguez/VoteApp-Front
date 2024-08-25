
export interface LoginPayload {
    user: string,
    password: string
}

export interface RegisterPayload {
    email: string,
    name: string,
    password: string,
    password2: string
}

export interface UpdatePasswordPayload {
    password: string,
    password2: string,
    _id: string

}

export interface LoginResponse {
    token: string,
    ok: boolean,
    user: User
}

export interface User {
    email: string,
    password: string,
    validated: boolean,
    token?: string
    google: boolean,
    name: string
}
