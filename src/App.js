import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import Header from './componetns/common/Header';
import Footer from './componetns/common/Footer';
//main
import Visual from './componetns/main/Visual';
import News from './componetns/main/News';
import Pics from './componetns/main/Pics';
import Vids from './componetns/main/Vids';
//sub
import Department from './componetns/sub/Department';
import Gallery from './componetns/sub/Gallery';
import Community from './componetns/sub/Community';
import Youtube from './componetns/sub/Youtube';
import Location from './componetns/sub/Location';
import Join from './componetns/sub/Join';

function App() {
	return (
		<>
			<Switch>
				<Route exact path='/'>
					{/* 메인용 header */}
					<Header type={'main'} />
					<Visual />
					<News />
					<Pics />
					<Vids />
				</Route>

				{/* 서브용 header */}
				<Route
					path='/'
					render={() => <Header type={'sub'} />}
				/>
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;