import {Component, Inject, inject} from '@angular/core'
import {FormGroup, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms'
import {
	MatDialogTitle,
	MatDialogContent,
	MatDialogActions,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatDialogClose
} from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {IUser} from '../../pages/users-list/interface/user.interface'

@Component({
	selector: 'app-create-edit-user',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		MatDialogTitle,
		MatDialogContent,
		MatDialogActions,
		MatInputModule,
		MatButtonModule,
		MatDialogClose
	],
	templateUrl: 'create-edit-user.component.html'
})
export class CreateEditUserComponent {
	public readonly userForm: FormGroup
	private fb = inject(FormBuilder)
	private readonly dialogRef = inject(MatDialogRef)

	constructor(
		@Inject(MAT_DIALOG_DATA)
		public userFormData: {
			isEdit: boolean
			data: IUser
		}
	) {
		this.userForm = this.fb.group({
			name: [this.userFormData.isEdit ? this.userFormData.data.name : '', Validators.required],
			email: [this.userFormData.isEdit ? this.userFormData.data.email : '', [Validators.required, Validators.email]],
			username: [this.userFormData.isEdit ? this.userFormData.data.username : '', Validators.required]
		})
	}

	onSubmit(): void {
		if (this.userForm.valid) {
			this.userFormData.data = {
				name: this.userForm.value.name,
				email: this.userForm.value.email,
				username: this.userForm.value.username
			}
			this.dialogRef.close(this.userFormData.data)
		}
	}
}