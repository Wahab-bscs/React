import { useCallback, useEffect, useState ,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [numAllowed, setNumAllowed] = useState(false)
  const [length, setLength] = useState(8)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const specialChars = '!@#$%^&*-+'

    if (numAllowed) chars += numbers
    if (charAllowed) chars += specialChars


    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * chars.length)
      pass += chars.charAt(charIndex)
    }
    setPassword(pass)
  }, [length, numAllowed, charAllowed])
  const passwordRef = useRef(null)
  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed])

  return (
    <>
      <h1 className='text-4xl text-center text-white'>
        Password Generator</h1>
      <div className='bg-gray-700'>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 mt-3 px-3 bg-amber-100 rounded-md text-black'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyToClipboard}
            className='bg-orange-500 text-white w-full py-2 rounded-md mt-4 hover:bg-orange-600 transition-colors'
          >copy</button>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label >Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                id='numbers'
                checked={numAllowed}
                onChange={() => { setNumAllowed((prev) => !prev) }}
              />
              <label htmlFor='numbers'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                id='specialChars'
                checked={charAllowed}
                onChange={() => { setCharAllowed((prev) => !prev) }}
              />
              <label htmlFor='specialChars'>Characters</label>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </>
  )
} 

export default App
