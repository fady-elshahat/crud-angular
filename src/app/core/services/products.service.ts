import { inject, Injectable, effect, OnDestroy, EffectRef } from '@angular/core';
import { IProduct } from '../interfaces/product/product';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService implements OnDestroy {

  private _EffectRef: EffectRef;
  private _AuthService = inject(AuthService);

  // State for products using BehaviorSubject
  private _ProductsSubject = new BehaviorSubject<IProduct[]>([]);
  public products$ = this._ProductsSubject.asObservable(); // Observable for components

  constructor() {
    // Watch for changes in currentUser using effect
    this._EffectRef = effect(() => {
      const user = this._AuthService.currentUser(); // Get current user
      this.loadInitialData(); // Load products for this user
    });
  }

  // Get localStorage key for current user's products
  private getStorageKey(): string | null {
    const currentUser = this._AuthService.currentUser();
    return currentUser ? `products_${currentUser.email}` : null;
  }

  // Load initial products from localStorage
  private loadInitialData(): void {
    const key = this.getStorageKey();
    if (!key) {
      this._ProductsSubject.next([]); // No user = empty products
      return;
    }

    const data = localStorage.getItem(key);
    const products = data ? JSON.parse(data) : [];
    this._ProductsSubject.next(products); // Set products state
  }

  // Update both BehaviorSubject and localStorage
  private updateStateAndStorage(products: IProduct[]): void {
    this._ProductsSubject.next(products);

    const key = this.getStorageKey();
    if (key) {
      localStorage.setItem(key, JSON.stringify(products));
      // Update user's products in AuthService
      this._AuthService.updateUserProducts(this._AuthService.currentUser()?.email ?? '', products);
    }
  }

  // Get current products list (sync)
  getAll(): IProduct[] {
    return this._ProductsSubject.getValue();
  }

  // Add a new product
  add(product: IProduct): void {
    const products = this.getAll();
    this.updateStateAndStorage([...products, product]);
  }

  // Delete a product by ID
  delete(productId: number): void {
    const products = this.getAll().filter(p => p.id !== productId);
    this.updateStateAndStorage(products);
  }

  // Update an existing product
  update(updatedProduct: IProduct): void {
    const products = this.getAll().map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    this.updateStateAndStorage(products);
  }

  // Get next available product ID
  getNextId(): number {
    const products = this.getAll();
    return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }

  // Clean up effect on service destroy
  ngOnDestroy(): void {
    this._EffectRef?.destroy();
  }
}
