
function RecordStoreAbstractInterface(){
    return {
        create,
        read,
        update,
        purge
    }
}

function create(note){throw new Error(" 'create' is not implemented")};
function update(note){throw new Error("'update' is not implemented")};
function read(note){throw new Error("'read' is not implemented")};
function purge(note){throw new Error("'delete' is not implemented")};

export default RecordStoreAbstractInterface;
