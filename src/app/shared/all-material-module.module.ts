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

@NgModule({
  imports: [ MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatIconModule,
    MatTableModule, MatDialogModule, MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule, MatTooltipModule ],
  exports: [ MatToolbarModule, MatListModule, MatCardModule, MatTabsModule, MatInputModule, MatIconModule,
    MatTableModule, MatDialogModule, MatSliderModule, MatSortModule, MatButtonModule, MatMenuModule, MatTooltipModule ],
})
export class AllMaterialModuleModule {}
