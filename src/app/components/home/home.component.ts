import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  movieData: any;

  ngOnInit(): void {
    this.movieData = JSON.parse(localStorage.getItem('movieInfo') || '');
    this.movieData = this.movieData.map((movie: any) => {
      if (movie.reviews?.length) {
        movie.rating =
          movie.reviews.reduce((a: any, b: any) => a + b.rating, 0) /
          movie.reviews.length;
      }
      return movie;
    });
  }

  add() {
    this.router.navigateByUrl('form');
  }

  // get rating() {

  //   return ;
  // }

  delete(index: number) {
    this.movieData.splice(index, 1);
    localStorage.setItem('movieInfo', JSON.stringify(this.movieData));
  }
}
