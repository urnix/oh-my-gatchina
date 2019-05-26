import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { UserAuthErrorAction } from '../+core/store/actions/userAuthError.action';
import { UserSignUpAction } from '../+core/store/actions/userSignUp.action';
import { AppState } from '../+core/store/app.state';
import { AuthState } from '../+core/store/types/authState.enum';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'angular-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  AuthState = AuthState;
  // jobTitles = JobTitles;
  form: FormGroup;
  // authState$ = this.store.pipe(select(getAuthState));
  // authError$ = this.store.pipe(select(getAuthError));

  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<AppState>,
    private db: AngularFirestore
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      displayName: new FormControl(null, Validators.required),
      // jobTitle: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(8),
        Validators.required
      ]),
      confirmPassword: new FormControl(null, [Validators.required])
    });
  }

  async signUpAnon() {
    try {
      await this.afAuth.auth.signInAnonymously();
      const id = await this.db.createId();
      const user = { id, categories: [] };
      await this.db.doc(`users/${id}`).set(user);
    } catch (err) {
      return this.store.dispatch(new UserAuthErrorAction(err.message));
    }
    this.store.dispatch(new UserSignUpAction({ displayName: null }));
  }

  // async signUp() {
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   try {
  //     await this.afAuth.auth.createUserWithEmailAndPassword(
  //       this.form.controls['email'].value,
  //       this.form.controls['password'].value,
  //     );
  //     await this.afAuth.auth.currentUser.sendEmailVerification({
  //       url: environment.baseUrl + 'onboarding/sign-in',
  //       handleCodeInApp: true,
  //     });
  //   } catch (err) {
  //     return this.store.dispatch(new UserAuthErrorAction(err.message));
  //   }
  //   const userDetails: UserCustomFields = {
  //     displayName: this.form.controls['displayName'].value,
  //   };
  //   this.store.dispatch(new UserSignUpAction(userDetails));
  // }
  //
  // tryAgain() {
  //   this.store.dispatch(new UserSignedOutAction());
  // }
}

//
// // import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
// // import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
// // import { JobTitles } from '@shared/values/jobTitles.array';
// // import { AngularFireAuth } from 'angularfire2/auth';
// // import { UserAuthErrorAction } from '../../+core/store/actions/userAuthErrorAction';
// // import { UserSignedOutAction } from '../../+core/store/actions/userSignedOut.action';
// // import { getAuthError, getAuthState } from '../../+core/store/selectors';
// // import { AppState } from '../../+core/store/app.state';
// // import { select, Store } from '@ngrx/store';
// // import { environment } from '../../../environments/environment';
// // import { AuthState } from '../../+core/store/types/authState.enum';
// // import { UserSignUpAction } from '../../+core/store/actions/userSignUp.action';
// // import { AdvancedEmailValidator } from '../../../../../../shared/validators.helper';
// // import { UserCustomFields } from '../../+core/store/core.state';
//
//
// // TODO: Privacy Policy & Terms
// @Component({
//   selector: 'fr-sign-up',
//   templateUrl: './sign-up.component.html',
//   styleUrls: ['./sign-up.component.sass'],
//   encapsulation: ViewEncapsulation.None,
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class SignUpComponent implements OnInit {
//   AuthState = AuthState;
//   jobTitles = JobTitles;
//   form: FormGroup;
//   authState$ = this.store.pipe(select(getAuthState));
//   authError$ = this.store.pipe(select(getAuthError));
//
//   constructor(private afAuth: AngularFireAuth, private store: Store<AppState>) {}
//
//   ngOnInit() {
//     this.form = new FormGroup(
//       {
//         displayName: new FormControl(null, Validators.required),
//         jobTitle: new FormControl(null, Validators.required),
//         email: new FormControl(null, [Validators.required, AdvancedEmailValidator]),
//         password: new FormControl(null, [Validators.minLength(8), Validators.required]),
//         confirmPassword: new FormControl(null, [Validators.required]),
//       },
//       { validators: [PasswordValidation.MatchPassword] },
//     );
//   }
//
//   async signUp() {
//     if (this.form.invalid) {
//       return;
//     }
//     try {
//       await this.afAuth.auth.createUserWithEmailAndPassword(
//         this.form.controls['email'].value,
//         this.form.controls['password'].value,
//       );
//       await this.afAuth.auth.currentUser.sendEmailVerification({
//         url: environment.baseUrl + 'onboarding/sign-in',
//         handleCodeInApp: true,
//       });
//     } catch (err) {
//       return this.store.dispatch(new UserAuthErrorAction(err.message));
//     }
//     const userDetails: UserCustomFields = {
//       displayName: this.form.controls['displayName'].value,
//       jobTitle: this.form.controls['jobTitle'].value,
//     };
//     this.store.dispatch(new UserSignUpAction(userDetails));
//   }
//
//   tryAgain() {
//     this.store.dispatch(new UserSignedOutAction());
//   }
// }
//
