import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../shared/services/http.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PRODUCT_CONDITION_LIST, PRODUCT_FIELDS} from "../mock/products.mock";
import {ProductInterface} from "../shared/types/product.interface";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productConditionList = PRODUCT_CONDITION_LIST;
  actionBtn = 'Сохранить'
  form!: FormGroup;

  constructor(private fb: FormBuilder,
              private http: HttpService,
              private dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ProductInterface) {
  }

  ngOnInit() {
    this.initializedForm();
  }

  addProduct() {
    if (this.form.invalid) return

    this.http.createData(this.form.value).subscribe({
      next: (res: any) => {
        console.log('product added', res);
        this.form.reset();
        this.dialogRef.close('created');
      },
      error: (err: any) => console.log(err)
    })

  }

  updateProduct(): void {
    if (this.form.invalid) return
    if (!this.data?.key) return

    this.http.updateData(this.form.value, this.data.key).subscribe({
      next: (res: any) => {
        console.log('product updated', res);
        this.form.reset();
        this.dialogRef.close('updated');
      },
      error: (err: any) => console.log(err)
    })
  }

  private initializedForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      productCondition: ['', [Validators.required]],
      price: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });

    this.initializedFormValues();
  }

  private initializedFormValues(): void {
    if (!this.data) return

    this.actionBtn = 'Изменить';
    PRODUCT_FIELDS.forEach(name => this.form.controls[name].setValue(this.data[name as keyof ProductInterface]))
  }
}
