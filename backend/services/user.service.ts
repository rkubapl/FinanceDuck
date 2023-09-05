import User, {IUser} from "../models/User";
import bcrypt from 'bcrypt';

export default class UserService {
    public async register(name: string, email: string, password: string) {
        //TODO: add checking if user with that email exists
        const createUser : IUser = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        })

        return createUser;
    }

    // public async login(email: string, password: string) {
    //     //TODO: add checking if user with that email exists
    //     const user: IUser = User.findOne({
    //         where: {
    //             email: email
    //         }
    //     })
    //
    //     if(!user) return {"nouser": true}
    //
    //
    //     const isPasswordValid = bcrypt.compareSync(password, user.password);
    //
    //
    //     if(!isPasswordValid) {
    //
    //     }
    //
    //
    //     const createUser : IUser = await User.f({
    //         email,
    //         password: this.generateHash(password)
    //     })
    //
    //     return createUser;
    // }
}