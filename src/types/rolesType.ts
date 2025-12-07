import { BaseResponse } from "./BaseResponse"

export interface rolesProps {
    id: number
    name: string
}

export type getRolesResonse = BaseResponse<rolesProps[]>