import * as dotenv from 'dotenv';

export const setEnv = () => {

    const result = dotenv.config({
        path: `.env.development`
    });

    console.log(result.error);
    if (!result.error) {
        console.log(__dirname, result.error);

        if (process.env.NODE_ENV === 'development') {
            process.env.PORT = '4300';
            process.env.HOST = 'localhost';
            process.env.DB_URL = 'mongodb://localhost:27017/employee-management';
        }

    }
}