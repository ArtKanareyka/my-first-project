import { Component, OnInit, inject } from '@angular/core'
import { UsersService } from './services/users/users.service'
import { IUser } from './interface/user.interface'
import { UserCardComponent } from './user-card/user-card.component'
import { CreateEditUserComponent } from '../../components/create-edit-user/create-edit-user.component'

import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDialog } from '@angular/material/dialog'
import { FormGroup, FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
	selector: 'app-user-list',
	standalone: true,
	imports: [
		UserCardComponent,

		MatGridListModule,
		MatIconModule,
		MatButtonModule,
		MatFormFieldModule,
		FormsModule
	],
	templateUrl: './users-list.component.html'
})
export class UserListComponent implements OnInit {
	public users: IUser[] = []
	private readonly dialog = inject(MatDialog)
	private readonly usersService = inject(UsersService)

	deleteUser(id: number | undefined): void {
		this.usersService.deleteUser(id)
	}

	openAddUserDialog(): void {
		const dialogRef = this.dialog.open(CreateEditUserComponent, {
			disableClose: true,
			data: { isEdit: false }
		})

		dialogRef.afterClosed().subscribe(userFormData => {
			if (userFormData) {
				this.usersService.addUser(userFormData)
			}
		})
	}

	openEditUserDialog(user: IUser): void {
		const dialogRef = this.dialog.open(CreateEditUserComponent, {
			disableClose: true,
			data: { isEdit: true, data: user }
		})

		dialogRef.afterClosed().subscribe(userFormData => {
			if (userFormData) {
				this.usersService.editUser(user, userFormData)
			}
		})
	}

	ngOnInit(): void {
		this.usersService.users$.subscribe(users => {
			this.users = users
		})
	}
}
