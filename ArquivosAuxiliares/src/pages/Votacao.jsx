import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard.jsx';
import {
  listarForaDaRoca,
  listarNaRoca,
  registrarVoto,
} from '../services/votacaoService.js';

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [votosRealizados, setVotosRealizados] = useState(0);
  const participantesNaRoca = listarNaRoca();
  const participantesForaDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setVotosRealizados((quantidade) => quantidade + 1);
  }

  return (
    <main className="pagina conteudo-votacao">
      <section aria-labelledby="titulo-votacao">
        <div className="cabecalho-pagina">
          <h1 id="titulo-votacao">Quem você quer eliminar?</h1>
          <p>Cada clique conta um voto para tirar o peão da fazenda.</p>
        </div>

        {ultimoVoto !== null && (
          <p className="mensagem-voto" role="status">
            Seu voto para eliminar <strong>{ultimoVoto.nome}</strong> foi registrado.
            Você já votou <strong>{votosRealizados} {votosRealizados === 1 ? 'vez' : 'vezes'}</strong> desde que abriu esta página.{' '}
            <Link to="/resultado">Acompanhe o resultado</Link>.
          </p>
        )}

        <div className="grade-roca">
          {participantesNaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
              onVotar={handleVotar}
            />
          ))}
        </div>
      </section>

      <section className="secao-demais" aria-labelledby="titulo-demais">
        <div className="cabecalho-secao">
          <h2 id="titulo-demais">Demais peões</h2>
          <p>Fora da roça nesta semana, não podem receber votos.</p>
        </div>
        <div className="grade-demais">
          {participantesForaDaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
