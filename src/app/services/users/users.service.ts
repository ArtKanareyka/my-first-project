import { Injectable } from '@angular/core'
import { UsersApi } from '../users-api/users-api.service'
import { User } from '../../interface/user.interface'
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	public users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
	users$: Observable<User[]> = this.users.asObservable()

	constructor(private usersApi: UsersApi) {
		this.loadUsers()
	}

	private loadUsers() {
		this.usersApi.getUsers().subscribe({
			next: (users: User[]) => {
				console.log(users)
				this.users.next(users)
			},
			error: error => {
				console.error('Failed to load users:', error)
			}
		})
	}
}
