import { createRoot } from 'react-dom/client';
import HomeView from './pages/HomeView';
import dotenv from 'dotenv';

dotenv.config();

// Import statement to indicate that you need to bundle `./index.scss`
import './styles/index.scss';
console.log(process.env.NODE_ENV);

const App = () => {
	return <HomeView />;
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<App />);
