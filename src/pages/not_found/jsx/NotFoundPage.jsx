import { Link } from 'react-router-dom';
import config from '@config/config';

const NotFoundPage = () => {
    const BASE_URL = config.BASE_URL;

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div>
                <img src={`${BASE_URL}img/404Page.gif`} alt="Cargando..." draggable="false" />
            </div>
            <h1 className="text-4xl text-gray-900">Page not found</h1>
            <p className="mb-4 text-lg text-gray-900">
                Sorry, the page you are looking for does not exist.
            </p>
            <Link to="/" className="btn_notfound bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Return to main page
            </Link>
        </div>
    );
};

export default NotFoundPage;
