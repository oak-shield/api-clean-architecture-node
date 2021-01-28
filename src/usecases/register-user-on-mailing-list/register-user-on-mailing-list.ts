import { InvalidEmailError, InvalidNameError } from '@/entities/errors';
import { UserData, User } from '@/entities';
import { Either, left, right } from '@/shared';
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports';

export class RegisterUserOnMailingList {
    private readonly userReop: UserRepository

    constructor(userRepo: UserRepository){
        this.userReop = userRepo
    }

    public async registerUserOnMailingList(request: UserData):
    Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
         const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
         if(userOrError.isLeft()) {
            return left(userOrError.value);
         }

         if(!(await this.userReop.exists(request))) {
             await this.userReop.add(request)
         }

         return right(request);
    }
}