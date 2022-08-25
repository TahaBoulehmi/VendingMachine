import { Fragment, useState, useContext, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { CreditCardIcon, MenuAlt2Icon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { UserContext } from '../contexts/UserContext'
import Products from '../components/Products'
import ProductForm from '../components/ProductForm'
import SideBar from '../components/SideBar'
import useQuery from '../helpers/useQuery'
import { signout } from '../helpers/queries'
import { Show } from '../helpers/Conditionals'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
  const userNavigation = [{ name: 'Sign out', href: () => false, onClick: () => runQuery(() => signout()) }]

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [openProductForm, setOpenProductForm] = useState(false)
  const [product, setProduct] = useState({})

  const { user, setUser } = useContext(UserContext)

  const { isQuerySuccessful, runQuery } = useQuery()
  useEffect(() => {
    if (isQuerySuccessful) setUser({})
  }, [isQuerySuccessful, setUser])
  useEffect(() => {
    if (openProductForm === false) setProduct({})
  }, [openProductForm])

  return (
    <>
      <SideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setOpenProductForm={setOpenProductForm}
      />
      <div>
        <div className="md:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" method="POST" onSubmit={e => e.preventDefault()}>
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm"
                      placeholder="Search"
                      type="search"
                      name="search"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <Show when={user.role === 0}>
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex"
                  >
                    <span className="sr-only">View notifications</span>
                    {user.deposit}
                    <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Show>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://i0.wp.com/www.shopispy.io/app/media/users/default.jpg"
                        alt="User"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map(item => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              onClick={item.onClick}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <Products search={search} setProduct={setProduct} setOpenProductForm={setOpenProductForm} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Show
        when={openProductForm}
        render={() => <ProductForm open={openProductForm} setOpen={setOpenProductForm} product={product} />}
      ></Show>
    </>
  )
}
