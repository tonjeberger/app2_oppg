export const addNote = (title, content) => {
    notes.push({
        id: notes.length + 1,
        title,
        date: new Date(),
        content
    })
}




const notes =[
    {
        id: 1,
        title: 'Note 1',
        date: "02-03-2025",
        content: 'Content of note 1'
    },
    {
        id: 2,
        title: 'Note 2',
        date: "02-03-2025",
        content: 'Content of note 2'
    }
];