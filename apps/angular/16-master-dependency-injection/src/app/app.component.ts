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
})
export class ProductDirective {
  static ngTemplateContextGuard(
    dir: ProductDirective,
    ctx: unknown,
  ): ctx is ProductContext {
    return true;
  }
}

@Component({
  standalone: true,
  selector: 'row',
  template: `
    <tr>
      <td>{{ product.name }}</td>
      <td>{{ product.priceA | currency | async }}</td>
      <td>{{ product.priceB | currency | async }}</td>
      <td>{{ product.priceC | currency | async }}</td>
    </tr>
  `,
  imports: [CurrencyPipe, AsyncPipe],
  providers: [CurrencyService],
})
export class RowComponent implements OnInit {
  @Input() product!: Product;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.patchState({ code: this.product.currencyCode });
  }
}

@Component({
  standalone: true,
  imports: [TableComponent, NgFor, ProductDirective, RowComponent],
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
        <row [product]="product"></row>
      </ng-template>
    </table>
  `,
})
export class AppComponent {
  products = products;
  displayedColumns = ['name', 'priceA', 'priceB', 'priceC'];
}
