import { useState } from 'react';

const Card = ({ pokemon }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const formatStatName = (name) => {
        // Convert stat names to more readable format
        const nameMap = {
            'hp': 'HP',
            'attack': 'Attack',
            'defense': 'Defense',
            'special-attack': 'Sp. Attack',
            'special-defense': 'Sp. Defense',
            'speed': 'Speed'
        };
        return nameMap[name] || name;
    };

    return (
        <>
            <div
                key={pokemon.id}
                className="pokemon-card"
                onClick={openModal}
                style={{ cursor: 'pointer' }} // Add pointer cursor to indicate clickability
            >
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

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>
                        <h3 className='pokemon-name'>{pokemon.name}'s Base Stats</h3>
                        <div className="modal-data-container">
                            <img
                                src={pokemon.sprites?.other?.['official-artwork']?.front_default}
                                alt={pokemon.name}
                                className="modal-pokemon-image"
                            />
                            <div className="stats-container">
                                {pokemon.stats.map((stat, index) => (
                                    <div key={index} className="stat-row">
                                        <span className="stat-name">
                                            {formatStatName(stat.stat.name)}:
                                        </span>
                                        <span className="stat-value">
                                            {stat.base_stat}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Card;