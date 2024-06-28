import React, { useEffect, useState } from 'react'
import './home.css'
import io from 'socket.io-client'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import ScoreTicker from './ScoreTicker'

const socket = io('http://localhost:4000')

const Table2 = ({ split }) => {
	const [org, setOrg] = useState('ko')
	const [visible, setVisible] = useState(false)
	const [matchId, setMatchId] = useState(null)
	const [compId, setCompId] = useState(null)
	const [stats, setStats] = useState({})
	const [leftLogoIndex, setLeftLogoIndex] = useState(0)
	const [rightLogoIndex, setRightLogoIndex] = useState(1)
	const id = 2
	const [matchData, setMatchData] = useState([])

	useEffect(() => {
		const interval = setInterval(() => {
			const parseMatches = (data) => {
				if (!data || !data[compId] || !data[compId].matches) {
					return []
				}
				return Object.values(data[compId].matches).map(match => ({
					home: match.home,
					away: match.away,
				}))
			}

			async function getCompData() {
				try {
					const response = await axios.post('https://twism.vercel.app/compstoday?orgid=64')
					const matches = parseMatches(response.data)
					setMatchData(matches)
				} catch (error) {
					console.error('Error fetching data:', error)
				}
			}
			getCompData()
		}, 10000) // 10000ms = 10 seconds

		return () => clearInterval(interval)
	}, [compId])

	const logos = [
		'/rotate14.png',
		'/rotate13.png',
		'/rotate12.png',
		'/rotate11.png',
		'/rotate10.png',
		'/rotate9.png',
		'/rotate8.png',
		'/rotate7.png',
		'/rotate6.png',
		'/rotate5.png',
		'/rotate4.png',
		'/rotate3.png',
		'/rotate2.png',
		'/rotate1.png'
	]

	const logoSizes = [
		{ width: '150px', height: '90px' },  //7
		{ width: '200px', height: '75px' },
		{ width: '230px', height: '70px' },  //6
		{ width: '200px', height: '75px' },
		{ width: '150px', height: '90px' },  //5
		{ width: '200px', height: '75px' },
		{ width: '200px', height: '75px' },  //4
		{ width: '100px', height: '100px' },
		{ width: '200px', height: '75px' },  //3
		{ width: '200px', height: '75px' },
		{ width: '160px', height: '75px' },  //2
		{ width: '150px', height: '90px' },
		{ width: '200px', height: '75px' },  //1
		{ width: '200px', height: '75px' }
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setLeftLogoIndex(prevIndex => (prevIndex + 2) % logos.length)
			setRightLogoIndex(prevIndex => (prevIndex + 2) % logos.length)
		}, 15000) // 300000ms = 5 minutes

		return () => clearInterval(interval)
	}, [])


	const reset = () => {
		setOrg('ko')
		setVisible(false)
		setMatchId(null)
		setCompId(null)
		setStats({})
		adj = null
	}

	useEffect(() => {
		if (stats.liveStatus === '3') {
			reset()
		}
	}, [stats])

	async function getStats(match, comp) {
		try {
			const response = await axios.post(`https://twism.vercel.app/drid`, null, {
				params: {
					matchId: match,
					compId: comp,
				},
			})

			const res = Object.keys(response.data).map(key => response.data[key])
			setStats(res)
		} catch (err) {
			console.warn(err)
		}
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			getStats(matchId, compId)
		}, 30000)
		getStats(matchId, compId)
		setVisible(true)

		return () => clearInterval(intervalId)
	}, [matchId, compId])

	useEffect(() => {
		socket.on(`started-${id}`, (data) => {
			setCompId(data.compid)
			setMatchId(data.matchid)
			if (data.compname === 'superleague') {
				setOrg('superleague')
			} else if (data.compname === 'vegasleague') {
				setOrg('vegasleague')
			} else setOrg('ko')
		})

		return () => {
			socket.off(`scoreUpdated-${id}`)
		}
	}, [])

	const calcSuperleagueFrames = () => {
		const total = stats[0]?.homescore + stats[0]?.awayscore
		const frames = 36 - total

		return frames
	}

	const calculateScore = (data, type) => {
		Object.values(data).reduce(
			(acc, curr) =>
				acc +
				parseInt(curr[`${type}scorepoints`]) +
				parseInt(curr[`${type}framepointsadj`]),
			0
		)
	}

	let adj = []
	let homeScore = null
	let awayScore = null

	if (org === 'vegasleague' && stats && stats.length > 0) {
		adj = new Array(stats[0])

		homeScore = calculateScore(adj, 'home')
		awayScore = calculateScore(adj, 'away')
	}

	const calculateFrames = (data, type) =>
		Object.values(data).reduce(
			(acc, curr) =>
				25 -
				(acc +
					parseInt(curr[`homescore`]) +
					parseInt(curr[`awayscore`])),
			0
		)

	const framesLeft = calculateFrames(adj)

	return (
		<div className="main-container">
			{visible && stats[0] ? (
				<>
					{split ? ('') : (
						<>
							<ScoreTicker matches={matchData} />
							<AnimatePresence mode='wait'>
								<motion.img
									key={leftLogoIndex}
									src={logos[leftLogoIndex]}
									alt="Left Logo"
									className="logo left-logo"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 1 }}
									style={logoSizes[leftLogoIndex]}
								/>
							</AnimatePresence>
							<AnimatePresence mode='wait'>
								<motion.img
									key={rightLogoIndex}
									src={logos[rightLogoIndex]}
									alt="Right Logo"
									className="logo right-logo"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 1 }}
									style={logoSizes[rightLogoIndex]}
								/>
							</AnimatePresence>
						</>
					)}
					<svg
						id="Layer_2"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
						width='80vw'
						height='auto'
						viewBox="0 0 1260 200"
					>
						<g id="Layer_1-2">

							<g id="Layer_2-2">
								<g id="Container">
									<path
										d="M10.5 22.986h1230c5.5 0 10 4.5 10 10v42c0 5.5-4.5 10-10 10H10.5c-5.5 0-10-4.5-10-10v-42c0-5.5 4.4-10 10-10z"
										fill="#0e0e11"
										strokeWidth={0}
										id="blackBar"
									/>
									<path
										d="M11.1 23.986h510.4c5.4 0 9.8 4.5 9.8 10v40c0 5.5-4.4 10-9.8 10H11.1c-5.4 0-9.8-4.5-9.8-10v-40c0-5.5 4.4-10 9.8-10z"
										fill="#090064"
										strokeWidth={0}
										id="redBar"
									/>
									<path
										d="M729.662 24.013l510.5.1c5.4 0 9.8 4.523 9.8 10.05v39.695c0 5.528-4.4 10.05-9.8 10.05l-510.3 1.105c-5.4 0-9.9-5.627-9.9-11.155V34.163c.1-5.527 4.3-10.15 9.7-10.15z"
										fill="#940708"
										strokeWidth={0}
										id="blueBar"
									/>
									<path
										d="M400 23.986h52c11 0 20 9 20 20v19.5c0 11-9 20-20 20h-52c-11 0-20-9-20-20v-19.5c0-11 8.9-20 20-20z"
										fill="#0d0c0e"
										strokeWidth={0}
										id="blackScore1"
									/>
									<path
										d="M803 23.986h52c11 0 20 9 20 20v19.5c0 11-9 20-20 20h-52c-11 0-20-9-20-20v-19.5c0-11 8.9-20 20-20z"
										fill="#0d0c0e"
										strokeWidth={0}
										id="blackScore2"
									/>
									<g opacity={0.5} id="gloss">
										<path
											d="M1249.5 43.486H0v-10c0-5.5 4.5-10 10-10h1229.5c5.5 0 10 4.5 10 10v10z"
											style={{ isolation: "isolate" }}
											fill="#fff"
											opacity={0.1000000015}
											strokeWidth={0}
										/>
									</g>
									<path
										d="M29.914 83.486h431.172c5.178 0 9.414 4.5 9.414 10v10c0 5.5-4.236 10-9.414 10H29.914c-5.178 0-9.414-4.5-9.414-10v-10c0-5.5 4.236-10 9.414-10z"
										fill="#ccc"
										strokeWidth={0}
										id="whiteLeft"
									/>
									<path
										d="M789.875 83.486h431.25c5.156 0 9.375 4.5 9.375 10v10c0 5.5-4.219 10-9.375 10h-431.25c-5.156 0-9.375-4.5-9.375-10v-10c0-5.5 4.219-10 9.375-10z"
										fill="#ccc"
										strokeWidth={0}
										id="whiteRight"
									/>
								</g>
							</g>
							<image
								width={1921}
								height={748}
								transform="matrix(.14576 0 0 .14576 487.651 0)"
							/>
							<rect
								id="raceto"
								x={550.4999847412}
								y={104.4858018088}
								width={150}
								height={30}
								rx={10.0218388484}
								ry={10.0218388484}
								fill="#ccc"
								strokeWidth={0}
							/>
							<text
								textAnchor='end'
								fill='white'
								transform='translate(520 40)'
								style={{
									fontSize: 33,
									fontFamily: 'extraBold',
									textAlign: 'center',
								}}
							></text>
							<text
								textAnchor='start'
								transform='translate(727 40)'
								fill='white'
								style={{
									fontSize: 33,
									fontFamily: 'extraBold',
									textAlign: 'center',
								}}
							></text>
							<text
								textAnchor='middle'
								transform='translate(624 120)'
								fill='black'
								style={{
									fontSize: 18,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{/* Frames Left */}
							</text>
							<text
								textAnchor='middle'
								transform='translate(626 128)'
								fill='black'
								style={{
									fontSize: 26,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{stats[0].matchformat}
							</text>
							<text
								textAnchor='left'
								transform='translate(30 105)'
								style={{
									fontSize: 18,
									fontFamily: 'xxBold',
									textAlign: 'center',
								}}
							>
								{stats[0].venuename}
							</text>
							<text
								textAnchor='right'
								transform='translate(1055 105)'
								style={{
									fontSize: 18,
									fontFamily: 'xxBold',
									textAlign: 'center',
								}}
							>
								{stats[0].timezone}
							</text>
							<text
								textAnchor='middle'
								transform='translate(425 64)'
								fill='white'
								style={{
									fontSize: 33,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{stats[0].homescore}
							</text>
							<text
								textAnchor='middle'
								transform='translate(828 64)'
								fill='white'
								style={{
									fontSize: 33,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{stats[0].awayscore}
							</text>
							<text
								textAnchor='middle'
								transform='translate(190 64)'
								fill='white'
								style={{
									fontSize: 26,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{stats[0].hometeamlabel}
							</text>
							<text
								textAnchor='middle'
								transform='translate(1060 64)'
								fill='white'
								style={{
									fontSize: 26,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{stats[0].awayteamlabel}
							</text>
							<text
								textAnchor='left'
								transform='translate(790 105)'
								style={{
									fontSize: 18,
									fontFamily: 'xxBold',
									textAlign: 'center',
								}}
							>
								{stats[0].compname}
							</text>
							<text
								textAnchor='right'
								transform='translate(310 105)'
								style={{
									fontSize: 18,
									fontFamily: 'xxBold',
									textAlign: 'center',
								}}
							>
								ls.poolstat.net.au
							</text>
						</g>
					</svg>
				</>
			) : ''}
		</div>
	)
}
// {stats[0].awayframepointsadj===0 && stats[0].awayscorepoints===0 ? stats[0].awayscore : `${awayScore}`}
// {stats[0].homeframepointsadj===0 && stats[0].homescorepoints===0 ? stats[0].homescore : `${homeScore}`}
// {stats[0].homescorepoints>0 ? `${stats[0].homescore}` : ''}
// {stats[0].awayscorepoints>0 ? `${stats[0].awayscore}` : ''}
export default Table2