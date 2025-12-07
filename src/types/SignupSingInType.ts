import { BaseResponse } from './BaseResponse';
export interface signupProps {
    username: string
    email: string
    password: string
    role: string
}
export interface loginProps {
    username: string
    password: string
}

export type SignUpResponse = BaseResponse<signupProps[]>
