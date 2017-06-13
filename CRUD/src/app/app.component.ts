import {Component, Input, OnInit} from '@angular/core';
import {User} from './app.model.user'
import {UserService} from './app.service';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/styles.css';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private userService: UserService) {
    }

    users: User[];

    @Input() user: User;

    ngOnInit() {
        this.loadUsers();
    }

    loadUsers() {
        this.userService.getUsers()
            .subscribe(
                users => this.users = users,
                err => {
                    console.log(err);
                });
    }

    showUserDetail(userId: string) {
        window.location.href = 'http://localhost:8081/App/Templates/User.html?userId=' + userId;
    }
}