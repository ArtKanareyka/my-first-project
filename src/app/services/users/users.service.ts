import { Injectable, inject } from '@angular/core'
import { UsersApi } from '../users-api/users-api.service'
import { User } from '../../interface/user.interface'
import { BehaviorSubject, Observable } from 'rxjs'
import { CustomUser } from '../../interface/custom-user.interface'

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
		this.getUsers()
	}

	private getUsers(): void {
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

	public addUser(userFormData: CustomUser): void {
		this.users$.subscribe((users: CustomUser[]) => {
			if (userFormData) {
				userFormData.id = users.length + 1
				users.push(userFormData)
			}
		})
	}

	public editUser(user: CustomUser) {
		this.users$.subscribe((users: CustomUser[]) => {
			console.log(user)
		})
	}
}
