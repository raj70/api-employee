import * as dotenv from 'dotenv';

export const setEnv = () => {

    const result = dotenv.config({
        path: `envs/.env.development`
    });

    if (result.error) {
        console.log(__dirname, result.error);
    }
}