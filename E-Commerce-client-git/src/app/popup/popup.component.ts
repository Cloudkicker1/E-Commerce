import { Component, OnInit, inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  amount: number;

  constructor(public dialogRef: MatDialogRef<PopupComponent>) { }

  saveAmount() {
    this.dialogRef.close(this.amount)
  }

  ngOnInit(): void {
  }

}
