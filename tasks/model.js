export class Task {
    static _last_id: number = 1;
    static STATUS: Object<string, number> = {
        new: 1,
        deleted: 2,
        done: 3,
        archived: 4,
    };
    static DEFAULT_STATUS: number = 1;

    constructor(name: string) {
        this.id = Task._last_id++;
        this.key = this.id;
        this.name = name;
        this.status = Task.DEFAULT_STATUS;
    }
}
