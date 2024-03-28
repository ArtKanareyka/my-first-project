import { Injectable, inject } from '@angular/core'
import { UsersApi } from '../users-api/users-api.service'
import { User } from '../../interface/user.interface'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	private readonly users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
		[]
	)
	public users$: Observable<User[]> = this.users.asObservable()

	private readonly usersApi = inject(UsersApi)

	constructor() {
		this.loadUsers()
	}

	private loadUsers() {
		this.usersApi.getUsers().subscribe((users: User[]) => {
			this.users.next(users)
		})
	}

	public deleteUser(id: number) {
		this.users$.subscribe((users: User[]) => {
			users.splice(
				users.findIndex(user => user.id === id),
				1
			)
		})
	}
}
