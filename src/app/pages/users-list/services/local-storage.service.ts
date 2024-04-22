import {Injectable} from '@angular/core'
import {IUser} from '../interface/user.interface'

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {
	getItem() {
		return localStorage.getItem('usersList')
	}

	setItem(data: IUser[]) {
		localStorage.setItem('usersList', JSON.stringify(data))
	}
}
