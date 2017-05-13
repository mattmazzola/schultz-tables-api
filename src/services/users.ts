import * as docdb from 'documentdb'
import * as docdbUtil from '../utilities/docdb'

export interface IUser {
    id: string
    name: string
    email: string
}

export class Service {
    client: docdb.DocumentClient
    database: docdb.DatabaseMeta
    collection: docdb.CollectionMeta

    constructor(documentClient: docdb.DocumentClient, database: docdb.DatabaseMeta, collection: docdb.CollectionMeta) {
        this.client = documentClient
        this.database = database
        this.collection = collection
    }

    getUsers(): Promise<IUser[]> {
        const querySpec: docdb.SqlQuerySpec = {
            query: 'SELECT * FROM root',
            parameters: []
        }

        return new Promise<docdb.RetrievedDocument[]>((res, rej) => this.client.queryDocuments(this.collection._self, querySpec).toArray((e, s) => e ? rej(e) : res(s)))
            .then(userDocuments => userDocuments.map(userDocument => ({
                id: userDocument.id,
                name: userDocument.name,
                email: userDocument.email
            })));
    }

    addUser(user: IUser) {
        return new Promise((resolve, reject) => this.client.createDocument(this.collection._self, user, (error, created) => error ? reject(error) : resolve(created)))
            .then(x => {
                return user
            })
            .catch(e => {
                throw new Error(e.body)
            })
    }
}

export default Service