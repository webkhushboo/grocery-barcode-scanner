import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeService } from '../services/barcode.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
  standalone: false
})
export class ScannerPage implements OnInit {
  // For manual barcode input (for testing purposes)
  manualBarcodeInput: string = '';
  isScanning: boolean = false;
  scanError: boolean = false;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private barcodeService: BarcodeService,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillLeave() {
    // Make sure to stop scanning when leaving the page
    if (this.platform.is('capacitor')) {
      BarcodeScanner.stopScan();
      document.querySelector('body')?.classList.remove('scanner-active');
    }
  }

  // Use test barcode from sample buttons
  useTestBarcode(barcode: string) {
    this.manualBarcodeInput = barcode;
    this.scanBarcode();
  }

  // This method initiates a barcode scan
  scanBarcode() {
    this.isScanning = true;
    
    if (this.manualBarcodeInput && this.manualBarcodeInput.trim() !== '') {
      // Use the service to simulate scanning with the manual input
      console.log('Using manual barcode input:', this.manualBarcodeInput);
      this.processBarcode(this.manualBarcodeInput);
    } else {
      // Use the service to scan using the camera
      console.log('Starting camera scan');
      this.barcodeService.scanBarcode().subscribe(
        (barcode) => {
          this.processBarcode(barcode);
        },
        (error) => {
          this.isScanning = false;
          this.scanError = true;
          this.errorMessage = 'Error scanning barcode: ' + error;
        }
      );
    }
  }

  // Process the scanned barcode
  private processBarcode(barcode: string) {
    console.log('Processing barcode:', barcode);
    this.isScanning = false;
    this.navigateToProductDetails(barcode);
  }

  // Method to cancel an ongoing scan
  cancelScan() {
    this.isScanning = false;
    // If using Capacitor, we need to cancel the native scan
    if (this.platform.is('capacitor')) {
      this.barcodeService.cancelScan();
    }
  }

  // Method to dismiss error alert
  dismissError() {
    this.scanError = false;
    this.errorMessage = '';
  }

  // Navigate to product details with the scanned barcode
  navigateToProductDetails(barcode: string) {
    this.router.navigate(['/product-details', barcode]);
  }

  // Go back to home page
  goBack() {
    this.router.navigate(['/home']);
  }
}
