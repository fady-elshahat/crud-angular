import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../../core/interfaces/product/product';
import { DynamicDialogRef, DynamicDialogConfig, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ToastService } from '../../../core/services/toast.service';
import { InputUploadComponent } from '../../../shared/components/input-upload/input-upload.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  imports: [DynamicDialogModule, FormsModule, InputFieldComponent, ButtonComponent, InputUploadComponent, CommonModule, HttpClientModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  public product!: IProduct;
  public imageBase64: string | null = null;

  private _ToastService = inject(ToastService);



  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {

    this.initializeProduct()
  }


  private initializeProduct() {
    this.product = this.config.data
      ? { ...this.config.data }
      : { id: 0, name: '', price: 0, category: '', available: false, img: '' };

    this.imageBase64 = this.product.img || null;
  }
  onImageUpload(base64: string) {
    this.imageBase64 = base64;
    this.product.img = base64;
  }

  save() {
    const { price, category } = this.product;
    if (!price || !category) {
      this._ToastService.showWarn('Please fill in all required fields.');
      return;
    }
    this.ref.close(this.product);
  }

  cancel() {
    this.ref.close();
  }
}
