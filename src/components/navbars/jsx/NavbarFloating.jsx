import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import '@components/navbars/css/styles_navbar.css';

const navigation = [
    { name: 'Home', href: '/Weather/Home' },
    { name: 'Forecast', href: '/Weather/Forecast' },
];

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const NavbarFloating = () => {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState(location.pathname);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location.pathname]);

    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 p-2 px-4 rounded-3xl border z-50 bg-lightNavbar text-lightNavbarText dark:bg-darkNavbar dark:text-darkNavbarText dark:border-lightHover border-darkHover navbar-floating">
            <div className="flex items-center justify-between">
                {/* Nombre de la aplicación */}
                <div className="text-lg md:text-xl font-bold px-2 md:px-3 py-1 md:py-2 mr-2 md:mr-4">
                    <Link to="/">WeatherApp</Link>
                </div>
                {/* Enlaces de navegación */}
                <div className="flex space-x-2 md:space-x-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            aria-current={item.href === currentPath ? 'page' : undefined}
                            className={classNames(
                                item.href === currentPath
                                    ? 'bg-lightText text-lightBg dark:bg-darkText dark:text-darkBg'
                                    : 'text-lightNavbarText dark:text-darkNavbarText hover:bg-lightHover dark:hover:bg-darkBg',
                                'px-2 py-1 md:px-3 md:py-2 rounded-2xl nav-item'
                            )}
                            onClick={() => setCurrentPath(item.href)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                {/* Botón de alternancia de tema */}
                <button
                    type="button"
                    onClick={toggleDarkMode}
                    className='ml-2 md:ml-4 px-2 py-1 md:px-3 md:py-2 rounded-2xl dark:hover:bg-darkBg hover:bg-lightHover toggle-dark-mode'
                >
                    <span className="sr-only">Toggle Dark Mode</span>
                    {darkMode ? (
                        <SunIcon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                    ) : (
                        <MoonIcon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
                    )}
                </button>
            </div>
        </nav>
    );
};

export default NavbarFloating;
