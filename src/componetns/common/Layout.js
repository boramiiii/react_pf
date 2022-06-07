import { useEffect, useRef } from 'react';

function Layout({ name, children }) {
	const frame = useRef(null);

	useEffect(() => {
		frame.current.classList.add('on');
	}, []);

	return (
		<section className={`content ${name}`} ref={frame}>
			<figure></figure>
			<div className='inner'>
				<h2>{name}</h2>
				{children}
			</div>
		</section>
	);
}

export default Layout;
