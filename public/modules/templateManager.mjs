const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => { // funksjon som hører til TemplateManager, path vil være url/filbane

    //laster inn ekstern template
    let rawTemplate = await (await fetch(path)).text(); // vil dette være html-filen? .text() gjør det om til text og det er dette rawTemplate vil inneholde
    //et hack for å gjøre det enklere å bruke templates dynamisk
    let div = document.createElement("div");
    div.innerHTML = rawTemplate; // her blir teksten fra rawTemplate som ble hentet over lagt inn i html
    let template = div.firstChild;
    return template;

}

TemplateManager.cloneTemplate = (template, target, data = {}) => {
    const clone = template.content.cloneNode(true);
    let html = clone.innerHTML;
    console.log("cloneTemplate ", clone);
    
    // for(let key of Object.keys(data)){
    //     // html = html.replaceAll(RegExp(`/\{\{${key}\}\}/gm`, data[key]));
    //     html = html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), data[key]);
    // }// må se mer på denne koden når jeg ser forelesningen på nytt
    for (let key of Object.keys(data)) {
        console.log("key ", key);
        console.log("data ", data);
        console.log("data[key] ", data[key]);
        const note = clone.querySelector(`#note-${key}`);
        if(note){
            note.textContent = data[key];
            html = note.textContent;
        }
        console.log("note ", note);
        // html = html.replaceAll(RegExp(`/\{\{${key}\}\}/gm`, data[key]));
    }

    clone.innerHTML = html;
    target.appendChild(clone);
    console.log("cloneTemplate again ", clone);
    return clone;
}

// TemplateManager.cloneTemplate = (template, target, data = {}) => {
//     const clone = template.content.cloneNode(true);

//     // Iterate over the keys in the data object
//     for (let key of Object.keys(data)) {
//         // Find the element with the corresponding ID and set its text content
//         const element = clone.querySelector(`#note-${key}`);
//         if (element) {
//             element.textContent = data[key];
//         }
//     }

//     target.appendChild(clone);
//     return clone;
// }
export default TemplateManager;