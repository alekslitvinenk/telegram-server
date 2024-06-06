import express from 'express';
import "./types";
import {LoginData, UserData, UserDataOpt} from "./types";
import {isLoginData, isUserData} from "./utils";
import {Users} from "./users";

const app = express();
const port = 3000;
const users = new Users()

async function doLogin(data: LoginData): Promise<UserDataOpt> {
    const userOpt = await users.lookupUser(data.telegramID)
    if (isUserData(userOpt)) {
        const userData = userOpt as UserData
        if (userData.password === data.password) {
            return userData
        } else {
            return null
        }
    } else {
        return null
    }
}

function doRegister(data: LoginData): Promise<UserDataOpt> {
    return users.registerUser(data.telegramID, data.password)
}

app.use(express.json());

app.post('/do_login', (req, res) => {
    if (isLoginData(req.body)) {
        const loginData: LoginData = req.body as LoginData;
        doLogin(loginData).then(userData => {
            if (isUserData(userData)) {
                res.status(200).send(userData);
            } else {
                res.status(403).send('Unauthorized');
            }
        })
    } else {
        res.status(400).send("Malformed credentials");
    }
});

app.post('/do_logout', (req, res) => {
    res.status(200).send('User logged out');
});

app.get('/current_login', (req, res) => {
    res.status(200).send('User logged out');
});

app.get('/user_profile', (req, res) => {
    res.status(200).send('User logged out');
});

app.post('/do_register', (req, res) => {
    if (isLoginData(req.body)) {
        const loginData: LoginData = req.body as LoginData;
        doRegister(loginData).then(userData => {
            if (isUserData(userData)) {
                res.status(200).send(userData);
            } else {
                res.status(403).send('Unauthorized');
            }
        })
    } else {
        res.status(400).send("Malformed credentials");
    }
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});