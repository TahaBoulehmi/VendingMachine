const HOST = 'http://localhost:1337'
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
const endpoints = {
  signin: { api: HOST + '/signin', method: 'PUT', headers: HEADERS },
  signup: { api: HOST + '/signup', method: 'POST', headers: HEADERS },
  signout: { api: HOST + '/signout', method: 'PUT', headers: HEADERS },
  fetchProducts: { api: HOST + '/products', method: 'GET', headers: HEADERS },
  addProducts: { api: HOST + '/products', method: 'POST', headers: HEADERS },
  editProducts: { api: HOST + '/products', method: 'PUT', headers: HEADERS },
  deleteProducts: { api: HOST + '/products', method: 'DELETE', headers: HEADERS },
  deposit: { api: HOST + '/deposit', method: 'POST', headers: HEADERS },
  reset: { api: HOST + '/reset', method: 'POST', headers: HEADERS },
}

// AUTHENTICATION
export const signin = (username, password) => {
  return fetch(endpoints.signin.api, {
    method: endpoints.signin.method,
    headers: endpoints.signin.headers,
    body: JSON.stringify({ username, password }),
  })
}

export const signup = (username, password, role) => {
  return fetch(endpoints.signup.api, {
    method: endpoints.signup.method,
    headers: endpoints.signup.headers,
    body: JSON.stringify({ username, password, role }),
  })
}

export const signout = async () => {
  return fetch(endpoints.signout.api, {
    method: endpoints.signout.method,
    headers: endpoints.signout.headers,
  })
}

// PRODUCTS
export const fetchProducts = async sellerId => {
  return fetch(`${endpoints.fetchProducts.api}?sellerId=${sellerId}`, {
    method: endpoints.fetchProducts.method,
    headers: endpoints.fetchProducts.headers,
  })
}

export const addProducts = async (name, cost, amountAvailable) => {
  return fetch(endpoints.addProducts.api, {
    method: endpoints.addProducts.method,
    headers: endpoints.addProducts.headers,
    body: JSON.stringify({ name, cost, amountAvailable }),
  })
}

export const editProducts = async (productId, name, cost, amountAvailable) => {
  return fetch(endpoints.editProducts.api, {
    method: endpoints.editProducts.method,
    headers: endpoints.editProducts.headers,
    body: JSON.stringify({ productId, name, cost, amountAvailable }),
  })
}

export const deleteProducts = async productId => {
  return fetch(endpoints.deleteProducts.api, {
    method: endpoints.deleteProducts.method,
    headers: endpoints.deleteProducts.headers,
    body: JSON.stringify({ productId }),
  })
}

// MONEY
export const deposit = async amount => {
  return fetch(endpoints.deposit.api, {
    method: endpoints.deposit.method,
    headers: endpoints.deposit.headers,
    body: JSON.stringify({ deposit }),
  })
}

export const reset = async () => {
  return fetch(endpoints.reset.api, {
    method: endpoints.reset.method,
    headers: endpoints.reset.headers,
  })
}
