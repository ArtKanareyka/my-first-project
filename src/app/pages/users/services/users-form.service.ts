import {Inject, Injectable, inject} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {IUser} from '../interface/user.interface'

@Injectable({
	providedIn: 'root'
})
export class UsersFormService {
	private fb = inject(FormBuilder)

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public userFormData: {
			data: IUser
		}
	) {}

	public getForm(): FormGroup {
		return this.fb.group({
			name: [this.userFormData.data?.name ?? '', Validators.required],
			email: [this.userFormData.data?.email ?? '', [Validators.required, Validators.email]],
			username: [this.userFormData.data?.username ?? '', Validators.required]
		})
	}
}
