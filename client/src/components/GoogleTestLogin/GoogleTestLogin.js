// import { NgbAuthFirebaseUIModule } from '@firebaseui/ng-bootstrap';

// @NgModule({
//   declarations: [AppComponent, ...],
//   imports: [NgbAuthFirebaseUIModule.forRoot({
//     apiKey: 'your-firebase-apiKey',
//     authDomain: 'your-firebase-authDomain',
//     databaseURL: 'your-firebase-databaseURL',
//     projectId: 'your-firebase-projectId',
//     storageBucket: 'your-firebase-storageBucket',
//     messagingSenderId: 'your-firebase-messagingSenderId'
//   }), ...],
//   bootstrap: [AppComponent]
// })
// export class AppModule {
// }


// Other modules in your application can simply import NgbAuthFirebaseUIModule: 

// import { NgbAuthFirebaseUIModule } from '@firebaseui/ng-bootstrap';

// @NgModule({
//   declarations: [OtherComponent, ...],
//   imports: [NgbAuthFirebaseUIModule, ...], 
// })
// export class OtherModule {
// }


// <!-- You can now use the library component in app.component.html  -->
 
// <ngb-auth-firebaseui (onSuccess)="printUser($event)"
//                      (onError)="printError()">
// </ngb-auth-firebaseui>

// How to disable users to sign in and continue as guest, use the guestEnabled input
// <ngb-auth-firebaseui [guestEnabled]="false"
//                      (onSuccess)="printUser($event)"
//                      (onError)="printError($event)">
// </ngb-auth-firebaseui>

// e.g: in your component, import the AuthProvider enum to pick up your favorite provider:

// import {OnInit} from '@angular/core';
// import {AuthProvider} from '@firebaseui/ng-bootstrap';
 
// export class ExampleComponent implements OnInit {
 
//   providers = AuthProvider;
 
//   ngOnInit() {
//   }
// }


// in your template -->

//   <ngb-auth-firebaseui
//   [providers]="[providers.Google]"
//   (onSuccess)="printUser($event)"
//    (onError)="printError()"></ngb-auth-firebaseui>