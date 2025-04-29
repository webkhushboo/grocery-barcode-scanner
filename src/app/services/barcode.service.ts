import { Injectable } from '@angular/core';
import { Observable, of, from, throwError } from 'rxjs';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Platform } from '@ionic/angular';

export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  manufacturer: string;
  weight: string;
  inStock: boolean;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  // Mock product database
  private products: { [key: string]: Product } = {
    '1234567890': {
      id: '1234567890',
      name: 'Organic Bananas',
      price: '₹89.99',
      description: 'Fresh organic bananas sourced from local farms. Rich in potassium and perfect for a healthy snack.',
      category: 'Fruits',
      manufacturer: 'Nature\'s Best',
      weight: '1kg',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '2345678901': {
      id: '2345678901',
      name: 'Whole Wheat Bread',
      price: '₹45.50',
      description: 'Freshly baked whole wheat bread made with 100% whole grain flour. No preservatives added.',
      category: 'Bakery',
      manufacturer: 'Healthy Bakers',
      weight: '400g',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '3456789012': {
      id: '3456789012',
      name: 'Milk - Full Fat',
      price: '₹60.00',
      description: 'Fresh full-fat milk from grass-fed cows. Rich in calcium and protein.',
      category: 'Dairy',
      manufacturer: 'Farm Fresh',
      weight: '1L',
      inStock: false,
      imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '4567890123': {
      id: '4567890123',
      name: 'Basmati Rice',
      price: '₹120.00',
      description: 'Premium long-grain basmati rice. Perfect for biryanis and pulao.',
      category: 'Grains',
      manufacturer: 'Indian Harvest',
      weight: '1kg',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '5678901234': {
      id: '5678901234',
      name: 'Dark Chocolate',
      price: '₹85.00',
      description: '72% cocoa dark chocolate. Rich in antioxidants and perfect for a sweet treat.',
      category: 'Confectionery',
      manufacturer: 'Choco Delights',
      weight: '100g',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '5901234123457': {
      id: '5901234123457',
      name: 'Premium Coffee',
      price: '₹250.00',
      description: 'Premium Arabica coffee beans, freshly roasted and ground. Rich aroma and smooth taste.',
      category: 'Beverages',
      manufacturer: 'Coffee Masters',
      weight: '250g',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '4011': {
      id: '4011',
      name: 'Fresh Apples',
      price: '₹120.00',
      description: 'Crisp and juicy apples from Himalayan orchards. Rich in fiber and antioxidants.',
      category: 'Fruits',
      manufacturer: 'Himalayan Farms',
      weight: '1kg',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '8901072000126': {
      id: '8901072000126',
      name: 'Masala Tea',
      price: '₹110.00',
      description: 'Premium Indian masala tea with a blend of exotic spices. Perfect for a refreshing cup of chai.',
      category: 'Beverages',
      manufacturer: 'Indian Tea Company',
      weight: '250g',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '7622210100146': {
      id: '7622210100146',
      name: 'Chocolate Cookies',
      price: '₹75.00',
      description: 'Crunchy chocolate cookies with real chocolate chips. Perfect for tea time.',
      category: 'Bakery',
      manufacturer: 'Sweet Delights',
      weight: '150g',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '12345678': {
      id: '12345678',
      name: 'Instant Noodles',
      price: '₹40.00',
      description: 'Quick and easy instant noodles with authentic spice mix. Ready in just 2 minutes.',
      category: 'Ready-to-eat',
      manufacturer: 'Quick Meals',
      weight: '75g',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '123456789012': {
      id: '123456789012',
      name: 'Olive Oil',
      price: '₹350.00',
      description: 'Extra virgin olive oil imported from Mediterranean olive groves. Cold pressed for maximum flavor.',
      category: 'Cooking Oils',
      manufacturer: 'Mediterranean Imports',
      weight: '500ml',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '1234': {
      id: '1234',
      name: 'Table Salt',
      price: '₹20.00',
      description: 'Iodized table salt for everyday cooking. Essential for all your culinary needs.',
      category: 'Spices',
      manufacturer: 'Kitchen Essentials',
      weight: '1kg',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1518110925495-b427fe0dd241?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    '9780201379624': {
      id: '9780201379624',
      name: 'Programming Book',
      price: '₹599.00',
      description: 'Comprehensive guide to modern programming techniques. Perfect for beginners and advanced programmers.',
      category: 'Books',
      manufacturer: 'Tech Publications',
      weight: '800g',
      inStock: true,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  };

  constructor(private platform: Platform) { }

  /**
   * Scan barcode using either manual input or device camera
   * @param barcode Optional barcode to simulate scanning
   * @returns Observable of the scanned barcode
   */
  scanBarcode(barcode?: string): Observable<string> {
    if (barcode && barcode.trim() !== '') {
      return of(barcode);
    }

    if (this.platform.is('capacitor')) {
      return this.startNativeScan();
    }

    // For browser testing, use the BarcodeDetector API if available
    if ('BarcodeDetector' in window) {
      return this.startBrowserScan();
    }

    // If no camera access or BarcodeDetector not available
    alert('Your browser does not support barcode scanning. Please use the sample barcodes below or enter a barcode manually.');
    return throwError('Barcode scanning not supported in this browser');
  }

  /**
   * Cancel an ongoing scan (used when user cancels a scan)
   */
  cancelScan(): void {
    if (this.platform.is('capacitor')) {
      // Cancel the native Capacitor scan
      BarcodeScanner.stopScan();
    }
    // For browser scans, the cancellation is handled in the component
  }

  /**
   * Start browser-based barcode scanning using the BarcodeDetector API
   * @returns Observable of the scanned barcode
   */
  private startBrowserScan(): Observable<string> {
    return from(this.scanWithBrowserAPI());
  }

  /**
   * Scan barcode using the browser's BarcodeDetector API
   * @returns Promise of the scanned barcode
   */
  private async scanWithBrowserAPI(): Promise<string> {
    try {
      // @ts-ignore - BarcodeDetector might not be recognized by TypeScript
      const barcodeDetector = new BarcodeDetector({
        formats: ['qr_code', 'ean_13', 'ean_8', 'code_39', 'code_128', 'data_matrix', 'aztec', 'itf', 'upc_a', 'upc_e']
      });

      // Create a video element for the camera stream
      const video = document.createElement('video');
      video.style.position = 'fixed';
      video.style.top = '0';
      video.style.left = '0';
      video.style.width = '100%';
      video.style.height = '100%';
      video.style.objectFit = 'cover';
      video.style.zIndex = '1000';
      document.body.appendChild(video);

      // Add a cancel button
      const cancelBtn = document.createElement('button');
      cancelBtn.innerText = 'Cancel';
      cancelBtn.style.position = 'fixed';
      cancelBtn.style.bottom = '20px';
      cancelBtn.style.left = '50%';
      cancelBtn.style.transform = 'translateX(-50%)';
      cancelBtn.style.zIndex = '1001';
      cancelBtn.style.padding = '10px 20px';
      cancelBtn.style.backgroundColor = '#ff4545';
      cancelBtn.style.color = 'white';
      cancelBtn.style.border = 'none';
      cancelBtn.style.borderRadius = '5px';
      document.body.appendChild(cancelBtn);

      // Get camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      video.srcObject = stream;
      await video.play();

      // Create a promise that will resolve when a barcode is detected or rejected when canceled
      return new Promise<string>((resolve, reject) => {
        let scanning = true;

        // Cancel button event listener
        cancelBtn.addEventListener('click', () => {
          scanning = false;
          cleanup();
          reject(new Error('Scanning canceled'));
        });

        // Function to clean up resources
        const cleanup = () => {
          if (video.srcObject) {
            const tracks = (video.srcObject as MediaStream).getTracks();
            tracks.forEach(track => track.stop());
          }
          video.remove();
          cancelBtn.remove();
        };

        // Detect barcodes every 100ms
        const scanInterval = setInterval(async () => {
          if (!scanning) {
            clearInterval(scanInterval);
            return;
          }

          try {
            const barcodes = await barcodeDetector.detect(video);
            if (barcodes.length > 0) {
              const barcode = barcodes[0].rawValue;
              console.log('Barcode detected:', barcode);
              
              clearInterval(scanInterval);
              scanning = false;
              cleanup();
              resolve(barcode);
            }
          } catch (error) {
            console.error('Barcode detection error:', error);
          }
        }, 100);
      });
    } catch (error) {
      console.error('Browser barcode scanning error:', error);
      throw new Error('Browser does not support barcode scanning');
    }
  }

  /**
   * Start native barcode scanning using Capacitor
   * @returns Observable of the scanned barcode
   */
  private startNativeScan(): Observable<string> {
    return from(this.startScan());
  }

  /**
   * Start the native barcode scanner
   * @returns Promise of the scanned barcode
   */
  private async startScan(): Promise<string> {
    // Check camera permission
    const status = await BarcodeScanner.checkPermission({ force: true });
    
    if (status.granted) {
      // Make background transparent to show camera preview
      document.querySelector('body')?.classList.add('scanner-active');
      
      // Start scanning
      const result = await BarcodeScanner.startScan();
      
      // Reset background
      document.querySelector('body')?.classList.remove('scanner-active');
      
      if (result.hasContent) {
        return result.content;
      } else {
        throw new Error('No barcode detected');
      }
    } else {
      throw new Error('Camera permission not granted');
    }
  }

  /**
   * Get product details by barcode
   * @param barcode The product barcode
   * @returns Observable of the product details or undefined if not found
   */
  getProductByBarcode(barcode: string): Observable<Product | undefined> {
    // If the product exists in our mock database, return it
    if (this.products[barcode]) {
      return of(this.products[barcode]);
    }
    
    // If the product doesn't exist, return a default product with the barcode as ID
    return of({
      id: barcode,
      name: 'Unknown Product',
      price: '₹0.00',
      description: 'Product not found in database. In a real app, this would be fetched from a database or API based on the scanned barcode.',
      category: 'Unknown',
      manufacturer: 'Unknown',
      weight: 'Unknown',
      inStock: false,
      imageUrl: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    });
  }
}
