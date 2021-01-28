import { UserData } from "../../../../src/entities";
import { InMemoryUserRepository } from "./";


describe('In memory User repository', () => {
    test('should return null if user is not found', async () => {
        const users: UserData[] = []
        const systemUnderTest = new InMemoryUserRepository(users)
        const user = await systemUnderTest.findUserByEmail('any@mail.com');
        expect(user).toBeNull()
    })

    test('should return user if it is found in te repository', async () => {
        const users: UserData[] = []
        const name = 'any_name'
        const email = 'any@mail.com'
        const systemUnderTest = new InMemoryUserRepository(users)

        await systemUnderTest.add({name, email})
        const user = await systemUnderTest.findUserByEmail(email);
        expect(user.name).toBe(name)
    })

    test('should return all users in repository', async () => {
        const users: UserData[] = [
            {name: 'any_name', email: 'any@mail.com'},
            {name: 'second_name', email: 'second@mail.com'}
        ]

        const systemUnderTest = new InMemoryUserRepository(users)
        const returnedUsers = await systemUnderTest.findAllUsers()
        expect(returnedUsers.length).toBe(2)
    })
})