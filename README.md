# Dropdown Menu Component

A lightweight, vanilla JavaScript dropdown menu component with no dependencies. Perfect for modern web applications that need interactive dropdown functionality.

## Features

- 🚀 **Zero Dependencies** - Pure vanilla JavaScript
- 🎯 **Auto-initialization** - Automatically finds and initializes all dropdowns on page load
- 🖱️ **Click Outside to Close** - Intuitive UX behavior
- ⌨️ **Keyboard Support** - Escape key to close
- 📱 **Mobile Friendly** - Touch-friendly interactions
- 🎨 **Customizable** - Easy to style with CSS
- 🔧 **Event System** - Custom events for integration
- 🏗️ **Multiple Instances** - Support for multiple dropdowns on the same page

## Installation

```bash
npm install @mfotoni/dropdown-menu
```

## Quick Start

### 1. Include the Files

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="node_modules/@mfotoni/dropdown-menu/style.css"
    />
  </head>
  <body>
    <div class="dropdown">
      <button class="dropdown-button">Choose Option</button>
      <div class="dropdown-menu">
        <a href="#" class="dropdown-item" data-value="option1">Option 1</a>
        <a href="#" class="dropdown-item" data-value="option2">Option 2</a>
        <a href="#" class="dropdown-item" data-value="option3">Option 3</a>
      </div>
    </div>

    <script src="node_modules/@mfotoni/dropdown-menu/index.js"></script>
  </body>
</html>
```

### 2. That's It!

The dropdown will automatically initialize and work out of the box. No additional JavaScript needed!

## HTML Structure

```html
<div class="dropdown">
  <button class="dropdown-button">Button Text</button>
  <div class="dropdown-menu">
    <a href="#" class="dropdown-item" data-value="value1">Item 1</a>
    <a href="#" class="dropdown-item" data-value="value2">Item 2</a>
    <a href="#" class="dropdown-item" data-value="value3">Item 3</a>
  </div>
</div>
```

## CSS Classes

- `.dropdown` - Container element
- `.dropdown-button` - The clickable button
- `.dropdown-menu` - The menu container (hidden by default)
- `.dropdown-item` - Individual menu items
- `.dropdown.open` - Added to container when menu is open

## JavaScript API

### Auto-initialization

All dropdowns are automatically initialized when the page loads:

```javascript
// This happens automatically
document.addEventListener("DOMContentLoaded", () => {
  Dropdown.initializeAll();
});
```

### Manual Initialization

```javascript
// Initialize a specific dropdown
const dropdown = new Dropdown("#my-dropdown");

// Initialize with options
const dropdown = new Dropdown("#my-dropdown", {
  closeOnSelect: true,
  closeOnClickOutside: true,
});
```

### Methods

```javascript
// Get dropdown instance
const dropdown = document.querySelector("#my-dropdown").dropdownInstance;

// Open dropdown
dropdown.open();

// Close dropdown
dropdown.close();

// Toggle dropdown
dropdown.toggle();

// Set value programmatically
dropdown.setValue("option2");

// Get current value
const value = dropdown.getValue();

// Destroy dropdown
dropdown.destroy();
```

### Events

Listen for custom events:

```javascript
// Listen for all dropdown events
document.addEventListener("dropdown:select", (event) => {
  console.log("Item selected:", event.detail);
  // event.detail contains: { text, value, index, element, dropdown }
});

document.addEventListener("dropdown:open", (event) => {
  console.log("Dropdown opened:", event.detail.dropdown);
});

document.addEventListener("dropdown:close", (event) => {
  console.log("Dropdown closed:", event.detail.dropdown);
});
```

## Configuration Options

```javascript
const dropdown = new Dropdown(element, {
  closeOnSelect: true, // Close when item is selected
  closeOnClickOutside: true, // Close when clicking outside
  closeOnEscape: true, // Close when pressing Escape key
});
```

## Styling

The component comes with minimal CSS. You can customize the appearance:

```css
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  display: none;
}

.dropdown.open .dropdown-menu {
  display: block;
}

.dropdown-item {
  display: block;
  padding: 10px 15px;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #eee;
}

.dropdown-item:hover {
  background: #f5f5f5;
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Issues

If you find any issues, please report them on [GitHub Issues](https://github.com/mfotoni/dropdown-menu/issues).

## Changelog

### 1.0.0

- Initial release
- Basic dropdown functionality
- Auto-initialization
- Event system
- Multiple instances support
