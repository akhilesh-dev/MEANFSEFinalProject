import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User = new User();
  users: User[];
  public buttonName: any = 'Add';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.buttonName = "Add";
    this.getAllUsers();
  };

  getAllUsers() {
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  error: any = { isError: false, errorMessage: '' };
  isValidData: any;

  addUser(): void {
    this.error = { isError: false, errorMessage: '' };
    this.isValidData = this.validateDate(this.user.firstName, this.user.lastName, this.user.employeeId);
    if (this.isValidData) {
      if (this.buttonName === 'Add') {
        this.userService.addUser(this.user)
          .subscribe(data => {
            alert("User added successfully!");
          });
        this.getAllUsers();
      };
    }
    if (this.buttonName === 'Update') {
      this.userService.updateUser(this.user)
        .subscribe(data => {
          alert("User updated successfully!");
          this.buttonName = "Add";
          this.getAllUsers();
        });
    }
  }

  validateDate(fName: string, lName: string, eID: number) {
    this.isValidData = true;
    if ((fName == null || lName == null || eID == null)) {
      this.error = { isError: true, errorMessage: 'All fields are required.' };
      this.isValidData = false;
    }
    return this.isValidData;
  }

  removeUser(userId: string): void {
    this.error = { isError: false, errorMessage: '' };
    this.userService.removeUser(userId)
      .subscribe(data => {
        alert("User deleted successfully!");
        this.getAllUsers();
      })
  };

  updateUser(user: User) {
    this.error = { isError: false, errorMessage: '' };
    this.user.userId = user.userId;
    this.user.firstName = user.firstName;
    this.user.lastName = user.lastName;
    this.user.employeeId = user.employeeId;
    this.buttonName = "Update";
  }

  // sorting logic
  key = 'employeeId'; // sort default by employeeId
  reverse = false;
  sortList(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }


  
}
