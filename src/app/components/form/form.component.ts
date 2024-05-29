import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {}

  ratingRegex = /^([0-5])([0-5]{0})(\.[0-9](^[eE])?)?$/;

  moviedetail = this.fb.group({
    title: ['', [Validators.required]],
    poster: ['', [Validators.required]],
    releaseDate: ['', [Validators.required]],
    rating: ['', [Validators.required, Validators.pattern(this.ratingRegex)]],
    duration: ['', [Validators.required]],
    details: ['', [Validators.required]],
    reviews: this.fb.array([]),
  });

  movieDetailsArray: any[] = [];

  submit() {
    const tempArray = JSON.parse(localStorage.getItem('movieInfo') || '');
    this.movieDetailsArray = tempArray;
    this.movieDetailsArray.push(this.moviedetail.value);
    localStorage.setItem('movieInfo', JSON.stringify(this.movieDetailsArray));
    this.moviedetail.reset();
    this.route.navigateByUrl('home');
  }

  catchErrors(errors: any): AbstractControl | null {
    return this.moviedetail.get(errors);
  }
}
