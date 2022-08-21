import { useContext, useEffect } from 'react'
import { PencilAltIcon, TrashIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { UserContext } from '../contexts/UserContext'
import productImage from '../assets/product.png'
import { Show } from '../helpers/Conditionals'
import useQuery from '../helpers/useQuery'
import { deleteProducts, fetchProducts } from '../helpers/queries'

// const products = [
//   {
//     id: 112,
//     name: 'Tshirt Medium',
//     amountAvailable: 24,
//     cost: 95,
//   },
//   {
//     id: 113,
//     name: 'Tshirt Mediumn 2',
//     amountAvailable: 2,
//     cost: 10,
//   },
//   {
//     id: 114,
//     name: ' Medium',
//     amountAvailable: 214,
//     cost: 90,
//   },
// ]

export default function Products(props) {
  const { user } = useContext(UserContext)
  const { isError, isRunningQuery, isQuerySuccessful, runQuery, data: products } = useQuery()

  const { runQuery: deleteProductQuery } = useQuery()

  useEffect(() => {
    runQuery(() => fetchProducts())
  }, [])

  const deleteProduct = productId => {
    deleteProductQuery(() => deleteProducts(productId))
    products.filter(product => product.id !== productId)
  }
  return (
    <>
      <Show when={isRunningQuery}>Loading Data</Show>
      <Show when={isError}>Error Fetching Data</Show>
      <Show when={isQuerySuccessful && products.length === 0}>0 Products to display</Show>
      <Show when={isQuerySuccessful && products.length > 0}>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products &&
            products
              .filter(product => product.name.includes(props.search))
              .map(product => (
                <li
                  key={product.id}
                  className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                  <div className="flex-1 flex flex-col p-8">
                    <Show when={user?.role === 0}>
                      <div className="relative w-full">
                        <div className="absolute -left-4 -top-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <select
                            id="quantity"
                            name="quantity"
                            className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {[...Array(Math.min(8, product.amountAvailable))].map((x, i) => (
                              <option value={i + 1} key={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </Show>
                    <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={productImage} alt="" />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">{product.name}</h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="text-gray-500 text-sm">Amount Available: {product.amountAvailable}</dd>
                      <dt className="sr-only">Cost</dt>
                      <dd className="mt-3">
                        <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                          {product.cost}$
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <Show when={user?.role === 0}>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="-ml-px w-0 flex-1 flex">
                          <a
                            href={() => false}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-green-700 font-medium border border-transparent rounded-br-lg hover:text-green-500 cursor-pointer"
                          >
                            <ShoppingCartIcon className="w-5 h-5 text-green-400" aria-hidden="true" />
                            <span className="ml-3">Buy</span>
                          </a>
                        </div>
                      </div>
                    </Show>
                    <Show when={user?.role === 1}>
                      <div className="-mt-px flex divide-x divide-gray-200">
                        <div className="w-0 flex-1 flex">
                          <a
                            href={() => false}
                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 cursor-pointer"
                          >
                            <PencilAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                            <span className="ml-3">Edit</span>
                          </a>
                        </div>
                        <div className="-ml-px w-0 flex-1 flex">
                          <a
                            href={() => false}
                            onClick={e => {
                              e.preventDefault()
                              deleteProduct(product.id)
                            }}
                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-red-700 font-medium border border-transparent rounded-br-lg hover:text-red-500 cursor-pointer"
                          >
                            <TrashIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
                            <span className="ml-3">Delete</span>
                          </a>
                        </div>
                      </div>
                    </Show>
                  </div>
                </li>
              ))}
        </ul>
      </Show>
    </>
  )
}
