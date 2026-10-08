const nodeEnv = process.env.NODE_ENV || 'production';
const port = Number.parseInt(process.env.PORT || '3000', 10);

if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error('PORT must be an integer between 0 and 65535');
}

const config = Object.freeze({
    nodeEnv,
    port,
    isDevelopment: nodeEnv.includes('dev'),
});

export default config;
