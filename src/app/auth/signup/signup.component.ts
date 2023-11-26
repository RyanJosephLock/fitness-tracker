import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs'

import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date = new Date();
  isLoading = false;
  private loadingSubs!: Subscription;

  constructor(
    private authService: AuthService,
    private uiService: UIService
    ) { }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(result => {
      this.isLoading = result;
    });
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

}
