
function RecordStoreAbstractInterface(){
    return {
        create,
        read,
        update,
        purge
    }
}

function create(id){throw new Error("Not implemented")};
function update(item){throw new Error("Not implemented")};
function read(item){throw new Error("Not implemented")};
function purge(item){throw new Error("Not implemented")};

export default RecordStoreAbstractInterface;
