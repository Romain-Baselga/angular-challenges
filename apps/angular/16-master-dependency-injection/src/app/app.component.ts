import { TableComponent } from '@angular-challenges/shared/ui';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { CurrencyPipe } from './currency.pipe';
import { CurrencyService } from './currency.service';
import { Product, products } from './product.model';

interface ProductContext {
  $implicit: Product;
}

@Directive({
  selector: 'ng-template[product]',
  standalone: true,
  providers: [],
})
export class ProductDirective {
  static ngTemplateContextGuard(
    dir: ProductDirective,
    ctx: unknown,
  ): ctx is ProductContext {
    return true;
  }
}

@Directive({
  selector: '[productCode]',
  standalone: true,
  providers: [CurrencyService],
})
export class ProductCodeDirective implements OnInit {
  @Input() productCode!: string;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.patchState({ code: this.productCode });
  }
}

@Component({
  standalone: true,
  imports: [
    TableComponent,
    NgFor,
    ProductDirective,
    CurrencyPipe,
    AsyncPipe,
    ProductCodeDirective,
  ],
  selector: 'app-root',
  template: `
    <table [items]="products">
      <ng-template #header>
        <tr>
          <th *ngFor="let col of displayedColumns">
            {{ col }}
          </th>
        </tr>
      </ng-template>
      <ng-template #body product let-product>
        <tr [productCode]="product.currencyCode">
          <td>{{ product.name }}</td>
          <td>{{ product.priceA | currency | async }}</td>
          <td>{{ product.priceB | currency | async }}</td>
          <td>{{ product.priceC | currency | async }}</td>
        </tr>
      </ng-template>
    </table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
