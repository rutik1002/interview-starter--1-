import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class LoadingComponent {
}
