import {Injectable, inject} from '@angular/core'
import {UsersApi} from './users-api.service'
import {IUser} from '../interface/user.interface'
import {BehaviorSubject, map, take, tap} from 'rxjs'
import {LocalStorageService} from './local-storage.service'

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([])
	public readonly users$ = this.usersSubject$.asObservable()
	private readonly usersApiService = inject(UsersApi)
	private readonly localStorageService = inject(LocalStorageService)

	public getUsers(): void {
		const cachedData = this.localStorageService.getItem()
		const arrCachedData = JSON.parse(cachedData!)
		if (cachedData && arrCachedData.length !== 0) {
			this.localStorageService.setItem(arrCachedData)
			this.usersSubject$.next(arrCachedData)
		} else {
			this.usersApiService
				.getUsers()
				.pipe(
					tap((response: IUser[]) => {
						this.localStorageService.setItem(response)
						this.usersSubject$.next(response)
					})
				)
				.subscribe()
		}
	}

	public deleteUser(id: number): void {
		this.usersSubject$
			.pipe(
				take(1),
				map((users: IUser[]) => {
					return users.filter(user => user.id !== id)
				})
			)
			.subscribe((updatedUsers: IUser[]) => {
				this.localStorageService.setItem(updatedUsers)
				this.usersSubject$.next(updatedUsers)
			})
	}

	public addUser(userFormData: IUser): void {
		this.usersSubject$
			.pipe(
				take(1),
				map((users: IUser[]) => {
					return [...users, {...userFormData, id: users.length + 1}]
				})
			)
			.subscribe((updatedUsers: IUser[]) => {
				this.localStorageService.setItem(updatedUsers)
				this.usersSubject$.next(updatedUsers)
			})
	}

	public editUser(user: IUser, userFormData: IUser): void {
		this.usersSubject$
			.pipe(
				take(1),
				map((users: IUser[]) => {
					return users.map(item => {
						if (item.id === user.id) {
							return {...item, name: userFormData.name, email: userFormData.email, username: userFormData.username}
						}
						return item
					})
				})
			)
			.subscribe((updatedUsers: IUser[]) => {
				this.localStorageService.setItem(updatedUsers)
				this.usersSubject$.next(updatedUsers)
			})
	}
}
