import { ApiError } from "src/app/shared/error/api-error"
import { AuthResponse } from "src/app/shared/models/auth/auth-response"

export interface AppUserState {
    token: AuthResponse | null,
    error: ApiError | null,
    isLoading: boolean
}

export const initialState: AppUserState = {
    token: null,
    error: null,
    isLoading: false
}