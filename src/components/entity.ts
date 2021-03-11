export interface IEntity {
    update(time: number);
    init(...args: unknown[]);
}

export class BaseEntity<P = Record<string, unknown>> implements IEntity {
    constructor(params: P) {
        this.init(params);
    }

    update(time: number) {}

    init(params: P) {}
}
