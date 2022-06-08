import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Popup from '../common/Popup';

function Youtube() {
	const [Vids, setVids] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const handlePopup = (index) => {
		setOpen(true);
		setIndex(index);
	}

	useEffect(() => {
		const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
		const playlist = 'PLHtvRFLN5v-W-izd7V4JH2L4-RTW0WRi3';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		axios.get(url).then((json) => {
			console.log(json);
			setVids(json.data.items);
		});
	}, []);

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
					const tit = vid.snippet.title;
					const desc = vid.snippet.description;
					const date = vid.snippet.publishedAt;

					return (
						<article key={idx}>
							<h3>
								{tit.length > 50
									? tit.substr(0, 30) + '...'
									: tit}
							</h3>
							<div className='txt'>
								<p>
									{desc.length > 200
										? desc.substr(0, 200) + '...'
										: desc}
								</p>
								<span>{date.split('T')[0]}</span>
							</div>
							<div
								className='pic'
								onClick={() => { handlePopup(idx) }}>
								<img
									src={vid.snippet.thumbnails.standard.url}
									alt={vid.title}
								/>
							</div>
						</article>
					);
				})}
			</Layout>
			{Open && (
				<Popup setOpen={setOpen}>
					<iframe
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
						frameBorder='0'></iframe>
				</Popup>
			)}
		</>
	);
}

export default Youtube;