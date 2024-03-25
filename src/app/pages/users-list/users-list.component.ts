import { Component, OnInit } from '@angular/core'
import { UsersService } from '../../services/users/users.service'
import { User } from '../../interface/user.interface'
import { UserCardComponent } from '../../components/user-card/user-card.component'
import { NgFor } from '@angular/common'

@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [UserCardComponent, NgFor],
	templateUrl: './users-list.component.html'
})
export class UserListComponent implements OnInit {
	users: User[] = []

	constructor(private usersService: UsersService) {}

	ngOnInit(): void {
		this.usersService.users$.subscribe(users => {
			this.users = users
		})
	}
}
