import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private auth_service: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  async logout(){
    this.http.post('/api/auth/logout', {})
    .subscribe({
      next: () => this.auth_service.logout(),
      error: (err) => console.log(err)
    })
  }

  getStatistic(){   
    let acces_token = localStorage.getItem('access_token') || '';
    this.http.post('/api/getStats', {user_id: null}, {headers: {authorization: acces_token}})
    .subscribe({
      next: (stats) => console.log(stats),
      error: (err) => {
        console.log(err?.error)
      }
    })
  }

}
