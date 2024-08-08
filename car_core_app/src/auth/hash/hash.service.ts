import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {

    static hash(password:string):string{
        const salt = Number(process.env.BCRYPT_SALT)
        return bcrypt.hashSync(password, salt);
    }

    static compareHash(password:string , hash:string):boolean{
        return bcrypt.compareSync(password, hash)
    }
}
