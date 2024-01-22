import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {HttpService} from "./shared/services/http.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {UtilsService} from "./shared/services/utils.service";
import {PRODUCT_COLUMNS} from "./mock/products.mock";
import {ProductInterface} from './shared/types/product.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = PRODUCT_COLUMNS;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog,
              private httpService: HttpService,
              private utils: UtilsService) {
  }

  ngOnInit() {
    this.getAllProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createProduct() {
    this.dialog
      .open(DialogComponent, {
        width: '30%'
      })
      .afterClosed()
      .subscribe({
        next: (res: string) => {
          if (res === 'created') {
            this.getAllProducts()
          }
        },
        error: this.utils.errorHandler
      });
  }

  updateProduct(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: row
      })
      .afterClosed()
      .subscribe({
        next: (res: string) => {
          if (res === 'updated') {
            this.getAllProducts()
          }
        },
        error: this.utils.errorHandler
      });
  }

  deleteProduct(id: string) {
    this.httpService.deleteData(id).subscribe({
      next: _ => {
        console.log('deleted successfully')
        this.getAllProducts();
      },
      error: this.utils.errorHandler
    })
  }

  private getAllProducts(): void {
    this.httpService.readData().subscribe({
      next: (res: any) => {
        const arr: ProductInterface[] = [];
        Object.keys(res).forEach(key => arr.push({key, ...res[key]}));
        this.dataSource = new MatTableDataSource(arr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(arr)
        return arr;
      },
      error: this.utils.errorHandler
    })
  }
}
