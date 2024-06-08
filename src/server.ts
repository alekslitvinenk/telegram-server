import express from "express";
import {Users} from "./users";
import {LoginData, UserData} from "./types";
import {isLoginData} from "./utils";

export const useExpressJs = (port: number, users: Users) => {
    const app = express();

    async function doLogin(data: LoginData): Promise<UserData> {
        const userData = await users.lookupUser(data.telegramID)
        if (userData != null) {
            if (userData.password === data.password) {
                return userData
            } else {
                return null
            }
        } else {
            return null
        }
    }

    function doRegister(data: LoginData): Promise<UserData> {
        return users.registerUser(data.telegramID, data.password)
    }

    app.use(express.json());

    app.post('/do_login', (req, res) => {
        if (isLoginData(req.body)) {
            const loginData = req.body as LoginData;
            doLogin(loginData).then(userData => {
                if (userData != null) {
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
                if (userData !== null) {
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
}