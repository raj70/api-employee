import mongoose from 'mongoose';

export const connectdb = () => {
    const url = process.env.DB_URL;
    mongoose.set('useFindAndModify', true);
    mongoose.connect(<string>url, { useNewUrlParser: true }, (error: any) => {
        if (error) {
            console.log('unable to connect to db', url, error);
        } else {
            console.log('connected to MongoDb');
        }
    });
}

export const connectdb_Auth = () => {
    const url = process.env.DB_URL_AUTH;
    mongoose.set('useFindAndModify', true);
    mongoose.connect(<string>url, { useNewUrlParser: true }, (error: any) => {
        if (error) {
            console.log('unable to connect to auth db', url, error);
        } else {
            console.log('connected to Auth MongoDb');
        }
    });
}

export const changeDbConnction = (isAuthServer: boolean) => {
    if (isAuthServer) {
        connectdb_Auth();
    }
    else {
        connectdb();
    }
}