
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js"); // Register the service worker, js-filen. dette er ikke en modul, så den har vi bare kalr .js
}// kan sees på som ett event som lytter etter en serviceWorker, og når den finner en så registrerer den den

//navigator -> browser
//serviceWorker -> en unik bckground worker som kan kjøre i bakgrunnen, kan bare kjøre en SW
const noteContainer = document.getElementById("note-container");
const newNoteBtn = document.getElementById("new-note-btn");

