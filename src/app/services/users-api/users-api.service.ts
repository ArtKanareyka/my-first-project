import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../../interface/user.interface'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class UsersApi {
	private readonly http = inject(HttpClient)

	public getUsers(): Observable<User[]> {
		return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users')
	}
}
