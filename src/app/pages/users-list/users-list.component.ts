import { Component, OnInit, inject } from '@angular/core'
import { UsersService } from '../../services/users/users.service'
import { User } from '../../interface/user.interface'
import { UserCardComponent } from '../../components/user-card/user-card.component'

@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [UserCardComponent],
	templateUrl: './users-list.component.html'
})
export class UserListComponent implements OnInit {
	public users: User[] = []

	private readonly usersService = inject(UsersService)

	deleteUser(id: number): void {
		this.usersService.deleteUser(id)
	}

	ngOnInit(): void {
		this.usersService.users$.subscribe(users => {
			this.users = users
		})
	}
}
