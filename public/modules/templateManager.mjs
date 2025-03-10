const TemplateManager = {};

TemplateManager.fetchTemplate = async (path) => {

    //laster inn ekstern template
    let rawTemplate = await (await fetch(path)).text();
    //et hack for å gjøre det enklere å bruke templates dynamisk
    let div = document.createElement("div");
    div.innerHTML = rawTemplate;
    let template = div.firstChild;
    return template;

}

TemplateManager.cloneTemplate = (template, target) => {
    const clone = template.content.cloneNode(true);
    target.appendChild(clone);
    return clone;
}

export default TemplateManager;