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

export const addProducts = (name, cost, amountAvailable) => {
  return fetch(endpoints.addProducts.api, {
    method: endpoints.addProducts.method,
    headers: endpoints.addProducts.headers,
    credentials: 'include',
    body: JSON.stringify({ name, cost, amountAvailable }),
  })
}

export const editProducts = (productId, name, cost, amountAvailable) => {
  return fetch(endpoints.editProducts.api, {
    method: endpoints.editProducts.method,
    headers: endpoints.editProducts.headers,
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
