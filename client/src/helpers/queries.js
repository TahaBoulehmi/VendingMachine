export const HOST = 'http://localhost:1337'
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
export const endpoints = {
  signin: { api: HOST + '/signin', method: 'PUT', headers: HEADERS },
  signup: { api: HOST + '/signup', method: 'POST', headers: HEADERS },
  signout: { api: HOST + '/signout', method: 'PUT', headers: HEADERS },
  fetchProducts: { api: HOST + '/products', method: 'GET', headers: HEADERS },
  createProducts: { api: HOST + '/products', method: 'POST', headers: HEADERS },
  updateProduct: { api: HOST + '/products', method: 'PUT', headers: HEADERS },
  deleteProducts: { api: HOST + '/products', method: 'DELETE', headers: HEADERS },
  buyProducts: { api: HOST + '/buy', method: 'POST', headers: HEADERS },
  deposit: { api: HOST + '/deposit', method: 'POST', headers: HEADERS },
  reset: { api: HOST + '/reset', method: 'POST', headers: HEADERS },
  authenticate: { api: '/authenticate' },
}

// AUTHENTICATION
export const signin = (username, password) => {
  return fetch(endpoints.signin.api, {
    method: endpoints.signin.method,
    headers: endpoints.signin.headers,
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })
}

export const signup = (username, password, role) => {
  return fetch(endpoints.signup.api, {
    method: endpoints.signup.method,
    headers: endpoints.signup.headers,
    credentials: 'include',
    body: JSON.stringify({ username, password, role }),
  })
}

export const signout = () => {
  return fetch(endpoints.signout.api, {
    method: endpoints.signout.method,
    headers: endpoints.signout.headers,
    credentials: 'include',
  })
}

// PRODUCTS
export const fetchProducts = sellerId => {
  return fetch(`${endpoints.fetchProducts.api}?sellerId=${sellerId}`, {
    method: endpoints.fetchProducts.method,
    headers: endpoints.fetchProducts.headers,
    credentials: 'include',
  })
}

export const createProducts = (name, cost, amountAvailable) => {
  return fetch(endpoints.createProducts.api, {
    method: endpoints.createProducts.method,
    headers: endpoints.createProducts.headers,
    credentials: 'include',
    body: JSON.stringify({ name, cost, amountAvailable }),
  })
}

export const updateProduct = (productId, name, cost, amountAvailable) => {
  return fetch(endpoints.updateProduct.api, {
    method: endpoints.updateProduct.method,
    headers: endpoints.updateProduct.headers,
    credentials: 'include',
    body: JSON.stringify({ productId, name, cost, amountAvailable }),
  })
}

export const deleteProducts = productId => {
  return fetch(endpoints.deleteProducts.api, {
    method: endpoints.deleteProducts.method,
    headers: endpoints.deleteProducts.headers,
    credentials: 'include',
    body: JSON.stringify({ productId }),
  })
}

export const buyProducts = (productId, amount) => {
  return fetch(endpoints.buyProducts.api, {
    method: endpoints.buyProducts.method,
    headers: endpoints.buyProducts.headers,
    credentials: 'include',
    body: JSON.stringify({ productId, amount }),
  })
}

// MONEY
export const deposit = deposit => {
  console.log(deposit)
  return fetch(endpoints.deposit.api, {
    method: endpoints.deposit.method,
    headers: endpoints.deposit.headers,
    credentials: 'include',
    body: JSON.stringify({ deposit }),
  })
}

export const reset = () => {
  return fetch(endpoints.reset.api, {
    method: endpoints.reset.method,
    headers: endpoints.reset.headers,
    credentials: 'include',
  })
}
