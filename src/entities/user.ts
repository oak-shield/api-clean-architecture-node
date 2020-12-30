import { InvalidEmailError } from './errors/InvalidEmailError';
import { InvalidNameError } from './errors/InvalidNameError';
import { Either, left } from './../shared/either';
import { UserData } from "./user-data";
import { Email } from './email';
import { Name } from './name';

export class User {
    static create(userData: UserData): Either<InvalidNameError | InvalidEmailError, User>{
        const emailOrError = Email.create(userData.email)
        const nameOrError = Name.create(userData.name)

        if(nameOrError.isLeft()) {
            return left(new InvalidNameError())
        }

        if(emailOrError.isLeft()) {
            return left(new InvalidEmailError())
        }
    }
}