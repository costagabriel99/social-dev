import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle `
  * {
    padding: 0;
    margin: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
    color: #3a3a3a;
  }

  a {
    color: #8933CD;
    font-weight: bold;
    text-decoration: none;
  }
`

function App ({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
    
  )
}

export default App