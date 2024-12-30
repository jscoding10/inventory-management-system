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
  selector: 'app-update-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './update-dialog.component.html',
  styleUrl: './update-dialog.component.scss',
})
export class UpdateDialogComponent implements OnInit {
  updateInventory!: Inventory;
  inventoryToUpdate!: Inventory;
  data: Inventory = inject(MAT_DIALOG_DATA);
  inventoryService = inject(InventoryService);
  dialogRef = inject(MatDialogRef);

  updateForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.required]),
    currentAmount: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.inventoryToUpdate = this.data;
  }

  ngOnInit() {
    console.log(this.inventoryToUpdate);
    // Populate all input values
    this.updateForm.controls['productName'].setValue(
      this.inventoryToUpdate.productName,
    );
    this.updateForm.controls['productPrice'].setValue(
      this.inventoryToUpdate.productPrice,
    );
    this.updateForm.controls['currentAmount'].setValue(
      this.inventoryToUpdate.currentAmount,
    );
  }

  onSubmit() {
    this.updateInventory = {
      id: this.inventoryToUpdate.id,
      productName: this.updateForm.controls['productName'].value as string,
      productPrice: this.updateForm.controls['productPrice'].value as string,
      currentAmount: this.updateForm.controls['currentAmount'].value as string,
    };
    this.inventoryService.updateInventory(this.updateInventory);
    this.dialogRef.close();
  }
}
