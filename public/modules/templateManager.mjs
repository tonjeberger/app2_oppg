const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => {
    try {
        let response = await fetch(path);
        let rawTemplate = await response.text();
        
        let div = document.createElement("div");
        div.innerHTML = rawTemplate;         
        
        let template = div.querySelector("template");
        return template;
        
    } catch (error) {
        console.error("Error fetching template", error);
    }

}



TemplateManager.cloneTemplate = (template, target, data = {}) => {
    const clone = template.content.cloneNode(true);
    for (let key of Object.keys(data)) {
        
        const note = clone.querySelector(`#note-${key}`);
        if(note){
            note.textContent = data[key];
        }
    }

    const templateContainer = document.createElement("div");
    templateContainer.className = "template-container";

    while (clone.firstChild) {
        templateContainer.appendChild(clone.firstChild);
    }
    
    target.innerHTML = "";
    target.appendChild(templateContainer);
    return templateContainer;
}

export default TemplateManager;