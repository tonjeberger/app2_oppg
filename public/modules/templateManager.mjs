const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => { // funksjon som hører til TemplateManager, path vil være url/filbane
    try {
        //laster inn ekstern template
        let response = await fetch(path);
        let rawTemplate = await response.text(); // vil dette være html-filen? .text() gjør det om til text og det er dette rawTemplate vil inneholde
        
        let div = document.createElement("div");
        div.innerHTML = rawTemplate; // her blir teksten fra rawTemplate som ble hentet over lagt inn i html
        
        
        let template = div.querySelector("template");
        return template;
        
    } catch (error) {
        console.error("Error fetching template", error);
    }

}



TemplateManager.cloneTemplate = (template, target, data = {}) => {
    console.log("cloneTemplate ", template);
    const clone = template.content.cloneNode(true);
    console.log("cloneTemplate ", clone);
    for (let key of Object.keys(data)) {
        
        const note = clone.querySelector(`#note-${key}`);
        if(note){
            note.textContent = data[key];
            console.log("set ", key, "to", data[key]);
        }
    }

    const templateContainer = document.createElement("div");
    templateContainer.className = "template-container";

    while (clone.firstChild) {
        templateContainer.appendChild(clone.firstChild);
    }
    
    target.innerHTML = "";
    target.appendChild(templateContainer);
    console.log("Template container: ", clone);
    return templateContainer;
}

export default TemplateManager;