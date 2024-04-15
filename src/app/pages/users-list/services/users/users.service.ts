import { Injectable, inject } from '@angular/core'
import { UsersApi } from '../users-api/users-api.service'
import { IUser } from '../../interface/user.interface'
import { BehaviorSubject, Observable } from 'rxjs'
import { LocalStorageService } from '../local-storage/local-storage.service'

@Injectable({
	providedIn: 'root'
})
export class UsersService {
	private readonly usersSubject$ = new BehaviorSubject<IUser[]>([])
	public readonly users$: Observable<IUser[]> = this.usersSubject$.asObservable()
	private readonly api = inject(UsersApi)
	private readonly localStorageService = inject(LocalStorageService)

	public getUsers(): void {
		const cachedData = this.localStorageService.getItem()
		const arrCachedData = JSON.parse(cachedData!)
		if (cachedData && arrCachedData.length !== 0) {
			this.usersSubject$.next(arrCachedData)
			this.localStorageService.setItem(arrCachedData)
		} else {
			this.api.get().subscribe((response: IUser[]) => {
				this.localStorageService.setItem(response)
				this.usersSubject$.next(response)
			})
		}
	}

	public deleteUser(id: number | undefined): void {
		this.usersSubject$.subscribe((response: IUser[]) => {
			response.splice(
				response.findIndex(user => user.id === id),
				1
			)
			this.localStorageService.setItem(response)
		})
	}

	public addUser(userFormData: IUser): void {
		this.usersSubject$.subscribe((response: IUser[]) => {
			userFormData.id = response.length + 1
			response.push(userFormData)
			this.localStorageService.setItem(response)
		})
	}

	public editUser(user: IUser, userFormData: IUser): void {
		this.usersSubject$.subscribe((response: IUser[]) => {
			const index = response.findIndex(item => item.id === user.id)
			response[index].name = userFormData.name
			response[index].email = userFormData.email
			response[index].username = userFormData.username
			this.localStorageService.setItem(response)
		})
	}
}
