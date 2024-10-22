import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Menu } from '../componentes/Menu';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next</title>
        <meta name="description" content="Explore nosso catálogo de livros." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Página Inicial
        </h1>
      </main>
    </div>
  );
}

export default Home;
