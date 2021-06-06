import React, { useEffect, useState } from 'react'

function App() {
  const url = 'http://localhost:3003'

  const [res, setRes] = useState()

  const getData = async (url) => {
    const response = await (await fetch(url)).json()
    return response
  }

  useEffect(() => {
    getData(url).then((data) => setRes(data))
  }, [])

  return (
    <div className="App">
      <h1>Test</h1>
      <pre>{JSON.stringify(res, null, 2)}</pre>
    </div>
  )
}

export default App
