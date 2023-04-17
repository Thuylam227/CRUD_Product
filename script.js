class Product {
    constructor(id, name, price, detail, color) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.detail = detail;
      this.color = color;
    }
  }
  class App {
    constructor() {
      this.products = [
        new Product(1, 'Product 1', 100, 'Detail of Product 1', 'Red'),
        new Product(2, 'Product 2', 200, 'Detail of Product 2', 'Green')
      ];
      this.renderProducts();
    }
  
    renderProducts() {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';
  
      for (let product of this.products) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.detail}</td>
          <td>${product.color}</td>
          <td>
            <button class="btn-edit" data-id="${product.id}">Edit</button>
            <button class="btn-delete" data-id="${product.id}">Delete</button>
          </td>
        `;
        productList.appendChild(tr);
      }
  
      const editButtons = document.getElementsByClassName('btn-edit');
      for (let button of editButtons) {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          this.editProduct(id);
        });
      }
  
      const deleteButtons = document.getElementsByClassName('btn-delete');
      for (let button of deleteButtons) {
        button.addEventListener('click', () => {
          const id = button.getAttribute('data-id');
          this.deleteProduct(id);
        });
      }
    }
  
    addProduct() {
      const name = document.getElementById('name').value;
      const price = document.getElementById('price').value;
      const detail = document.getElementById('detail').value;
      const color = document.getElementById('color').value;
  
      const id = this.products.length + 1;
      const product = new Product(id, name, price, detail, color);
  
      this.products.push(product);
      this.renderProducts();
      this.resetForm();
    }
  
    editProduct(id) {
      const product = this.products.find((p) => p.id == id);
      if (!product) return;
  
      document.getElementById('name').value = product.name;
      document.getElementById('price').value = product.price;
      document.getElementById('detail').value = product.detail;
      document.getElementById('color').value = product.color;
  
      document.getElementById('submit').innerText = 'Update';
      document.getElementById('submit').setAttribute('data-id', id);
    }
  
    updateProduct(id) {
      const product = this.products.find((p) => p.id == id);
      if (!product) return;
  
      product.name = document.getElementById('name').value;
      product.price = document.getElementById('price').value;
      product.detail = document.getElementById('detail').value;
      product.color = document.getElementById('color').value;
  
      this.renderProducts();
      this.resetForm();
    }
  
    deleteProduct(id) {
      const productIndex = this.products.findIndex((p) => p.id == id);
      if (productIndex == -1) return;
  
      const confirmed = confirm('Are you sure you want to delete this product?');
      if (!confirmed) return;
  
      this.products.splice(productIndex, 1);
      this.renderProducts();
    }
  
    resetForm() {
      document.getElementById('name').value = '';
      document.getElementById('price').value = '';
      document.getElementById('detail').value = '';
      document.getElementById('color').value = '';
      document.getElementById('submit').innerText = 'Add';
      document.getElementById('submit').setAttribute('data-id', '');
    }
}
const app = new App();

document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault();

  const id = document.getElementById('submit').getAttribute('data-id');
  if (id) {
    app.updateProduct(id);
  } else {
    app.addProduct();
  }
});