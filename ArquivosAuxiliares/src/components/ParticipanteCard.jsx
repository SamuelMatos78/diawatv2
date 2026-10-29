function ParticipanteCard({ participante, onVotar }) {
  return (
    <article
      className={
        participante.naRoca
          ? 'participante-card card-roca'
          : 'participante-card'
      }
    >
      {participante.naRoca && (
        <span className="selo-roca">Na roça</span>
      )}

      <img
        className="participante-foto"
        src={participante.foto}
        alt={`Foto de ${participante.nome}`}
      />
      <h2 className="participante-nome">{participante.nome}</h2>

      {onVotar && (
        <button
          className="botao botao-principal botao-votar"
          type="button"
          onClick={() => onVotar(participante)}
        >
          Votar para eliminar
        </button>
      )}
    </article>
  );
}

export default ParticipanteCard;
