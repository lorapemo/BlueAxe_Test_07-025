

const Card = ({ pokemon }) => {
    return (
        <div key={pokemon.id} className="pokemon-card">
            <div className="card-image-container">
                <img
                    src={pokemon.sprites?.other?.['official-artwork']?.front_default}
                    alt={pokemon.name}
                    className="pokemon-image"
                />
            </div>
            <div className="card-content">
                <h3 className="pokemon-name">{pokemon.name}</h3>
                <div className="pokemon-id">
                    #{pokemon.id?.toString()}
                </div>
                {pokemon.types && (
                    <div className="pokemon-types">
                        {pokemon.types.map((type) => (
                            <span
                                key={type.slot}
                                className={`type-badge ${type.type.name}`}
                            >
                                {type.type.name}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card;