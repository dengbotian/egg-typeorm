import {Connection} from "typeorm";

declare module 'egg' {
    export interface Application {
        qinggerTypeorm : Connection
    }

}