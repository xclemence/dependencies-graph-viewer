import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatIconModule, MatSnackBarModule,
    MatTableModule, MatDialogModule, MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  exports: [MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatIconModule, MatSnackBarModule,
    MatTableModule, MatDialogModule, MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 8000 } }
  ]
})
export class AllMaterialModuleModule { }
