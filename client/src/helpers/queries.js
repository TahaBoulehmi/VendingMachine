const HOST = 'http://localhost:1337'
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}
const endpoints = {
  signin: { api: HOST + '/signin', method: 'POST', headers: HEADERS },
  signup: { api: HOST + '/signup', method: 'POST', headers: HEADERS },
  signout: { api: HOST + '/signout', method: 'POST', headers: HEADERS },
  fetchProducts: { api: HOST + '/products', method: 'GET', headers: HEADERS },
  addProducts: { api: HOST + '/products', method: 'POST', headers: HEADERS },
  editProducts: { api: HOST + '/products', method: 'PUT', headers: HEADERS },
  deleteProducts: { api: HOST + '/products', method: 'DELETE', headers: HEADERS },
  deposit: { api: HOST + '/deposit', method: 'POST', headers: HEADERS },
  reset: { api: HOST + '/reset', method: 'POST', headers: HEADERS },
}

// AUTHENTICATION
export const signin = async (username, password) => {
  const res = await fetch(endpoints.signin.api, {
    method: endpoints.signin.method,
    headers: endpoints.signin.headers,
    body: JSON.stringify({ username, password }),
  })
  return res.json()
}

export const signup = async (username, password, role) => {
  const res = await fetch(endpoints.signup.api, {
    method: endpoints.signup.method,
    headers: endpoints.signup.headers,
    body: JSON.stringify({ username, password, role }),
  })
  return res.json()
}

export const signout = async () => {
  const res = await fetch(endpoints.signout.api, {
    method: endpoints.signout.method,
    headers: endpoints.signout.headers,
  })
  return res.json()
}

// PRODUCTS
export const fetchProducts = async sellerId => {
  const res = await fetch(`${endpoints.fetchProducts.api}?sellerId=${sellerId}`, {
    method: endpoints.fetchProducts.method,
    headers: endpoints.fetchProducts.headers,
  })
  return res.json()
}

export const addProducts = async (name, cost, amountAvailable) => {
  const res = await fetch(endpoints.addProducts.api, {
    method: endpoints.addProducts.method,
    headers: endpoints.addProducts.headers,
    body: JSON.stringify({ name, cost, amountAvailable }),
  })
  return res.json()
}

export const editProducts = async (productId, name, cost, amountAvailable) => {
  const res = await fetch(endpoints.editProducts.api, {
    method: endpoints.editProducts.method,
    headers: endpoints.editProducts.headers,
    body: JSON.stringify({ productId, name, cost, amountAvailable }),
  })
  return res.json()
}

export const deleteProducts = async productId => {
  const res = await fetch(endpoints.deleteProducts.api, {
    method: endpoints.deleteProducts.method,
    headers: endpoints.deleteProducts.headers,
    body: JSON.stringify({ productId }),
  })
  return res.json()
}

// MONEY
export const deposit = async amount => {
  const res = await fetch(endpoints.deposit.api, {
    method: endpoints.deposit.method,
    headers: endpoints.deposit.headers,
    body: JSON.stringify({ deposit }),
  })
  return res.json()
}

export const reset = async () => {
  const res = await fetch(endpoints.reset.api, {
    method: endpoints.reset.method,
    headers: endpoints.reset.headers,
  })
  return res.json()
}
