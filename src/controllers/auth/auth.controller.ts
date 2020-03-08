import * as express from 'express'
import { Request, Response } from 'express'
import { SignUpBody, SignInBody } from 'model/auth.model'
import IControllerBase from 'controllers/inteface/IControllerBase.interface'
import { signIn, signOut, signUp } from './auth.service'

class AuthController implements IControllerBase {
    public path = '/auth'
    public router = express.Router()

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.post(this.path + '/signUp', this.doSignUp);
        this.router.post(this.path + '/signIn', this.doSignIn);
        this.router.post(this.path + '/signOut', this.doSignOut);
    }

    public doSignUp = (req: Request, res: Response) => {
        const body: SignUpBody = req.body
        signUp(body).then(signUpInformation => {
            res.status(201).send(signUpInformation);
        }).catch(error => {
            res.status(500).send({ error });
        });
    }

    public doSignIn = (req: Request, res: Response) => {
        const body: SignInBody = req.body;
        signIn(body).then(signInInformation => {
            res.status(200).send(signInInformation);
        }).catch(error => {
            res.status(500).send({ error });
        });
    }

    public doSignOut = (req: Request, res: Response) => {
        const authorization: string = req.header['authorization'];
        signOut(authorization).then(() => {
            res.status(200).send();
        }).catch(error => {
            res.status(500).send({ error });
        });
    }
}

export default AuthController