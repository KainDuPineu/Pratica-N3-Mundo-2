import { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const codEditora = parseInt(req.query.codEditora as string, 10);
      const nomeEditora = controleEditora.getNomeEditora(codEditora);
      res.status(200).json({ nome: nomeEditora });
    } catch (error) {
      res.status(500).json({ error: 'Erro no servidor' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
};
