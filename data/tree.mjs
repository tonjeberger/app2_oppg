
export const Tree = function(root) { 
    return {root};
}

export const Node = function(data, ...connections){
    return{data, connections:[...connections]}
}


export function saveTree(tree){
    return JSON.stringify(tree, null, 3);
}

export function inflateTree(data){
    return JSON.parse(data);
}
