import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    // private _listFilter: string;
    listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    // @ViewChild('filterElement') filterElementRef: ElementRef;
    @ViewChild('filterElementModel') filterElementRef: NgModel;
    @ViewChild('filterElement') filterInput: NgModel;

    filteredProducts: IProduct[];
    products: IProduct[];

/*     get listFilter() {
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.performFilter(this._listFilter);
    } */

    constructor(private productService: ProductService) { }

    ngAfterViewInit(): void {
/*       if (this.filterElementRef.nativeElement) {
        this.filterElementRef.nativeElement.focus();
      } */
      // this.filterInput.valueChanges.subscribe( () => { this.performFilter(this.listFilter)});
      this.filterElementRef.valueChanges.subscribe( () => { this.performFilter(this.listFilter)});
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }

}
