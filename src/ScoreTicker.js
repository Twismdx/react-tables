import React from 'react'
import PropTypes from 'prop-types'
import './home.css'

const ScoreTicker = ({ matches }) => {
    return (
        <div className="score-ticker">
            <div className="ticker-wrap">
                <div className="ticker">
                    {matches.map((match, index) => (
                        <div className="ticker-item" key={index}>
                            {`${match.home.teamname} ${match.home.framescore} - ${match.away.framescore} ${match.away.teamname}`}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

ScoreTicker.propTypes = {
    matches: PropTypes.arrayOf(
        PropTypes.shape({
            home: PropTypes.shape({
                teamname: PropTypes.string.isRequired,
                framescore: PropTypes.number.isRequired,
            }).isRequired,
            away: PropTypes.shape({
                teamname: PropTypes.string.isRequired,
                framescore: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
}

export default ScoreTicker