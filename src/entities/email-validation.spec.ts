import { Email } from './email';

describe('Email validation', () => {

    test('should accept valid email', () => {
        const email = 'any@mail.com';
        expect(Email.validate(email)).toBeTruthy()
    })

    test('should not accept null strings', () => {
        const email = null;
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept empty strings', () => {
        const email = '';
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept strings larger than 320 chars', () => {
        const email = 'l'.repeat(64) + '@' + 'd'.repeat(128) + '.' +'d'.repeat(127);
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept domain parte larger than 255 chars', () => {
        const email = 'local@' + 'd'.repeat(128) + '.' + 'd'.repeat(127);
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept local parte larger than 64 chars', () => {
        const email = 'l'.repeat(65) + '@mail.com';
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept empty local parte', () => {
        const email = '@mail.com';
        expect(Email.validate(email)).toBeFalsy()
    })

    test('should not accept empty domain', () => {
        const email = 'any@';
        expect(Email.validate(email)).toBeFalsy()
    })
});