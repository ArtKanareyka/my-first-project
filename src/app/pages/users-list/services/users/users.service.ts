import { Injectable, inject } from '@angular/core'
import { UsersApi } from '../users-api/users-api.service'
import { IUser } from '../../interface/user.interface'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	private readonly users: BehaviorSubject<IUser[]> = new BehaviorSubject<
		IUser[]
	>([])
	public readonly users$: Observable<IUser[]> = this.users.asObservable()

	private readonly usersApi = inject(UsersApi)

	constructor() {
		this.getUsers()
	}

	private getUsers(): void {
		this.usersApi.getUsers().subscribe((users: IUser[]) => {
			this.users.next(users)
		})
	}

	public deleteUser(id: number | undefined): void {
		this.users$.subscribe((users: IUser[]) => {
			users.splice(
				users.findIndex(user => user.id === id),
				1
			)
		})
	}

	public addUser(userFormData: IUser): void {
		this.users$.subscribe((users: IUser[]) => {
			if (userFormData) {
				userFormData.id = users.length + 1
				users.push(userFormData)
			}
		})
	}

	editUser(user: IUser, userFormData: IUser): void {
		this.users$.subscribe((users: IUser[]) => {
			if (userFormData) {
				user.name = userFormData.name
				user.email = userFormData.email
				user.username = userFormData.username
			}
			console.log(user)
			console.log(userFormData)
		})
	}
}
