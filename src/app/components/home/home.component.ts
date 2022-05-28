import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

import { AddItem, RemoveItem } from './store/home.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  items: Observable<{items: number[]}> = new Observable();
  constructor(
    private auth_service: AuthService,
    private http: HttpClient,
    private store: Store<{home: { items: number[] }}>
  ) {}

  ngOnInit(): void {
    console.log(this.store.select('home'));
    this.items = this.store.select('home');
  }

  add(){
    let rmd = Math.floor(Math.random() * 100);
    this.store.dispatch(new AddItem(rmd))
  }

  remove(index: number){
    this.store.dispatch(new RemoveItem(index));
  }

  async logout() {
    this.http.post('/api/auth/logout', {}).subscribe({
      next: () => this.auth_service.logout(),
      error: (err) => console.log(err),
    });
  }

  getStatistic() {
    let acces_token = localStorage.getItem('access_token') || '';
    this.http
      .post(
        '/api/getStats',
        { user_id: null },
        { headers: { authorization: acces_token } }
      )
      .subscribe({
        next: (stats) => console.log(stats),
        error: (err) => {
          console.log(err?.error);
        },
      });
  }
}
