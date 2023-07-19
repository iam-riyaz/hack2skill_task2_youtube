import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [searchInput, setSearchInput] = useState("")

  const onSearch=(e)=>{
setSearchInput(e.target.value)
  }

  const clickSearch=()=>{
    
    

  }



  return (
    <>
      
      <button>Update Database</button>
      <button>Get Data From Database</button>

      <div>
            <input type="text" placeholder='search video' onChange={onSearch} />
            <button onClick={clickSearch}>Search</button>
      </div>


    </>
  )
}

export default App
