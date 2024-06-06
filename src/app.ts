import express from 'express';
import "./types";
import {LoginData, UserDataOpt} from "./types";
import {isLoginData, isUserData} from "./utils";
import {Users} from "./users";

const app = express();
const port = 3000;
const users = new Users()

//TODO: lookup user in DB
function doLogin(data: LoginData): Promise<UserDataOpt> {
    return users.lookupUser(data.telegramID, data.password)
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