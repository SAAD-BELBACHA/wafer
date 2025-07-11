# Wafer Test Manager

A modern web application for managing wafer testing data. Built with React and Vite, featuring a beautiful UI for adding and removing test entries with date, number of wafers, quality manager, type of test, and size information.

## Features

- ✅ Add new wafer test entries
- ✅ Remove existing entries
- ✅ Track all required fields: date, number of wafers, quality manager, type of test, and size
- ✅ Beautiful, modern UI with responsive design
- ✅ Local storage persistence
- ✅ Statistics dashboard
- ✅ Form validation
- ✅ Mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## Usage

### Adding Entries

1. Fill in all the required fields in the "Add New Entry" form:
   - **Date**: Select the test date
   - **Number of Wafers**: Enter the quantity of wafers tested
   - **Quality Manager**: Enter the name of the quality manager
   - **Type of Test**: Select from predefined test types (Electrical, Optical, Mechanical, etc.)
   - **Size**: Select the wafer size (2 inch, 3 inch, 4 inch, etc.)

2. Click "Add Entry" to save the entry

### Removing Entries

- Click the trash icon next to any entry in the table to delete it
- Confirm the deletion when prompted

### Data Persistence

All data is automatically saved to your browser's local storage, so your entries will persist between sessions.

## Features Overview

### Statistics Dashboard
- Total number of entries
- Total number of wafers across all entries
- Number of unique quality managers

### Form Validation
- All fields are required
- Number of wafers must be at least 1
- Date must be selected
- Quality manager name must be provided

### Responsive Design
- Works seamlessly on desktop, tablet, and mobile devices
- Optimized layout for different screen sizes

## Technology Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons
- **CSS3** - Modern styling with gradients and animations
- **Local Storage** - Client-side data persistence

## Project Structure

```
wafer-test-manager/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Customization

### Adding New Test Types
Edit the `typeOfTest` select options in `src/App.jsx` to add more test types.

### Adding New Wafer Sizes
Edit the `size` select options in `src/App.jsx` to add more wafer sizes.

### Styling
Modify `src/index.css` to customize the appearance of the application.

## License

This project is open source and available under the MIT License.