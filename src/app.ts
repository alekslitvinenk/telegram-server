import express from 'express';
import crypto from 'crypto'
const app = express();
const port = 3000;

interface LoginData {
    telegramID: string;
    password: string;
}

interface UserData extends LoginData {
    createdAt: Date;
    token: string; // automatically generated token
}

type UserDataOpt = UserData | null

//TODO: hash passwords
function getHash(str: string): string {
    return crypto.createHash('sha256').update(str).digest('hex');
}

function isLoginData(value: unknown): value is LoginData {
    const loginData: LoginData = value as LoginData;
    return loginData.telegramID !== undefined && loginData.password !== undefined;
}

function isUserData(value: unknown): value is UserData {
    const userData: UserData = value as UserData;
    return userData.token !== undefined
}

//TODO: lookup user in DB
function doLogin(data: LoginData): UserDataOpt {
    return null
}

app.use(express.json());

app.post('/do_login', (req, res) => {
    if (isLoginData(req.body)) {
        const loginData: LoginData = req.body as LoginData;
        const userData = doLogin(loginData);
        if (isUserData(userData)) {
            res.status(200).send(userData);
        } else {
            res.status(403).send('Unauthorized');
        }
    } else {
        res.status(400).send("Malformed credentials");
    }
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});