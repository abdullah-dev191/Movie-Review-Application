import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css'],
})
export class MoviedetailsComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private route: Router
  ) {}

  movieDetail: any;
  tempArray: any;
  index: any;

  ngOnInit(): void {
    this.index = this.activeRoute.snapshot.params['id'];
    this.tempArray = JSON.parse(localStorage.getItem('movieInfo') || '');
    this.movieDetail = this.tempArray.at(this.index);
  }

  // pop-Up Form....

  ratingRegex = /^([0-5])([0-5]{0})(\.[0-9](^[eE])?)?$/;

  review = this.fb.group({
    reviewerName: ['', [Validators.required]],
    reviewContent: ['', [Validators.required]],
    rating: ['', Validators.required],
  });

  submit() {
    this.tempArray[this.index].reviews.push(this.review.value);
    localStorage.setItem('movieInfo', JSON.stringify(this.tempArray));
    this.review.reset();
  }

  catchErrors(errors: any): AbstractControl | null {
    return this.review.get(errors);
  }

  popUpReset() {
    this.review.reset();
  }

  edit() {}

  delete(index: number) {
    this.tempArray[this.index].reviews.splice(index, 1);
    localStorage.setItem('movieInfo', JSON.stringify(this.tempArray));
  }

  get rating() {
    const overallRating = this.movieDetail.reviews.reduce(
      (a: any, b: any) => a + b.rating,
      0
    );
    return overallRating / this.movieDetail.reviews.length;
  }

  updaterating() {
    // console.log('updateRating :>> ', updateRating / 5 / 5);
  }

  printPage() {
    // var printPage = document.getElementById('printPage');
    // window.print(printPage);
    window.print();
  }
}
