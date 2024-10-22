// LivroDados.tsx
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';

const controleEditora = new ControleEditora();

const baseURL = "http://localhost:3000/api/livros";

const incluirLivro = async (livro: Livro) => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(livro)
  });
  return response.ok;
};

const LivroDados: React.FC = () => {
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);
  const router = useRouter();

  const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const livro: Livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora
    };
    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/LivroLista');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Novo Livro</title>
        <meta name="description" content="Incluir novo livro na Loja Next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title} style={{ textAlign: 'left' }}>
          Incluir Novo Livro
        </h1>
        <form onSubmit={incluir}>
          <div className="mb-3">
            <label htmlFor="titulo" className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              id="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="resumo" className="form-label">Resumo</label>
            <textarea
              className="form-control"
              id="resumo"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="autores" className="form-label">Autores</label>
            <textarea
              className="form-control"
              id="autores"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="editora" className="form-label">Editora</label>
            <select
              className="form-select"
              id="editora"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map(opcao => (
                <option key={opcao.value} value={opcao.value}>
                  {opcao.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Incluir</button>
        </form>
      </main>
    </div>
  );
};

export default LivroDados;
