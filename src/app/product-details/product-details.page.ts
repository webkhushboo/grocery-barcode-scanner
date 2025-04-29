import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BarcodeService, Product } from '../services/barcode.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  standalone: false
})
export class ProductDetailsPage implements OnInit {
  productId: string;
  product: Product | undefined;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private barcodeService: BarcodeService
  ) { 
    // Get the product ID from the route parameters
    this.productId = this.route.snapshot.paramMap.get('id') || 'Unknown';
  }

  ngOnInit() {
    // Fetch product details using the barcode service
    this.loading = true;
    this.barcodeService.getProductByBarcode(this.productId).subscribe(
      (product) => {
        this.product = product;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.loading = false;
      }
    );
  }

  goBack() {
    this.navCtrl.back();
  }
}
