import { Component } from '@angular/core';
import { IProduct } from '../../../core/interfaces/product/product';
import { DynamicDialogModule, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CommonModule } from '@angular/common';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-product-details',
  imports: [DynamicDialogModule, CommonModule, ImageModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  standalone: true
})
export class ProductDetailsComponent {
  public product!: IProduct;


  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.product = this.config.data;
    console.log(this.product);

  }


}
