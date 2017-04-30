const { graphql } = require('graphql');
import User from '../schema/user';
import UserInput from '../schema/userInput';
import { default as usersService, IUser } from '../services/users';

export default {
    type: User,
    description: "Add user",
    args: {
        user: {
            type: UserInput
        }
    },
    resolve: (value: any, { user }: { user: any }) => {
        return usersService.addUser(user);
    }
}