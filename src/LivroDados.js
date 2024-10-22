import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivro } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

const LivroDados = () => {
  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(opcoes[0].value);
  const navigate = useNavigate();

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const livro = {
      codigo: 0,
      codEditora,
      titulo,
      resumo,
      autores: autores.split('\n')
    };
    controleLivro.incluir(livro);
    navigate('/');
  };

  return (
    <main className="container mt-4">
      <h1>Dados do Livro</h1>
      <form onSubmit={incluir}>
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            id="titulo"
            type="text"
            className="form-control"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resumo">Resumo:</label>
          <textarea
            id="resumo"
            className="form-control"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="editora">Editora:</label>
          <select
            id="editora"
            className="form-control"
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
        <div className="form-group">
          <label htmlFor="autores">Autores (1 por linha):</label>
          <textarea
            id="autores"
            className="form-control"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar Dados</button>
      </form>
    </main>
  );
};

export default LivroDados;
