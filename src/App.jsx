import { useState } from 'react'
import envConfig from './config/envConfig';

function App() {
console.log(envConfig.appwriteUrl);
  return (
    <>
      <h1>Blog with appwrite</h1>
    </>
  )
}

export default App
