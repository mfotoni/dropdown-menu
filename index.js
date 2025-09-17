class Dropdown {
  constructor(element, options = {}) {
    this.container =
      typeof element === "string" ? document.getElementById(element) : element;

    if (!this.container) {
      console.error(`Dropdown: elemento não encontrado: ${element}`);
      return false;
    }

    this.button = this.container.querySelector(".dropdown-button");
    this.menu = this.container.querySelector(".dropdown-menu");
    this.items = this.container.querySelectorAll(".dropdown-item");

    // optional settings for future funcionalities
    this.options = {
      closeOnSelect: true,
      closeOnClickOutside: true,
      ...options,
    };

    // dropdown internal state
    this.isOpen = false;
    this.selectedValue = null;
    this.selectedText = null;

    // init all event listeners
    this.initializeEvents();

    Dropdown.instances.push(this);
  }

  initializeEvents() {
    this.button.addEventListener("click", (event) => {
      event.stopPropagation();
      this.toggle();
    });

    this.items.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.selectItem(item, index);
      });
    });

    if (this.options.closeOnClickOutside) {
      this.outsideClickHandler = (e) => {
        if (!this.container.contains(e.target)) {
          this.close();
        }
      };
      document.addEventListener("click", this.outsideClickHandler);
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    Dropdown.closeAll();
    this.container.classList.add("open");
    this.isOpen = true;

    this.dispatchEvent("open");
  }

  close() {
    this.container.classList.remove("open");
    this.isOpen = false;

    this.dispatchEvent("close");
  }

  selectItem(item, index) {
    const text = item.textContent.trim();
    const value = item.getAttribute("data-value") || text;

    this.selectedText = text;
    this.selectedValue = value;

    this.button.textContent = text;

    if (this.options.closeOnSelect) {
      this.close();
    }

    this.dispatchEvent("select", {
      text: text,
      value: value,
      index: index,
      element: item,
    });
  }

  dispatchEvent(eventName, detail = {}) {
    const customEvent = new CustomEvent(`dropdown:${eventName}`, {
      detail: {
        dropdown: this,
        ...detail,
      },
    });
    this.container.dispatchEvent(customEvent);
  }

  setValue(value) {
    const item = this.container.querySelector(`[data-value="${value}"]`);
    if (item) {
      const index = Array.from(this.items).indexOf(item);
      this.selectItem(item, index);
    } else {
      console.warn(`Dropdown: valor não encontrado: ${value}`);
    }
  }

  getValue() {
    return this.selectedValue;
  }

  // remove global event listeners
  destroy() {
    if (this.outsideClickHandler) {
      document.removeEventListener("click", this.outsideClickHandler);
    }

    const index = Dropdown.instances.indexOf(this);
    if (index > -1) {
      Dropdown.instances.splice(index, 1);
    }

    console.log(`dropdown destruido: ${this.container.id || "sem ID"}`);
  }

  // static method to close all dropdowns
  static closeAll() {
    Dropdown.instances.forEach((dropdown) => {
      if (dropdown.isOpen) {
        dropdown.close();
      }
    });
  }

  // static method to initialize all dropdowns in the page
  static initializeAll() {
    const dropdownElements = document.querySelectorAll(".dropdown");
    dropdownElements.forEach((element) => {
      if (!element.dropdownInstance) {
        const dropdown = new Dropdown(element);
        element.dropdownInstance = dropdown;
      }
    });
  }
}

// static list to mainten reference to all instances
Dropdown.instances = [];

document.addEventListener("DOMContentLoaded", () => {
  Dropdown.initializeAll();
});

// if (document.readyState === "loading") {
//   document.addEventListener("DOMContentLoaded", Dropdown.initializeAll);
// }
