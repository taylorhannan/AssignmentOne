import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

	constructor(private router: Router, private http: HttpClient) {}
	username: string = '';
	email: string = '';
	role: string = '';

	deletedUser: string;
	users = [{}];

	groupname: string = '';
	deletedGroup: string;
	groups = [{}];

	addGusername: string = '';
	addGgroupname: string = '';

	ngOnInit(): void {
    // Check for valid user & pull data from server
		if (!sessionStorage.username || !sessionStorage.email) {
			alert("You are not logged in!")
			this.router.navigateByUrl('');
		} else if (sessionStorage.role != "superAdmin" && sessionStorage.role != "groupAdmin") {
			alert("You do not have administrative privileges to access this!")
			this.router.navigateByUrl('/chat');
		}

		// get user data
		const req = this.http.post('http://localhost:3000/api/users', {})
			.subscribe((data: any) => {
					if (data.userData) {
						this.users = data.userData;
						//get group data
						const req = this.http.post('http://localhost:3000/api/groups', {})
							.subscribe((data: any) => {
									if (data.groupData) {
										this.groups = data.groupData;
									} else {
										alert('Error!');
										return;
									}
								},
								err => {
									alert('An error has occured trying to create user.')
									console.log("Error occured");
									return;
								});
					} else {
						alert('Error!');
						return;
					}
				},
				err => {
					alert('An error has occured trying to create user.')
					console.log("Error occured");
					return;
				});
	}

	public createUser() {
		// Function used to create user & post to backend API
		event.preventDefault();
		if (sessionStorage.role != "user") {
			if (this.username === "" || this.email === "" || this.role === "") {
				alert("All fields must not be blank!");
			} else {
				const req = this.http.post('http://localhost:3000/api/reg', {
						username: this.username,
						email: this.email,
						role: this.role
					})
					.subscribe((data: any) => {
							if (data.success) {
								alert('User created successfully!');
								this.username = '';
								this.email = '';
								this.role = '';
								const req = this.http.post('http://localhost:3000/api/users', {})
									.subscribe((data: any) => {
											if (data.userData) {
												console.log('data', data.userData);
												this.users = data.userData;
												console.log('thisusers', this.users);
											} else {
												alert('Error!');
												return;
											}
										},
										err => {
											alert('An error has occured trying to create user.')
											console.log("Error occured");
											return;
										});
							} else {
								alert('Error!');
								return;
							}
						},
						err => {
							alert('An error has occured trying to create user.')
							console.log("Error occured");
							return;
						});
			}
		}
	}

	public deleteUser(deletedUser) {
		// Deletes a user from the database
		if (sessionStorage.role == "superAdmin") {
			if (deletedUser) {
				event.preventDefault();
				console.log(deletedUser);
				const req = this.http.post('http://localhost:3000/api/del', {
						username: this.deletedUser
					})
					.subscribe((data: any) => {
							console.log(data);
							console.log(data.success);
							if (data.success) {
								alert('User deleted successfully!');
								this.deletedUser = '';
								const req = this.http.post('http://localhost:3000/api/users', {})
									.subscribe((data: any) => {
											if (data.userData) {
												console.log('data', data.userData);
												this.users = data.userData;
												console.log('thisusers', this.users);
											} else {
												alert('Error!');
												return;
											}
										},
										err => {
											alert('An error has occured trying to create user.')
											console.log("Error occured");
											return;
										});
							} else {
								alert('This user does not exist!');
								return;
							}
						},
						err => {
							alert('An error has occured trying to delete user.')
							console.log("Error occured", err);
							return;
						});
			} else {
				alert("You did not select a user to delete!");
			}
		} else {
			alert("You do not have permission to delete users!")
			return;
		}
	}

	public createGroup() {
		// Function used to create group & post to backend API
		event.preventDefault();
		if (!this.groupname) {
			alert("Group name field must not be blank!");
		} else {
			const req = this.http.post('http://localhost:3000/api/groupreg', {
					groupname: this.groupname
				})
				.subscribe((data: any) => {
						if (data.success) {
							console.log(data);
							alert('Group created successfully!');
							this.groupname = '';
							const req = this.http.post('http://localhost:3000/api/groups', {})
								.subscribe((data: any) => {
										if (data.groupData) {
											console.log('groupdata', data.groupData);
											this.groups = data.groupData;
											console.log('thisgroups', this.groups);
										} else {
											alert('Error!');
											return;
										}
									},
									err => {
										alert('An error has occured trying to create user.')
										console.log("Error occured");
										return;
									});
						} else {
							alert('Group already exists!');
							return;
						}
					},
					err => {
						alert('An error has occured trying to create user.')
						console.log("Error occured");
						return;
					});
		}
	}


	public deleteGroup(deletedGroup) {
		// Deletes a user from the database
		if (sessionStorage.role != "user") {
			if (deletedGroup) {
				event.preventDefault();
				console.log(deletedGroup);
				const req = this.http.post('http://localhost:3000/api/groupdel', {
						groupname: this.deletedGroup
					})
					.subscribe((data: any) => {
							console.log(data);
							console.log(data.success);
							if (data.success) {
								alert('Group deleted successfully!');
								this.deletedGroup = '';
								const req = this.http.post('http://localhost:3000/api/groups', {})
									.subscribe((data: any) => {
											if (data.groupData) {
												console.log('data', data.groupData);
												this.groups = data.groupData;
												console.log('thisgroups', this.groups);
											} else {
												alert('Error!');
												return;
											}
										},
										err => {
											alert('An error has occured trying to delete group.')
											console.log("Error occured");
											return;
										});
							} else {
								alert('This group does not exist!');
								return;
							}
						},
						err => {
							alert('An error has occured trying to delete group.')
							console.log("Error occured", err);
							return;
						});
			} else {
				alert("You did not select a group to delete!");
			}
		} else {
			alert("You do not have permission to delete groups!")
			return;
		}
	}


	public addGroupUser() {
		// Add a User to a Group
		event.preventDefault();
		console.log(this.addGusername, this.addGgroupname);
		if (this.addGusername === "" || this.addGgroupname === "") {
			alert("You must select a User and a Group!");
		} else {
			alert("This feature is a work in progress!");
			/*
			const req = this.http.post('http://localhost:3000/api/addgroupuser', {})
				.subscribe((data: any) => {
						if (data.userData) {
							alert('data is good!');
						} else {
							alert('Error!');
							return;
						}
					},
					err => {
						alert('An error has occured trying to create user.')
						console.log("Error occured");
						return;
					});*/
				}
	}
}
