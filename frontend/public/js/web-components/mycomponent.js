'use strict';

// SOURCES
// https://kinsta.com/blog/web-components/

class DataTable extends HTMLElement {
  // It’s called when the component is first initialized. It must call super() and can set any defaults or perform other pre-rendering processes.
  constructor() {
    super();

    this.date = '2024';

    this.api = async function (url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };
  }

  // Returns an array of attributes that the browser will observe.
  static get observedAttributes() {
    return ['date'];
  }

  // Called whenever an observed attribute is changed. Those defined in HTML are passed immediately, but JavaScript can modify them:
  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;

    const url = `http://127.0.0.1:8000/date/${this.date}`;
    this.api(url).then((d) => {
      console.log(this.date);
      console.log(d);
      this.textContent = `${d}`;
    });
  }

  // This function is called when the Web Component is appended to a Document Object Model. It should run any required rendering.
  connectedCallback() {
    this.textContent = `Year is ${this.date}!`;
    // my callbacks
    const url = `http://127.0.0.1:8000`;
    this.api(url).then((d) => console.log(d));
  }

  // It’s called when the Web Component is removed from a Document Object Model. This may be useful if you need to clean up, such as removing stored state or aborting Ajax requests.
  disconnectedCallback() {}
}

customElements.define('data-table', DataTable);
