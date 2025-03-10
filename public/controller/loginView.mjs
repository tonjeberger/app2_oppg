import TemplateManager from "../modules/templateManager.mjs";

// import TemplateManager from "./modules/templateManager.mjs";
const templateFile = "loginView.html";

const template = TemplateManager.fetchTemplate(templateFile);

const loginView = TemplateManager.cloneTemplate(template, document.body);// vi skal ikke sende det til document.body, bare viser noe her i guess?
// om vi vil ha flere views kan bi bare klone template igjen

loginView.getElementById("button").onclick = (evt) => {
    console.log("Button clicked");
}

LoginViewController = {
    view: loginView,
};

export default LoginViewController;