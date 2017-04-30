export interface IUser {
    id: string
    name: string
    email: string
}

const users: IUser[] = [
    {
        id: "abc123",
        name: "User 1",
        email: "user1@gmail.com"
    },
    {
        id: "abc456",
        name: "User 2",
        email: "user2@gmail.com"
    }
];

export default {
    getUsers(): IUser[] {
        return users;
    },

    addUser(user: IUser) {
        users.push(user);
        return user;
    }
}