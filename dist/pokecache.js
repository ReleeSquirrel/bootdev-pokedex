export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(cacheClearInterval) {
        this.#interval = cacheClearInterval;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val: val,
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        const result = this.#cache.get(key);
        if (result === undefined) {
            return undefined;
        }
        else {
            return result.val;
        }
    }
    #reap() {
        for (const key of this.#cache.keys()) {
            const testEntry = this.#cache.get(key);
            if (testEntry != undefined) {
                if (testEntry.createdAt <= Date.now() - this.#interval) {
                    this.#cache.delete(key);
                }
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalId = setInterval(this.#reap.bind(this), this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
