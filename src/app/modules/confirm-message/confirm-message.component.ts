import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-message',
  templateUrl: './confirm-message.component.html',
  styleUrls: ['./confirm-message.component.css']
})
export class ConfirmMessageComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<ConfirmMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

    close(): void {
      this.dialog.close(true);
    }
  


  ngOnInit(): void {
  }

}
