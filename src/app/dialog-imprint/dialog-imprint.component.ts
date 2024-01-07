import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-imprint',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-imprint.component.html',
  styleUrl: './dialog-imprint.component.scss'
})

export class DialogImprintComponent {

}
