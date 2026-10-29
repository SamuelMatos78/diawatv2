import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  calcularResultado,
  calcularTotalVotos,
  obterVotos,
  zerarVotos,
} from '../services/votacaoService.js';

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());
  const totalVotos = calcularTotalVotos(votos);
  const placar = calcularResultado(votos);

  function handleZerarVotacao() {
    const confirmou = window.confirm('Tem certeza de que deseja zerar a votação?');
    if (confirmou) {
      zerarVotos();
      setVotos(obterVotos());
    }
  }

  return (
    <main className="pagina pagina-resultado">
      <header className="cabecalho-resultado">
        <h1>Parcial da eliminação</h1>
        <p>
          <strong className="total-votos">{totalVotos}</strong>{' '}
          {totalVotos === 1 ? 'voto computado' : 'votos computados'}
        </p>
      </header>

      {totalVotos === 0 ? (
        <section className="resultado-vazio" aria-live="polite">
          <h2>A votação ainda não começou</h2>
          <p>Seja o primeiro a escolher quem deve deixar a fazenda.</p>
          <Link className="botao botao-principal" to="/votacao">
            Ir para votação
          </Link>
        </section>
      ) : (
        <>
          <section className="placar" aria-label="Resultado parcial por participante">
            {placar.map((participante, indice) => {
              const percentualFormatado = participante.percentual.toLocaleString(
                'pt-BR',
                { maximumFractionDigits: 1 },
              );

              return (
                <article
                  className={
                    indice === 0 ? 'placar-item placar-lider' : 'placar-item'
                  }
                  key={participante.id}
                >
                  <img
                    className="placar-foto"
                    src={participante.foto}
                    alt={`Foto de ${participante.nome}`}
                  />
                  <div className="placar-dados">
                    <div className="placar-identificacao">
                      <h2>{participante.nome}</h2>
                      {indice === 0 && (
                        <span className="selo-lider">Sairia hoje</span>
                      )}
                    </div>
                    <div
                      className="barra"
                      role="progressbar"
                      aria-label={`Percentual de votos de ${participante.nome}`}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={participante.percentual}
                    >
                      <span
                        className="barra-preenchida"
                        style={{ width: `${participante.percentual}%` }}
                      />
                    </div>
                    <p className="placar-percentual">
                      {percentualFormatado}% ({participante.votos}{' '}
                      {participante.votos === 1 ? 'voto' : 'votos'})
                    </p>
                  </div>
                </article>
              );
            })}
          </section>

          <button
            className="botao botao-zerar"
            type="button"
            onClick={handleZerarVotacao}
          >
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;
