import React from 'react';
import Link from 'next/link';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/" legacyBehavior>
                <a className="nav-link active" aria-current="page">Home</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/LivroLista" legacyBehavior>
                <a className="nav-link">Catálogo</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/LivroDados" legacyBehavior>
                <a className="nav-link">Novo Livro</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
