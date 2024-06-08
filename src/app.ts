import "./types";
import {Users} from "./users";
import {useExpressJs} from "./server";

const users: Users = new Users()

useExpressJs(3000, users)