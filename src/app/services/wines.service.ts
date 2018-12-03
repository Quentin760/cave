import { Injectable } from '@angular/core';
import { Wine } from '../models/wine.model';
import { Subject } from "rxjs";
import * as firebase from "firebase";
import { HttpClient } from "@angular/common/http";
import Datasnapshot = firebase.database.DataSnapshot;


@Injectable()
export class WinesService {

  wines: Wine[] = [];
  winesSubject = new Subject<Wine[]>();

  constructor(private httpClient: HttpClient) {
    this.getWines();
   }

  emitWines() {
    this.winesSubject.next(this.wines);
  }

  saveWines() {
    firebase.database().ref('/wines').set(this.wines);
  }

 

  getWines() {
    firebase.database().ref('/books')
      .on('value', (data: Datasnapshot) => {
          this.wines = data.val() ? data.val() : [];
          this.emitWines();
        }
      );
  }

  getSinglewine(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/wines/' + id).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewWine(newWine: Wine) {
    
    this.wines.push(newWine);
    this.saveWines();
    this.emitWines();
  }

  removeWine(wine: Wine) {
    if(wine.photo) {
      const storageRef = firebase.storage().refFromURL(wine.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo removed!');
        },
        (error) => {
          console.log('Could not remove photo! : ' + error);
        }
      );
    }
    const wineIndexToRemove = this.wines.findIndex(
      (wineEl) => {
        if(wineEl === wine) {
          return true;
        }
      }
    );
    this.wines.splice(wineIndexToRemove, 1);
    this.saveWines();
    this.emitWines();
}
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
}

}
