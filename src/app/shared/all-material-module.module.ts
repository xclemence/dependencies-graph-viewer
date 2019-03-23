import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSliderModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

@NgModule({
  imports: [ MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatIconModule,
    MatTableModule, MatDialogModule, MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule ],
  exports: [ MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatIconModule,
    MatTableModule, MatDialogModule, MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule ],
})
export class AllMaterialModuleModule {}
