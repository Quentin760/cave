import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WinesService } from 'src/app/services/wines.service';
import { Router } from '@angular/router';
import { Wine } from 'src/app/models/wine.model';

@Component({
  selector: 'app-wine-form',
  templateUrl: './wine-form.component.html',
  styleUrls: ['./wine-form.component.css']
})
export class WineFormComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  wineForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private winesService: WinesService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

initForm() {
  this.wineForm = this.formBuilder.group({
    nom: ['', Validators.required],
    couleur: ['', Validators.required],
    année: ['', Validators.required]
  });
}

onSaveWine() {
  const nom = this.wineForm.get('nom').value;
  const annee = this.wineForm.get('année').value;
  const couleur = this.wineForm.get('couleur').value;
  const newWine = new Wine(nom, couleur);
  newWine.annee = annee;
  this.winesService.createNewWine(newWine);
  this.router.navigate(['/wines']);
}
onUploadFile(file: File) {
  this.fileIsUploading = true;
  this.winesService.uploadFile(file).then(
    (url: string) => {
      this.fileUrl = url;
      this.fileIsUploading = false;
      this.fileUploaded = true;
    }
  );
}
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}
}
