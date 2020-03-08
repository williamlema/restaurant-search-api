import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'controllers/inteface/IControllerBase.interface';
import { searchByCity } from './searcher.service';

class SearcherController implements IControllerBase {
    public path = '/search'
    public router = express.Router()

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get(this.path + '/:name', this.byCity);
    }

    public byCity = (req: Request, res: Response) => {
        searchByCity(req.param.name).then(restaurants => {
            res.status(200).send(restaurants);
        }).catch(error => {
            res.status(500).send({ error });
        });
    }

}

export default SearcherController