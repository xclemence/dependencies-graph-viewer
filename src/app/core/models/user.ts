export class User {
    name?: string;
    roles?: string[];

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
