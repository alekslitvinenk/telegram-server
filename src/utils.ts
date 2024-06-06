import crypto from 'crypto'
import {LoginData, UserData} from "./types";

export function getHash(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex');
}

export function isLoginData(value: unknown): value is LoginData {
    const loginData: LoginData = value as LoginData;
    return loginData.telegramID !== undefined && loginData.password !== undefined;
}

export function isUserData(value: unknown): value is UserData {
    const userData: UserData = value as UserData;
    return userData.token !== undefined
}