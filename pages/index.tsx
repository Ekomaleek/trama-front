import Head from 'next/head'

import { NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Trama</title>
        <meta name="description" content="Planeje, registre, evolua" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        Trama
      </h1>

      <p>
        Planeje, registre, evolua
      </p>
    </div>
  )
}

export default HomePage
