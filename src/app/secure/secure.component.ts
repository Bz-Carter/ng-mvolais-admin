import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../classes/auth';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})
export class SecureComponent implements OnInit {
  user: User;
  authenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.user().subscribe(
      (res: Response) => {
        this.user = res.data;
        Auth.user = this.user;
        this.authenticated = true;
      },
      (err) => {
        this.authenticated = false;
        this.router.navigate(['/login']);
      }
    );
  }
}
