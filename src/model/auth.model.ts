export class SignUpBody {
    fullname: string;
    email: string;
    password: string;
}

export class SignInBody {
    email: string;
    password: string;
}

export class SignInResponse {
    token: string;
}