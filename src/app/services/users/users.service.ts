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
	public readonly users$: Observable<User[]> = this.users.asObservable()

	private readonly usersApi = inject(UsersApi)

	constructor() {
		this.loadUsers()
	}

	private loadUsers(): void {
		this.usersApi.getUsers().subscribe((users: User[]) => {
			this.users.next(users)
		})
	}

	public deleteUser(id: number): void {
		this.users$.subscribe((users: User[]) => {
			users.splice(
				users.findIndex(user => user.id === id),
				1
			)
		})
	}

	public postUser(data: User): void {
		this.users$.subscribe((users: User[]) => {
			if (data) {
				data.id = users.length + 1
				users.push(data)
			}
		})
	}
}
