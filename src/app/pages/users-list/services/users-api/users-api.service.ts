import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IUser } from '../../interface/user.interface'
import { Observable } from 'rxjs'
import { environment } from '../../../../../environments/environment.development'

@Injectable({
	providedIn: 'root'
})
export class UsersApi {
	private readonly http = inject(HttpClient)
	private readonly apiUsersUrl = environment.apiUsersUrl

	public get(): Observable<IUser[]> {
		return this.http.get<IUser[]>(this.apiUsersUrl)
	}
}
