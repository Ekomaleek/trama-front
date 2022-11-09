import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trama</title>
        <meta name="description" content="Planeje, registre, evolua" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logotitle}>
          <div className={styles.logo}>
            <div className={styles.vertical} />
            <div className={styles.vertical} />
            <div className={styles.vertical} />
            <div className={styles.horizontal} />
            <div className={styles.horizontal} />
            <div className={styles.horizontal} />
          </div>
          <h1 className={styles.title}>
            Trama
          </h1>
        </div>

        <p className={styles.description}>
          Planeje, registre, evolua
        </p>

        
      </main>
    </div>
  )
}
