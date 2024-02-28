import type { Mission } from 'typings/Mission';

export default class LSSMStorage {
    readonly #DB_NAME = `${PREFIX}-storage-v2`;

    #db: IDBDatabase | null = null;

    async #upgradeDB({ oldVersion }: IDBVersionChangeEvent) {
        if (!this.#db) return;

        const transactions: Promise<void>[] = [];

        const addTransaction = (transaction: IDBTransaction) =>
            transactions.push(
                new Promise<void>(resolve =>
                    transaction.addEventListener('complete', () => resolve())
                )
            );

        // In version 1, we introduced storing missionTypes
        if (oldVersion < 1) {
            addTransaction(
                this.#db.createObjectStore('missionTypes', { keyPath: 'id' })
                    .transaction
            );
        }

        await Promise.all(transactions);
    }

    #setDB(db: IDBDatabase) {
        if (this.#db) return;
        this.#db = db;
    }

    #openDB() {
        if (this.#db) return Promise.resolve(this.#db);
        return new Promise<IDBDatabase>((resolve, reject) => {
            const request = indexedDB.open(this.#DB_NAME, 1);

            let upgradeNeeded = false;

            request.addEventListener('success', () => {
                if (upgradeNeeded) return;
                this.#setDB(request.result);
                return resolve(request.result);
            });
            request.addEventListener('error', () => reject(request.error));

            request.addEventListener('upgradeneeded', async event => {
                upgradeNeeded = true;
                this.#setDB(request.result);
                await this.#upgradeDB(event);
                return resolve(request.result);
            });
        });
    }

    #closeDB() {
        if (this.#db) this.#db.close();
        this.#db = null;
    }

    // region missionTypes
    public storeMissionTypes(missionTypes: Record<Mission['id'], Mission>) {
        return this.#openDB()
            .then(db => {
                const tx = db.transaction('missionTypes', 'readwrite');
                const store = tx.objectStore('missionTypes');
                Object.values(missionTypes).forEach(missionType => {
                    store.put(missionType);
                });
                return new Promise<void>((resolve, reject) => {
                    tx.addEventListener('complete', () => resolve());
                    tx.addEventListener('error', () => reject(tx.error));
                });
            })
            .finally(() => this.#closeDB());
    }

    public getMissionTypes() {
        return this.#openDB()
            .then(db => {
                const tx = db.transaction('missionTypes', 'readonly');
                const store = tx.objectStore('missionTypes');
                const request = store.getAll();
                return new Promise<Mission[]>((resolve, reject) => {
                    request.addEventListener('success', () =>
                        resolve(request.result)
                    );
                    request.addEventListener('error', () =>
                        reject(request.error)
                    );
                });
            })
            .then(missionTypes => {
                // indexedDB returns an array, so we need to convert it to an object
                const missionTypesObject: Record<Mission['id'], Mission> = {};
                missionTypes.forEach(missionType => {
                    missionTypesObject[missionType.id] = missionType;
                });
                return missionTypesObject;
            })
            .finally(() => this.#closeDB());
    }
    // endregion
}
