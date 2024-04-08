import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../../interface/user.interface'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment.development'

@Injectable({
	providedIn: 'root'
})
export class UsersApi {
	private readonly http = inject(HttpClient)
	private readonly apiUsersUrl = environment.apiUsersUrl

	public getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.apiUsersUrl)
	}
}
