import crypto from 'crypto'
import {LoginData} from "./types";

export function getHash(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex');
}

export function isLoginData(value: unknown): value is LoginData {
    const loginData: LoginData = value as LoginData;
    return loginData.telegramID !== undefined && loginData.password !== undefined;
}

export function getNewToken(): string {
    return "123"
}