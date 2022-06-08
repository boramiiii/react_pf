import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Location() {
	//윈도우 전역객체에 있는 kakao키값을 바로 변수로 비구조화 할당
	const { kakao } = window;
	const info = [
		{
			title: '삼성동 코엑스',
			latlng: new kakao.maps.LatLng(
				37.51270773913474,
				127.06069417509839
			),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: {
				offset: new kakao.maps.Point(116, 99),
			},
		},
		{
			title: '올림픽 공원',
			latlng: new kakao.maps.LatLng(
				37.5188715541183,
				127.12528957675329
			),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: {
				offset: new kakao.maps.Point(116, 99),
			},
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.566826, 126.9786567),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: {
				offset: new kakao.maps.Point(116, 99),
			},
		},
	];
	const [Location, setLocation] = useState(null);
	const [Traffic, setTraffic] = useState(false);
	const [Info, setInfo] = useState(info);
	const [Index, setIndex] = useState(0);
	const container = useRef(null);
	const btns = useRef(null);
	const option = {
		center: Info[Index].latlng,
		level: 3,
	};
	const imageSrc = Info[Index].imgSrc;
	const imageSize = Info[Index].imgSize;
	const imageOption = Info[Index].imgPos;

	//마커이미지 인스턴스 생성
	const markerImage = new kakao.maps.MarkerImage(
		imageSrc,
		imageSize,
		imageOption
	);

	//위치 인스턴스 생성
	const markerPosition = Info[Index].latlng;

	//위치 인스턴스 값을 인수로 해서 마커 인스턴스 생성
	const marker = new kakao.maps.Marker({
		position: markerPosition,
		image: markerImage,
	});


	//최종 마커 호출

	useEffect(() => {
		container.current.innerHTML = '';
		//지도 인스턴스 생성
		const map_instance = new kakao.maps.Map(
			container.current,
			option
		);
		const handleResize = () => {
			map_instance.setCenter(Info[Index].latlng);
		}
		//마커 출력
		marker.setMap(map_instance);
		//인스턴스값을 state에 담아서 관리
		setLocation(map_instance);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		}

		//버튼활성화
		// for (const btn of btns.current.children) btn.classList.remove("on");
		// btns.current.children[Index].classList.add("on");
	}, [Index]);

	useEffect(() => {
		if (Location) {
			Traffic
				? Location.addOverlayMapTypeId(
					kakao.maps.MapTypeId.TRAFFIC
				)
				: Location.removeOverlayMapTypeId(
					kakao.maps.MapTypeId.TRAFFIC
				);
		}
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>

			<div className='btnSet'>
				<button onClick={() => setTraffic(!Traffic)}>
					{Traffic ? 'Traffic OFF' : 'Traffic ON'}
				</button>

				<ul className='branch' ref={btns}>
					{Info.map((info, idx) => {
						let on = '';
						Index === idx ? (on = 'on') : (on = '');
						return (
							<li key={idx} onClick={() => setIndex(idx)} className={on}>
								{info.title}
							</li>
						);
					})}
				</ul>
			</div>
		</Layout>
	);
}

export default Location;