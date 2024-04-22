import {Component, EventEmitter, Input, Output, inject} from '@angular/core'
import {IUser} from '../interface/user.interface'
import {TitleCasePipe} from '@angular/common'

import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'

@Component({
	selector: 'app-user-card',
	standalone: true,
	imports: [TitleCasePipe, MatCardModule, MatButtonModule],
	templateUrl: './user-card.component.html'
})
export class UserCardComponent {
	@Input({required: true}) user: IUser | undefined
	@Output() deleteUserEvent = new EventEmitter<number | undefined>()
	@Output() openEditUserDialogEvent = new EventEmitter<IUser>()

	deleteUser() {
		this.deleteUserEvent.emit()
	}

	openEditUserDialog() {
		this.openEditUserDialogEvent.emit()
	}
}
