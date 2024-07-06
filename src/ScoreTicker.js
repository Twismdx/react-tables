import React from 'react';
import PropTypes from 'prop-types';
import './home.css';

const ScoreTicker = ({ matches }) => {
    return (
        <div className="score-ticker">
            <div className="ticker-wrap">
                <div className="ticker">
                    {matches.map((match, index) => (
                        <div className="ticker-item" key={index}>
                            <span style={{ color: 'black', fontWeight: 'bold' }}>{`${match.home.shortname}`}</span>{'\u00A0'} 
                            <span style={{ color: 'red' }}>{`${match.home.framescore}`}</span>{'\u00A0'}
                            {' - '}
                            <span style={{ color: 'black', fontWeight: 'bold' }}>{`${match.away.shortname}`}</span>{'\u00A0'}
                            <span style={{ color: 'blue' }}>{`${match.away.framescore}`}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

ScoreTicker.propTypes = {
    matches: PropTypes.arrayOf(
        PropTypes.shape({
            home: PropTypes.shape({
                teamname: PropTypes.string.isRequired,
                shortname: PropTypes.string.isRequired,
                framescore: PropTypes.number.isRequired,
            }).isRequired,
            away: PropTypes.shape({
                teamname: PropTypes.string.isRequired,
                shortname: PropTypes.string.isRequired,
                framescore: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
};

export default ScoreTicker;
