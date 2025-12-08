export type CacheEntry<T> = {
    createdAt: number;
    val: T;
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(cacheClearInterval:number) {
    this.#interval = cacheClearInterval;
    this.#startReapLoop();
  }

  add<T>(key: string, val: T) {
    const entry: CacheEntry<typeof val> = {
        createdAt: Date.now(),
        val: val,
    }
    this.#cache.set(key, entry);
  }

  get<T>(key: string): any {
    const result = this.#cache.get(key);
    if (result === undefined) {
        return undefined;
    } else {
        return result.val;
    }
  }

  #reap() {
    for (const key of this.#cache.keys()) {
      const testEntry = this.#cache.get(key);
      if (testEntry != undefined) {
        if(testEntry.createdAt <= Date.now() - this.#interval) {
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