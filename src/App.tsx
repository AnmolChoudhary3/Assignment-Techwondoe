import React from 'react';
import './App.css';
import AllUsers from './components/AllUsers';
import { QueryClient, QueryClientProvider } from 'react-query'
 
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App m-6">
          <h1 className="text-4xl font-medium">Company Settings</h1>
          <nav className='nav mt-6'>
              <ul className='flex border border-slate-400 w-fit rounded-lg shadow-md divide-x'>
                  <li className='px-5 py-2 hover:bg-gray-100'><a href='#'>General</a></li>
                  <li className='px-5 py-2 bg-gray-100 hover:bg-gray-100'><a href='#'>User</a></li>
                  <li className='px-5 py-2 hover:bg-gray-100'><a href='#'>Plan</a></li>
                  <li className='px-5 py-2 hover:bg-gray-100'><a href='#'>Billing</a></li>
                  <li className='px-5 py-2 hover:bg-gray-100'><a href='#'>Integration</a></li>
              </ul>
          </nav>
          <main>
              <AllUsers/>
          </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
