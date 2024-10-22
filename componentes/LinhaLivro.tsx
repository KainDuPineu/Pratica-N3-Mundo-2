import React from 'react';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = ({ livro, excluir }) => {
  const editoraNome = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>{livro.titulo}</td>
      <td>{livro.resumo}</td>
      <td>{editoraNome}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
    </tr>
  );
};
