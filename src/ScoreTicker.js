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
                            <span
                                style={{
                                    color:
                                        match.home.framescore > match.away.framescore
                                            ? 'red'
                                            : 'inherit',
                                }}
                            >
                                {`${match.home.shortname} ${match.home.framescore}`}
                            </span>
                            {' - '}
                            <span
                                style={{
                                    color:
                                        match.away.framescore > match.home.framescore
                                            ? 'blue'
                                            : 'inherit',
                                }}
                            >
                                {`${match.away.framescore} ${match.away.shortname}`}
                            </span>
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
