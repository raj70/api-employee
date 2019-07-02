import jwt from 'jsonwebtoken';

export class JwtUtil {
    private key: string = '';
    constructor() {
        this.key = <string>process.env.KEY;
    }

    generate(_id: string, _email: string): string {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: {
                _id: _id,
                _email: _email
            }
        }, this.key);

        return token;
    }

    validate(token: string, errorFunction: Function): boolean {
        let valid = false;
        jwt.verify(token, this.key, (error, decoded) => {
            if (error) {
                errorFunction(error);
                console.log("validate", error.message);
                valid = false;
            }
            else if (decoded) {
                valid = true;
                //console.log(decoded);
            }
        });
        return valid;
    }

    getUser(token: string): Promise<Data> {

        return new Promise<Data>(async (resolve, reject) => {

            let value = new Data();
            if (this.validate(token, () => { })) {
                await jwt.verify(token, this.key, (error, decoded) => {
                    if (error) {
                        console.log("get error", error);
                        resolve(value);
                    }
                    else if (decoded) {
                        value.data._id = (decoded as unknown as Data).data._id;
                        value.data._email = (decoded as unknown as Data).data._email;
                        // const o = <Data>JSON.parse(decoded)
                        // value.data._id = o.data._id;
                        // value.data._email = o.data._email;
                        resolve(value);
                    }
                });
            } else {
                reject(value);
            }
        }).catch(reason => reason);

    }
}

export class Data {
    constructor() {
        this.data = { _id: '', _email: '' };
    }
    exp: number = 0;
    data: {
        _id: string;
        _email: string;
    };
}