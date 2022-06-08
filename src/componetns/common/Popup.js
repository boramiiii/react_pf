import { useEffect } from 'react';

function Popup({ children, setOpen }) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		}
	}, [])


	return (
		<aside className='pop'>
			<div className="con">
				{children}
				<span className="close" onClick={() => setOpen(false)}>CLOSE</span>
			</div>
		</aside>
	);

}

export default Popup;
