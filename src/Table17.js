import React, { useEffect, useState } from 'react'
import './home.css'
import io from 'socket.io-client'
import axios from 'axios'

const socket = io()

const Table17 = () => {
	const [org, setOrg] = useState('ko')
	const [visible, setVisible] = useState(false)
	const [matchId, setMatchId] = useState(null)
	const [compId, setCompId] = useState(null)
	const [stats, setStats] = useState({})
	let adj = null
	const id = 17

	const reset = () => {
		setOrg('ko')
		setVisible(false)
		setMatchId(null)
		setCompId(null)
		setStats({})
		adj = null
	}

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
		if (matchId && compId) {
			const intervalId = setInterval(() => {
				if (liveStatus != '3') {
					getStats(matchId, compId)
					setVisible(true)
				}
			}, 30000)

			return () => clearInterval(intervalId)
		}
	}, [compId, matchId])

	useEffect(() => {
		if (stats && stats.liveStatus) {
			const intervalId = setInterval(() => {
				if (stats.liveStatus === '3') {
					socket.emit(`finish-${id}`, {
						id: id,
					})
					reset()
				} else {
					socket.emit(`${id}-status`, {
						livestatus: stats.liveStatus,
					})
				}
			}, 30000)

			return () => clearInterval(intervalId)
		}
	}, [stats])

	useEffect(() => {
		socket.emit('register', `Table${id}`)

		const handleAction = (data) => {
			switch (data.action) {
				case 'show':
					setVisible(true)
					break
				case 'hide':
					setVisible(false)
					break
				case 'ids':
					if (data.matchId) {
						setMatchId(data.matchId)
					} else if (data.compId) {
						setCompId(data.compId)
					} else if (data.compname) {
						setOrg(data.compname)
					}
					break
				default:
					console.log('Unknown action', data)
			}
		}

		socket.on(`action-Table${id}`, handleAction)

		return () => {
			socket.off(`action-Table${id}`, handleAction)
		}
	}, [])

	const calcSuperleagueFrames = () => {
		const total = stats[0]?.homescore + stats[0]?.awayscore
		const frames = 36 - total

		return frames
	}

	useEffect(() => {
		if (org === 'vegasleague') {
			adj = new Array(stats[0])
		}
	}, [org])

	const calculateScore = (data, type) =>
		Object.values(data).reduce(
			(acc, curr) =>
				acc +
				parseInt(curr[`${type}scorepoints`]) +
				parseInt(curr[`${type}framepointsadj`]),
			0
		)
	const homeScore = calculateScore(adj, 'home')
	const awayScore = calculateScore(adj, 'away')

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
		<>
			{visible ? (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					xmlnsXlink='http://www.w3.org/1999/xlink'
					width='80vw'
					height='55vh'
					viewBox='0 -240 1260 400'
				>
					<defs>
						<filter
							id='luminosity-noclip'
							x={-1.5}
							y={-2}
							width={1254}
							height={66}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask'
							x={-1.5}
							y={-2}
							width={1254}
							height={66}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip)',
								}}
							></g>
						</mask>
						<filter
							id='luminosity-noclip-2'
							x={-2.5}
							y={-2}
							width={545}
							height={65}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask-2'
							x={-2.5}
							y={-2}
							width={545}
							height={65}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip-2)',
								}}
							></g>
						</mask>
						<filter
							id='luminosity-noclip-3'
							x={707.5}
							y={-1}
							width={545}
							height={64}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask-3'
							x={707.5}
							y={-1}
							width={545}
							height={64}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip-3)',
								}}
							></g>
						</mask>
						<filter
							id='luminosity-noclip-9'
							x={380}
							y={-1}
							width={95}
							height={59.5}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask-9'
							x={380}
							y={1}
							width={95}
							height={59.5}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip-9)',
								}}
							></g>
						</mask>
						<filter
							id='luminosity-noclip-8'
							x={783}
							y={-1}
							width={95}
							height={59.5}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask-8'
							x={783}
							y={1}
							width={95}
							height={59.5}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip-8)',
								}}
							></g>
						</mask>
						<filter
							id='luminosity-noclip-4'
							x={-2.5}
							y={-2}
							width={1254}
							height={25}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask-4'
							x={-2.5}
							y={-2}
							width={1254}
							height={25}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip-4)',
								}}
							></g>
						</mask>
						<filter
							id='luminosity-noclip-5'
							x={28.5}
							y={59}
							width={484}
							height={34}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask-5'
							x={28.5}
							y={59}
							width={484}
							height={34}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip-5)',
								}}
							></g>
						</mask>
						<filter
							id='luminosity-noclip-6'
							x={738.5}
							y={59}
							width={484}
							height={34}
							filterUnits='userSpaceOnUse'
							colorInterpolationFilters='sRGB'
						>
							<feFlood
								floodColor='#fff'
								result='bg'
							/>
							<feBlend
								in='SourceGraphic'
								in2='bg'
							/>
						</filter>
						<mask
							id='mask-6'
							x={738.5}
							y={59}
							width={484}
							height={34}
							maskUnits='userSpaceOnUse'
						>
							<g
								style={{
									filter: 'url(#luminosity-noclip-6)',
								}}
							></g>
						</mask>
					</defs>
					<g
						id='Layer_2'
						stats-name='Layer 2'
					>
						<g id='Container'>
							<g id='blackBar'>
								<g
									style={{
										mask: 'url(#mask)',
									}}
								>
									<rect
										x={0.5}
										width={1250}
										height={62}
										rx={10}
									/>
								</g>
							</g>
							<g id='redBar'>
								<g
									style={{
										mask: 'url(#mask-2)',
									}}
								>
									<rect
										y={0.5}
										width={540}
										height={60}
										rx={10}
										style={{
											fill: '#940708',
										}}
									/>
								</g>
							</g>
							<g id='blueBar'>
								<g
									style={{
										mask: 'url(#mask-3)',
									}}
								>
									<rect
										x={710}
										y={1}
										width={540}
										height={59.5}
										rx={10}
										style={{
											fill: '#090064',
										}}
									/>
								</g>
							</g>
							<g id='blackScore1'>
								<g
									style={{
										mask: 'url(#mask-9)',
									}}
								>
									<rect
										x={380}
										y={1}
										width={92}
										height={59.5}
										rx={20}
										style={{
											fill: '#000',
										}}
									/>
								</g>
							</g>
							<g id='blackScore2'>
								<g
									style={{
										mask: 'url(#mask-8)',
									}}
								>
									<rect
										x={783}
										y={1}
										width={92}
										height={59.5}
										rx={20}
										style={{
											fill: '#000',
										}}
									/>
								</g>
							</g>
							<g id='gloss'>
								<g
									style={{
										mask: 'url(#mask-4)',
										opacity: '0.5',
									}}
								>
									<path
										d='M1249.5,20.5H0v-10A10,10,0,0,1,10,.5H1239.5a10,10,0,0,1,10,10Z'
										style={{
											fill: '#fff',
											opacity: '0.1',
										}}
									/>
								</g>
							</g>
							<g id='whiteLeft'>
								<g
									style={{
										mask: 'url(#mask-5)',
									}}
								>
									<rect
										x={30.5}
										y={61}
										width={480}
										height={30}
										rx={10}
										style={{
											fill: '#ccc',
										}}
									/>
								</g>
							</g>
							<g id='whiteRight'>
								<g
									style={{
										mask: 'url(#mask-6)',
									}}
								>
									<rect
										x={740.5}
										y={61}
										width={480}
										height={30}
										rx={10}
										style={{
											fill: '#ccc',
										}}
									/>
								</g>
							</g>
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
								transform='translate(624 18)'
								fill='white'
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
								transform='translate(624 50)'
								fill='white'
								style={{
									fontSize: 33,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{org === 'superleague'
									? calcSuperleagueFrames()
									: org === 'vegasleague'
										? { framesLeft }
										: ''}
							</text>
							<text
								textAnchor='middle'
								transform='translate(624 12)'
								fill='white'
								style={{
									fontSize: 12,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{org === 'superleague'
									? 'Frames Left'
									: ''}
							</text>
							<text
								textAnchor='left'
								transform='translate(45.61 82)'
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
								transform='translate(1035 82)'
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
								transform='translate(423 40)'
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
								transform='translate(828 40)'
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
								transform='translate(192.61 40)'
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
								transform='translate(1060.61 40)'
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
								textAnchor='middle'
								transform='translate(639.86 82)'
								fill='white'
								style={{
									fontSize: 33,
									fontFamily: 'semiBold',
									textAlign: 'center',
								}}
							>
								{org === 'vegasleague'
									? { awayScore }
									: ''}
							</text>
							<text
								textAnchor='middle'
								transform='translate(527.11 82)'
								style={{
									fontSize: 33,
									fontFamily: 'semiaBold',
									textAlign: 'center',
								}}
							>
								{org === 'vegasleague'
									? { homeScore }
									: ''}
							</text>
							<text
								textAnchor='middle'
								transform='translate(850.61 82)'
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
								transform='translate(335.61 82)'
								style={{
									fontSize: 18,
									fontFamily: 'xxBold',
									textAlign: 'center',
								}}
							>
								ls.poolstat.net.au
							</text>
						</g>
					</g>
				</svg>
			) : ''}
		</>
	)
}
// {stats[0].awayframepointsadj===0 && stats[0].awayscorepoints===0 ? stats[0].awayscore : `${awayScore}`}
// {stats[0].homeframepointsadj===0 && stats[0].homescorepoints===0 ? stats[0].homescore : `${homeScore}`}
// {stats[0].homescorepoints>0 ? `${stats[0].homescore}` : ''}
// {stats[0].awayscorepoints>0 ? `${stats[0].awayscore}` : ''}
export { Table17 }
