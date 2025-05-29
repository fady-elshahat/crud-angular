import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { IProduct } from '../../../core/interfaces/product/product';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ToastService } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';
import { IColumn, IExportColumn } from '../../../core/interfaces/product/csv';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ProductsService } from '../../../core/services/products.service';




@Component({
  selector: 'app-product-list',
  imports: [CommonModule, TableModule, ButtonComponent, InputFieldComponent, FormsModule, DynamicDialogModule, ConfirmPopupModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  standalone: true,
  providers: [
    DialogService,
    ConfirmationService
  ],
})
export class ProductListComponent implements OnInit, OnDestroy {

  @ViewChild('dt', { static: false }) dt!: Table;


  private _ProductsService = inject(ProductsService)
  private _ConfirmationService = inject(ConfirmationService)

  private _DialogService = inject(DialogService)
  private _ToastService = inject(ToastService)
  private _Subscription: Subscription = new Subscription();

  public searchValue: string = '';
  public ref: DynamicDialogRef | undefined;
  public products$ = this._ProductsService.products$;
  public products: IProduct[] = [];
  public cols!: IColumn[];
  public exportColumns!: IExportColumn[];

  constructor(private _Cdr: ChangeDetectorRef) {

  }


  ngOnInit(): void {
    this._Subscription.add(
      this._ProductsService.products$.subscribe(products => {
        this.products = products ?? [];
        this._Cdr.detectChanges();

      })
    );


    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'available', header: 'Available' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }


  addProduct() {
    this.ref = this._DialogService.open(ProductFormComponent, {
      header: 'Add Product',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      modal: true,

    });
    this.ref.onClose.subscribe((product: IProduct) => {
      if (product) {
        product.id = this._ProductsService.getNextId();
        this._ToastService.showSuccess('Product Selected', product.name)
        this._ProductsService.add(product)
      }
    });
  }

  onEdit(product: IProduct) {
    this.ref = this._DialogService.open(ProductFormComponent, {
      header: 'Edit Product',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      modal: true,
      data: product
    });

    this.ref.onClose.subscribe((updatedProduct: IProduct) => {
      if (updatedProduct) {
        this._ProductsService.update(updatedProduct);
        this._ToastService.showSuccess('Product Updated', updatedProduct.name);
      }
    });
  }

  onShow(product: IProduct) {
    this.ref = this._DialogService.open(ProductDetailsComponent, {
      header: 'Edit Product',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      closable: true,
      baseZIndex: 10000,
      maximizable: true,
      modal: true,
      data: product
    });

  }

  onDelete(product: IProduct, event: Event) {
    this._ConfirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this Product?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
      },
      accept: () => {
        this._ToastService.showSuccess('Product Deleted', product.name);
        this._ProductsService.delete(product.id);

      },
      reject: () => {
      }
    });
  }

  onSearch() {
    this.dt.filterGlobal(this.searchValue, 'contains');
  }

  confirmDelete(event: Event) {

  }



  ngOnDestroy(): void {
    this._Subscription.unsubscribe();
  }

}


