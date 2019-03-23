export class User {
    public name: string;
    public roles: string[];

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
