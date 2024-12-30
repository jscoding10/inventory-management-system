import { Injectable } from '@angular/core';
import { Inventory } from '../models/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventory: Inventory[] = [
    {
      id: 1,
      productName: 'Phone',
      productPrice: '100.00',
      currentAmount: '10',
    },
    {
      id: 2,
      productName: 'Shirt',
      productPrice: '10.00',
      currentAmount: '100',
    },
    {
      id: 3,
      productName: 'Computer',
      productPrice: '1000.00',
      currentAmount: '19',
    },
  ];

  constructor() {}

  getInventory() {
    return this.inventory;
  }

  createInventory(newInventory: Inventory) {
    // find highest id

    let highestId = 0;
    this.inventory.forEach((inventoryObject) => {
      if (inventoryObject.id > highestId) {
        highestId = inventoryObject.id;
      }
    });

    this.inventory.push({
      id: highestId + 1,
      productName: newInventory.productName,
      productPrice: newInventory.productPrice,
      currentAmount: newInventory.currentAmount,
    });
  }

  updateInventory(updateInventory: Inventory) {
    // Use index to update values
    const index = this.inventory.findIndex(
      (inventory) => inventory.id === updateInventory.id,
    );
    this.inventory[index].productName = updateInventory.productName;
    this.inventory[index].productPrice = updateInventory.productPrice;
    this.inventory[index].currentAmount = updateInventory.currentAmount;
  }

  deleteInventory(id: Number) {
    const index = this.inventory.findIndex((inventory) => inventory.id === id);
    this.inventory.splice(index, 1);
  }
}
