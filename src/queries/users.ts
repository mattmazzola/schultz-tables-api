const graphql = require('graphql');
import user from '../schema/user';
import { default as usersService, IUser } from '../services/users';

export default {
    type: new graphql.GraphQLList(user),
    description: "Retrieve list of users",
    resolve: () => {
        return usersService.getUsers();
    }
}