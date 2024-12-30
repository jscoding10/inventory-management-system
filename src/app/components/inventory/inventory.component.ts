import { Component, inject, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnInit {
  inventoryDataArray: Inventory[] = [];

  dataSource = new MatTableDataSource<Inventory>();

  columnsToDisplay = [
    'productName',
    'productPrice',
    'currentAmount',
    'update',
    'delete',
  ];

  inventoryService = inject(InventoryService);
  dialog = inject(MatDialog);

  ngOnInit() {
    this.inventoryDataArray = this.inventoryService.getInventory();
    // Instance of mat table data source
    this.dataSource = new MatTableDataSource<Inventory>(
      this.inventoryDataArray,
    );
    console.log(this.inventoryDataArray);
  }

  // Pass data to update dialog
  onUpdate(inventory: Inventory) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '50%',
      height: '82%',
      // Pass data specific to row
      data: inventory,
    });
  }

  onDelete(inventory: Inventory) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '50%',
      height: '82%',
      // Pass data specific to row
      data: inventory,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.updateDataSource(this.inventoryDataArray);
    });
  }

  // Update data table
  updateDataSource(dataArray: Inventory[]) {
    this.dataSource.connect().next(dataArray);
  }
}
