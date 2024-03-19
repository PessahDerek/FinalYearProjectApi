import bcrypt from 'bcrypt'

export const encryptString = (text: string): string => {
    return bcrypt.hashSync(text, 10)
}

export const compareWithHash = (string: string, hash: string) => {
    return bcrypt.compareSync(string, hash)
}
