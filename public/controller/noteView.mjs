import TemplateManager from "../modules/templateManager.mjs";

// import TemplateManager from "./modules/templateManager.mjs";
const templateFile = "./views/noteView.html"; // dette skal være path til html-filen

const template = await TemplateManager.fetchTemplate(templateFile);

// skal legge ved data i app.mjs?

async function showNoteView(id){

    const listNotes = await TemplateManager.cloneTemplate(template, document.getElementById("note-container"), {id});
    console.log("shownoteview ", listNotes);

    // han la en funksjon inne her igjen som brukte id til noe, men tror ikke han la noe inn der
    //something something
//   #note-title for å hente ut tittel-element, og så må det settes til tittelen til notatet
    return listNotes;
}

// listNotesController = {
//     view: listNotes,
// };

export default showNoteView;