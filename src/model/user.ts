import {ObjectId} from 'mongodb'

export default class User {
    constructor(public name: string, public age: number, public major: string, public id?: ObjectId) {}
}