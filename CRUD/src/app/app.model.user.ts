import {Address} from './app.model.address';
import {Company} from './app.model.company';

export class User {
    constructor(public id: number,
                public name: string,
                public username: string,
                public phone: string,
                public email: string,
                public website: string,
                public address: Address,
                public company: Company) {
    }
}