import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory';

@Component({
  selector: 'app-new-inventory',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './new-inventory.component.html',
  styleUrl: './new-inventory.component.scss',
})
export class NewInventoryComponent {
  newInventory!: Inventory;

  inventoryForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    productPrice: new FormControl('', [Validators.required]),
    currentAmount: new FormControl('', [Validators.required]),
  });

  router = inject(Router);
  inventoryService = inject(InventoryService);

  onSubmit() {
    console.log(this.inventoryForm.value);

    this.newInventory = {
      id: 0,
      productName: this.inventoryForm.controls['productName'].value as string,
      productPrice: this.inventoryForm.controls['productPrice'].value as string,
      currentAmount: this.inventoryForm.controls['currentAmount']
        .value as string,
    };

    this.inventoryService.createInventory(this.newInventory);

    this.router.navigate(['/inventory']);
  }

  onCancel() {
    this.router.navigate(['/inventory']);
  }
}
