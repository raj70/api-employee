import * as dotenv from 'dotenv';

export const setEnv = () => {

    const result = dotenv.config({
        path: `.env.development`
    });

    if (result.error) {
        console.log(__dirname, result.error);
    }
}