let token = null;
let role = null;

const productList = document.getElementById('products');
const reviewList = document.getElementById('reviews');
const productSelect = document.getElementById('productSelect');

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');
const productForm = document.getElementById('productForm');
const reviewForm = document.getElementById('reviewForm');


registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const selectedRole = document.getElementById('regRole').value;

  try {
    const res = await fetch('/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: selectedRole })
    });

    const data = await res.json();

    if (res.ok) {
      token = data.token;
      role = data.role;
      alert('Registration successful! You are logged in as ' + role);
      registerForm.reset();
      loadProducts();
      loadReviews();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Registration failed');
  }
});

loginForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await fetch('/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      token = data.token;
      role = data.role;
      alert('Login successful! Role: ' + role);
      loginForm.reset();
      loadProducts();
      loadReviews();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
});

async function loadProducts() {
  const res = await fetch('/products');
  const products = await res.json();

  productList.innerHTML = '';
  productSelect.innerHTML = '<option value="">Select Product</option>';

  products.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p._id} | ${p.name} - $${p.price} (${p.category})`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', async () => {
      if (!token || role !== 'admin') return alert('Admin login required to delete product');
      await fetch('/products/' + p._id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      loadProducts();
    });

    const updBtn = document.createElement('button');
    updBtn.textContent = 'Update';
    updBtn.style.marginLeft = '5px';
    updBtn.addEventListener('click', async () => {
      if (!token || role !== 'admin') return alert('Admin login required to update product');
      const newName = prompt('Enter new name:', p.name);
      const newPrice = prompt('Enter new price:', p.price);
      const newCategory = prompt('Enter new category:', p.category);
      if (!newName || !newPrice || !newCategory) return;
      await fetch('/products/' + p._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ name: newName, price: Number(newPrice), category: newCategory })
      });
      loadProducts();
    });

    li.appendChild(delBtn);
    li.appendChild(updBtn);
    productList.appendChild(li);

    const option = document.createElement('option');
    option.value = p._id;
    option.textContent = p.name;
    productSelect.appendChild(option);
  });
}

productForm.addEventListener('submit', async e => {
  e.preventDefault();
  if (!token || role !== 'admin') return alert('Admin login required to add product');
  const name = document.getElementById('name').value;
  const price = Number(document.getElementById('price').value);
  const category = document.getElementById('category').value;

  await fetch('/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ name, price, category })
  });

  productForm.reset();
  loadProducts();
});

async function loadReviews() {
  const res = await fetch('/reviews');
  const reviews = await res.json();

  reviewList.innerHTML = '';
  reviews.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `Product: ${r.productId.name} | Rating: ${r.rating} | ${r.text}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.marginLeft = '10px';
    delBtn.addEventListener('click', async () => {
      if (!token || role !== 'admin') return alert('Admin login required to delete review');
      await fetch('/reviews/' + r._id, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      loadReviews();
    });

    const updBtn = document.createElement('button');
    updBtn.textContent = 'Update';
    updBtn.style.marginLeft = '5px';
    updBtn.addEventListener('click', async () => {
      if (!token || role !== 'admin') return alert('Admin login required to update review');
      const newText = prompt('Enter new review text:', r.text);
      const newRating = prompt('Enter new rating:', r.rating);
      if (!newText || !newRating) return;
      await fetch('/reviews/' + r._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ text: newText, rating: Number(newRating) })
      });
      loadReviews();
    });

    li.appendChild(delBtn);
    li.appendChild(updBtn);
    reviewList.appendChild(li);
  });
}

reviewForm.addEventListener('submit', async e => {
  e.preventDefault();
  if (!token || role !== 'admin') return alert('Admin login required to add review');
  const productId = productSelect.value;
  const text = document.getElementById('text').value;
  const rating = Number(document.getElementById('rating').value);
  if (!productId) return alert('Select a product first!');

  await fetch('/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ productId, text, rating })
  });

  reviewForm.reset();
  loadReviews();
});

loadProducts();
loadReviews();
