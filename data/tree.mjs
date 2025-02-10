
const Tree = function(root) { // dette er en type konstruktør, en klasse
    return {root};
}

// vi vet ikke hvor mange noder vi trenger, så vi lager en funksjon for det
const Node = function(data, ...connections){
    return{data, connections:[...connections]}
} ///... er restoperator og spreadoperator. som parameter i funksjonen betyr det at vi kan ha uendelig mange parametere
// i returnen betyr det noe litt annet

export {Tree, Node}