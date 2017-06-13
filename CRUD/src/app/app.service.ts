import {Http, Response} from '@angular/http';
import {Injectable}     from '@angular/core';
import {User} from './app.model.user';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    constructor(private http: Http) {
    }

    private usersUrl = 'https://jsonplaceholder.typicode.com/users';

    getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }
}