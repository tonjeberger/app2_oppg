
function RecordStoreAbstractInterface(){
    return {
        create,
        read,
        update,
        purge
    }
}

function create(id){throw new Error("Not implemented")};
function update(note){throw new Error("Not implemented")};
function read(note){throw new Error("Not implemented")};
function purge(note){throw new Error("Not implemented")};

export default RecordStoreAbstractInterface;
