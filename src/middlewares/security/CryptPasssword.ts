import bcrypt from 'bcrypt';

class CryptPasssword {
    private readonly saltRounds: number = 10; 

    public async encrypt(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, this.saltRounds);
        return hashedPassword;
    }

    public async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
        const match = await bcrypt.compare(plainPassword, hashedPassword);
        return match;
    }
}

export default new CryptPasssword();
