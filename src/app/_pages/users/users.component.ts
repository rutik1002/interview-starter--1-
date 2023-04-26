import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from '@app/_shared/components/loading.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Store } from '@ngrx/store';
import { editLoadUserData, loadUserData, loadingSpinner } from '@app/_state/users/users-store';
import { UserState, users } from '@app/_shared/models/user.interface';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    LoadingComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class UsersComponent implements OnInit {

  editUserDetailsForm!: FormGroup;
  dataSource!: MatTableDataSource<users>;
  columnsToDisplay = ['firstName', 'username', 'password', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement!: boolean;
  isLoading!: boolean;

  constructor(private store: Store<{ usersReducer: UserState }>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editUserDetailsForm = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
    });
    this.store.dispatch(loadUserData());

    this.store.select('usersReducer').subscribe((res) => {
      this.isLoading = res.loadingFlag;
      if (Object.keys(res.user).length > 0) {
        let userData = [];
        for (let key in res.user) {
          userData.push(res.user[key])
        }
        this.dataSource = new MatTableDataSource<users>(userData);
      }
    });
  }

  updateUserDetails(rowData: users): void {
    this.store.dispatch(loadingSpinner({ isLoading: true }));
    let updateUserDetails: users = { ...rowData };
    updateUserDetails.username = this.editUserDetailsForm.value.username;
    updateUserDetails.password = this.editUserDetailsForm.value.password;
    updateUserDetails.email = this.editUserDetailsForm.value.email;
    updateUserDetails.firstName = this.editUserDetailsForm.value.firstname;
    setTimeout(() => {
      this.store.dispatch(editLoadUserData({ userData: updateUserDetails }));
      this.store.dispatch(loadingSpinner({ isLoading: false }));
    }, 2000);
  }

  patchData(getUserDetails: users): void {
    this.editUserDetailsForm.patchValue({
      username: getUserDetails.username,
      password: getUserDetails.password,
      email: getUserDetails.email,
      firstname: getUserDetails.firstName
    });
  }

}
