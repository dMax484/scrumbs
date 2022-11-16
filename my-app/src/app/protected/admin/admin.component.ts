import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OrchestrationService } from 'src/app/orchestration/orchestration.service';
import { Team } from 'src/app/_models/team';
import { User, Users } from '../../_models/user'
import { MessageDialogComponent } from './dialog/message.component';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

    // FORMS //
    createUserForm: FormGroup;
    modifyUserForm: FormGroup;
    deleteUserForm: FormGroup;
    createTeamForm: FormGroup;
    modifyTeamForm: FormGroup;
    deleteTeamForm: FormGroup;

    // ATTRIBUTES //
    users: User[] = [];
    teams: Team[] = [];
    currentId?: string = '';
    
    constructor(private orchestration: OrchestrationService, private fb: FormBuilder, public dialog: MatDialog){
        // User
        this.createUserForm = this.fb.group({
            username: ['',Validators.required],
            password: ['',Validators.required],
            role: ['',Validators.required],
            team: ['',Validators.required],
        });
        this.modifyUserForm = this.fb.group({
            id: ['',Validators.required],
            username: ['',Validators.required],
            password: ['',[Validators.required, Validators.minLength(6)]],
            role: ['',Validators.required],
            team: ['',Validators.required],
        });
        this.deleteUserForm = this.fb.group({
            id: ['',Validators.required]
        });
        // Team
        this.createTeamForm = this.fb.group({
            name: ['',Validators.required],
            scrum_master: ['',Validators.required]
        });
        this.modifyTeamForm = this.fb.group({
            id: ['',Validators.required],
            name: ['',Validators.required],
            scrum_master: ['',Validators.required]
        });
        this.deleteTeamForm = this.fb.group({
            id: ['',Validators.required]
        });

    }

    ngOnInit(): void {
        this.getUsers();
        this.getTeams();
        console.log(this.users);
    }

    //message
    generateMessage(data: any){
        let dialogRef = this.dialog.open(MessageDialogComponent, {
            width: '250px',
            data: { data }
          });
        
          dialogRef.afterClosed().subscribe(result => {
            data = result;
          });
    }

    // get id from username
    getUserId(username: string){
        const user = this.users.find(user => user.username == username);
        const id = user?._id;
        return id;
    }

    createUser(){
        console.log(this.createUserForm.value);
        this.orchestration.createUser(this.createUserForm.value).subscribe(data => {
            console.log('message', data);
            //refresh users
            this.getUsers();
            //reset form
            this.createUserForm.reset();
        });
    }

    deleteUser(){
        this.orchestration.deleteUser(this.deleteUserForm.value.id).subscribe(data => {
            //refresh users
            this.getUsers();
            //reset form
            this.deleteUserForm.reset();
        });
    }

    modifyUser(){
        this.orchestration.updateUser(this.modifyUserForm.value).subscribe(data => {
            console.log('message', data);
            //refresh users
            this.getUsers();
            //reset form
            this.modifyUserForm.reset();
        })
    }

    getUsers(){
        this.orchestration.readAllUsers().subscribe(data => {
            console.log(data.users)
            this.users = data.users;
        });
    }

    getTeams(){
        this.orchestration.readAllTeams().subscribe(data => {
            console.log(data.teams)
            this.teams = data.teams;
        });
    }

    createTeam(){
        this.orchestration.createTeam(this.createTeamForm.value).subscribe(data => {
            console.log('message', data);
            //refresh teams
            this.getTeams();
            //reset form
            this.createTeamForm.reset();
        });
    }

    modifyTeam(){
        this.orchestration.updateTeam(this.modifyTeamForm.value).subscribe(data => {
            console.log('message', data);
            //refresh teams
            this.getTeams();
            //reset form
            this.modifyTeamForm.reset();
        })
    }

    deleteTeam(){
        this.orchestration.deleteTeam(this.deleteTeamForm.value.id).subscribe(data => {
            //refresh teams
            this.getTeams();
            //reset form
            this.deleteTeamForm.reset();
        });
    }
}