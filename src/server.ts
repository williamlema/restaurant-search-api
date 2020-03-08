import App from './app';

import * as bodyParser from 'body-parser';

import loggerMiddleware from './middleware/logger';
import AuthController from './controllers/auth/auth.controller';
import SearcherController from './controllers/searcher/searcherController';

const app = new App({
    port: 3200,
    controllers: [
        new AuthController(),
        new SearcherController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen();