import { getRepository } from "typeorm";
import { User } from "../../entity/user";
import { SignUpBody, SignInBody } from "model/auth.model";
import { SessionToken } from "../../entity/sessionToken";

export const signUp = async (
    signUpInformation: SignUpBody
) => {
    const { fullname, email, password } = signUpInformation;
    const userRepository = await getRepository(User);

    let signuped = await userRepository.find({ email });

    if (!signuped) {
        throw `User ${email} already signUp`;
    }

    let newSignUd = new User();
    newSignUd.fullname = fullname;
    newSignUd.email = email;
    newSignUd.password = password;

    await userRepository.save(newSignUd);
    return newSignUd;
};

export const signIn = async (
    signIpInformation: SignInBody
) => {
    const { email, password } = signIpInformation;
    const userRepository = await getRepository(User);
    const sessionTokenRepository = await getRepository(SessionToken);

    let users = await userRepository.find({ email, password });

    if (!users || users.length === 0) {
        throw `Credential error`;
    }

    let sessionToken = new SessionToken();
    sessionToken.idUser = users[0].id;
    sessionToken.isActive = true;

    sessionToken = await sessionTokenRepository.save(sessionToken);
    return { token: sessionToken.id};
};

export const signOut = async (
    token: string
) => {
    const sessionTokenRepository = await getRepository(SessionToken);

    let activeSession = await sessionTokenRepository.findOne(token);

    activeSession.isActive = false;

    await sessionTokenRepository.save(activeSession);
    return;
};
