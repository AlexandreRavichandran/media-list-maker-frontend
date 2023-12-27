import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mlm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup = this.generateSearchForm();
  searchButtonStyle: string = 'search__movie__button';

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(param => {
      if (param['type'] !== null) {
        this.searchForm.get('type')?.setValue(param['type']);
      }
    });

    this.searchForm.get('type')?.setValue('movie');

  }

  generateSearchForm(): FormGroup {
    return new FormGroup({
      type: new FormControl('movie', Validators.required),
      query: new FormControl('Ultra', Validators.required)
    });
  }

  onSearch(): void {

    if (!this.isFormValid) {
      return;
    }

  }

  isFormValid(): boolean {
    return this.searchForm.valid;
  }

  onTypeChange(): void {
    if (this.searchForm.get('type')?.value === 'movie') {
      this.searchButtonStyle = 'search__movie__button';
    } else {
      this.searchButtonStyle = 'search__music__button';
    }
  }

}
