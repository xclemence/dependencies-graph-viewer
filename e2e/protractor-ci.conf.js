var config = exports.config = require('./protractor.conf.js').config;

config.capabilities.chromeOptions.args = ['--headless', '--disable-gpu', '--window-size=800,600', '--no-sandbox'];
