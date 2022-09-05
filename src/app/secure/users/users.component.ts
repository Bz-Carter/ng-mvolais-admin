import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[];
  currentPage = 1;
  lastPage: number;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.userService.all().subscribe((res: Response) => {
      this.users = res.data;
      
    });
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûre de vouloir supprimer cet enregistrement?')) {
      this.userService.delete(id).subscribe((res) => {
        this.users = this.users.filter((el) => el.id !== id);
      });
    }
  }
}
