import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Department() {
	const path = process.env.PUBLIC_URL;
	const [Members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${path}/DB/members.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	return (
		<Layout name={'Department'}>
			<div className='wrap'>
				{Members.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`${path}/img/${member.pic}`}
										alt={member.name}
									/>
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Department;
