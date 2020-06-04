const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

module.exports = (app, configFile) => {
    const compiler = webpack(configFile);
    app.use(webpackDevMiddleware(compiler, {
        publicPath: configFile.output.publicPath
    }));
} 