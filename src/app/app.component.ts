import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cave';

  constructor() {
    const config = {
      apiKey: "AIzaSyDn9u_zjXqPkNA5O423bLpp7q2xKstdJms",
      authDomain: "cave-e6baa.firebaseapp.com",
      databaseURL: "https://cave-e6baa.firebaseio.com",
      projectId: "cave-e6baa",
      storageBucket: "cave-e6baa.appspot.com",
      messagingSenderId: "998712065115"
    };
    firebase.initializeApp(config);
  }
}
