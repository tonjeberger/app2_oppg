export const addNote = (title, content) => {
    notes.push({
        id: notes.length + 1,
        title,
        content
    })
}




const notes =[
    {
        id: 1,
        title: 'Note 1',
        content: 'Content of note 1'},
    {
        id: 2,
        title: 'Note 2',
        content: 'Content of note 2'}
]