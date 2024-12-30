import { Component, inject, OnInit } from '@angular/core';
import { Inventory } from '../../models/inventory';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  inventoryToDelete!: Inventory;
  idToDelete!: number;
  data: Inventory = inject(MAT_DIALOG_DATA);
  inventoryService = inject(InventoryService);
  dialogRef = inject(MatDialogRef);

  deleteForm = new FormGroup({
    productName: new FormControl({ value: '', disabled: true }),
    productPrice: new FormControl({ value: '', disabled: true }),
    currentAmount: new FormControl({ value: '', disabled: true }),
  });

  constructor() {
    this.inventoryToDelete = this.data;
  }

  ngOnInit() {
    console.log(this.inventoryToDelete);
    // Populate all input values
    this.deleteForm.controls['productName'].setValue(
      this.inventoryToDelete.productName,
    );
    this.deleteForm.controls['productPrice'].setValue(
      this.inventoryToDelete.productPrice,
    );
    this.deleteForm.controls['currentAmount'].setValue(
      this.inventoryToDelete.currentAmount,
    );
  }

  onSubmit() {
    let inventoryId = this.inventoryToDelete.id;
    this.inventoryService.deleteInventory(inventoryId);

    this.dialogRef.close();
  }
}
