import * as dotenv from 'dotenv';
import { resolve } from 'url';

export const setEnv = () => {

    const result = dotenv.config({
        path: resolve(__dirname, `../../.env.development`)
    });

    if (result.error) {
        console.log(__dirname, result.error);

        if (process.env.NODE_ENV === 'development') {
            process.env.PORT = '4100';
            process.env.HOST = 'localhost';
        }

    }


}