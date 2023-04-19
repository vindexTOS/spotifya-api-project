import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const CLIENT_ID = `1dfd3e4a0f7f4ae7a70852688238a32e`
const CLIENT_SECRET = `a3b11d7d756048aea126be3475c20a8c`
function App() {
  const [count, setCount] = useState(0)

  const [search, setSearch] = useState<string>('')
  const [keyString, setKeyString] = useState<string>('')

  useEffect(() => {
    let authPrametser = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    }
    fetch(`https://accounts.spotify.com/api/token`, authPrametser)
      .then((res) => res.json())
      .then((data) => setKeyString(data.access_token))
  })

  const Search = async () => {
    let artistParameters = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${keyString}`,
      },
    }
    let artistId = await fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=artist`,
      artistParameters,
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button
          onClick={() => {
            setCount((count) => count + 1), Search()
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
