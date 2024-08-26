const isProduction = process.env.NODE_ENV === 'production';

// Validar si hay un puerto en la URL
const port = window.location.port;
const hasPort = Boolean(port);

const baseDomain = window.location.protocol + '//' + window.location.host.replace(/:\d+/, '');

const baseDomainWithPort = hasPort ? `${baseDomain}:${port}` : `${baseDomain}`;

const BASE_URL = /* isProduction ? '' :  */'/';

const config = {
    BASE_URL,
    baseDomain,
    baseDomainWithPort,
    showConsoleLogs: !isProduction,
    nameProject: 'Portfolio'
    // Agrega aquí otras variables de configuración si es necesario
};
export default config;