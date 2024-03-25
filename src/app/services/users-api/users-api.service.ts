import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { API_URL } from '../../constants/API_URL'
import { User } from '../../interface/user.interface'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class UsersApi {
	constructor(private http: HttpClient) {}

	public getUsers(): Observable<User[]> {
		return this.http.get<User[]>(API_URL)
	}
}
