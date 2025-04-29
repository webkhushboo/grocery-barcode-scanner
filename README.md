# Grocery Barcode Scanner App

A hybrid barcode scanner application for grocery stores built with Ionic and Angular. This app allows users to scan product barcodes and view product details.

## Features

- **Home Screen**: Simple interface with a prominent "Scan" button
- **Barcode Scanner**: Custom UI with camera integration for real barcode scanning
- **Product Details**: Displays product information based on the scanned barcode
- **Mock Product Database**: Includes sample product data for testing
- **Loading States**: Visual feedback during scanning and loading operations
- **Cross-platform Support**: Works on Web, Android, and iOS
- **Camera Integration**: Uses Capacitor Barcode Scanner for real barcode scanning
- **Sample QR Codes**: Includes links to generate QR codes for testing

## Project Structure

```
grocery-barcode-scanner/
├── src/
│   ├── app/
│   │   ├── home/                # Home page with scan button
│   │   ├── scanner/             # Barcode scanner page
│   │   ├── product-details/     # Product details page
│   │   ├── services/
│   │   │   └── barcode.service.ts  # Service for barcode scanning and product data
│   │   ├── app-routing.module.ts
│   │   ├── app.module.ts
│   │   └── ...
│   ├── assets/                  # Images and other static assets
│   │   └── barcodes/            # Sample barcode images
│   ├── environments/            # Environment configurations
│   └── ...
├── package.json
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v18.19.1 or higher)
- npm (v10.2.4 or higher)
- Ionic CLI

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   ionic serve
   ```

## Usage

1. Launch the app
2. Click the "Scan" button on the home page
3. Either scan a barcode using your device's camera or enter a barcode manually
   - For testing, you can enter one of these barcodes: 1234567890, 2345678901, 3456789012, 4567890123, 5678901234
4. View the product details

## Implementation Details

- **Capacitor Barcode Scanner**: The app uses the @capacitor-community/barcode-scanner plugin for real barcode scanning
- **Custom Scanner UI**: A custom UI is provided for barcode scanning with visual guides
- **Barcode Service**: A service that handles barcode scanning and product data retrieval
- **Mock Product Database**: Sample product data is included for testing purposes
- **Navigation**: Angular Router is used for navigation between pages
- **UI Components**: Ionic components are used for the user interface
- **Loading States**: Visual feedback is provided during scanning and loading operations
- **Platform Detection**: The app detects whether it's running on a native platform or in a browser and adapts accordingly

## Testing with Sample Barcodes

The app includes several sample barcodes for testing:

1. **Bananas**: 1234567890
2. **Bread**: 2345678901
3. **Milk**: 3456789012
4. **Rice**: 4567890123
5. **Chocolate**: 5678901234

You can either enter these barcodes manually or use a QR code generator to create scannable codes.

## QR Code Testing

The app provides links to online QR code generators where you can create QR codes containing the sample barcode numbers. To test:

1. Visit one of the QR code generator websites linked in the app
2. Create a QR code with one of the sample barcode numbers
3. Display the QR code on another device or print it
4. Use the app's scanner to scan the QR code

## Adding Platform Support

To add platform support for Android and iOS:

1. Build the app:
   ```
   ionic build
   ```

2. Add Capacitor platforms:
   ```
   ionic capacitor add android
   ionic capacitor add ios
   ```

3. Open in native IDE:
   ```
   ionic capacitor open android
   ionic capacitor open ios
   ```

## Future Enhancements

- Connect to a backend API to fetch real product data
- Add shopping cart functionality
- Implement user authentication
- Add barcode history feature
- Implement product search functionality
- Add offline support for scanning without internet connection

## License

This project is licensed under the MIT License.
