import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';
import { Livro } from '../classes/modelo/Livro';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { ControleEditora } from '../classes/controle/ControleEditora';

const baseURL = "http://localhost:3000/api/livros";
const controleEditora = new ControleEditora();

const obter = async () => {
  const response = await fetch(baseURL);
  return response.json();
};

const excluirLivro = async (codigo: number) => {
  const response = await fetch(`${baseURL}/${codigo}`, {
    method: 'DELETE'
  });
  return response.ok;
};

const LinhaLivro: React.FC<{ livro: Livro, excluir: (codigo: number) => void }> = ({ livro, excluir }) => (
  <tr key={livro.codigo}>
    <td>
      {livro.titulo}
      <br />
      <button className="btn btn-danger mt-2" onClick={() => excluir(livro.codigo)}>
        Excluir
      </button>
    </td>
    <td>{livro.resumo}</td>
    <td>{controleEditora.getNomeEditora(livro.codEditora)}</td>
    <td>
      <ul>
        {livro.autores.map((autor, index) => (
          <li key={index}>{autor}</li>
        ))}
      </ul>
    </td>
  </tr>
);

const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    if (!carregado) {
      obter().then(data => {
        setLivros(data);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    if (sucesso) {
      setCarregado(false);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Lista de Livros</title>
        <meta name="description" content="Lista de livros da Loja Next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro key={livro.codigo} livro={livro} excluir={excluir} />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;