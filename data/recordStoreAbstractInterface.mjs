class RecordStoreAbstractInterface {
    create(note) {
        throw new Error("'create' is not implemented");
    }
    update(note) {
        throw new Error("'update' is not implemented");
    }
    read(note) {
        throw new Error("'read' is not implemented");
    }
    purge(note) {
        throw new Error("'purge' is not implemented");
    }
}

export default RecordStoreAbstractInterface;
