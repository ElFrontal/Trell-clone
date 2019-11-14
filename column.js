class Column {
    constructor (id = null) {
        const instance = this
        this.notes = []

        const element = this.element = document.createElement('div')
        element.classList.add('column')
        element.setAttribute('draggable', 'true')

        if (id) {
            element.setAttribute('data-column-id', id)
        }

        else {
            element.setAttribute('data-column-id', Column.idCounter)
            Column.idCounter++
        }

        element.innerHTML = 
        `<p class="column-header">В плане</p>
        <div data-notes></div>
        <p class="column-footer">
            <span data-action-addNote class="action">+ Добавить карточку</span>
        </p>`


        const spanAction_addNote = element.querySelector('[data-action-addNote]')
    
        spanAction_addNote.addEventListener('click', function (evt) {
            const note = new Note
            instance.add(note)
    
            // добавляем элемент в список заметок
            // element.querySelector('[data-notes]').append(note.element)
    
            note.element.setAttribute('contenteditable', 'true')
            note.element.focus()
        })
    
        const headerElement = element.querySelector('.column-header')
        headerElement.addEventListener('dblclick', function (evt) {
            headerElement.setAttribute('contenteditable', 'true')
            headerElement.focus()
        })
    
        headerElement.addEventListener('blur', function (evt) {
            headerElement.removeAttribute('contenteditable')
        })

        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))
   
        element.addEventListener('dragover', this.dragover.bind(this))
           
        element.addEventListener('drop', this.drop.bind(this))
    }

    add (...notes) {
        for (const note of notes) {
            if (!this.notes.includes(note)) {
                this.notes.push(note)

                this.element.querySelector('[data-notes').append(note.element)
            }
        }
    }

    dragstart (evt) {
        Column.dragged = this.element
        Column.dragged.classList.add('dragged')
    
        evt.stopPropagation()

        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
    }

    dragend (evt) {
        Column.dragged.classList.remove('dragged')
        Column.dragged = null
        Column.dropped = null
    
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', 'true'))
        
        document    
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
        
        Application.save()
    }

    dragover (evt) {
        evt.preventDefault()
        evt.stopPropagation()

        if (Column.dragged === this.element ) {
            if (Column.dropped) {
                Column.dropped.classList.remove('under')
            }
            Column.dropped = null
        }
    
        if (!Column.dragged || this.element === Column.dragged) {
            return
        }

        Column.dropped === this.element

        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
        this.element.classList.add('under')
    }

    drop (evt) {

        evt.stopPropagation()

        if (Note.dragged) {
        return this.element.querySelector('[data-notes]').append(Note.dragged)
        }
       
        else if (Column.dragged) {
            const children = Array.from(document.querySelector('.columns').children)
            const indexA = children.indexOf(this.element)
            const indexB = children.indexOf(Column.dragged)

            if (indexA < indexB) {
                // вставить перетаскиваемую колонку перед тем элементом над которым дропнули
                document.querySelector('.columns').insertBefore(Column.dragged, this.element)
            }

            else {
                //перед его следующим соседом
                document.querySelector('.columns').insertBefore(Column.dragged, this.element.nextElementSibling)
            }

            document
                .querySelectorAll('.column')
                .forEach(columnElement => columnElement.classList.remove('under'))
        }
    }
}

Column.idCounter = 4
Column.dragged = null
Column.dropped = null


// const Column = {
//     idCounter: 4,
//     dragged: null,
//     dropped: null,

    // process (columnElement) {
    //     const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')
    
    //     spanAction_addNote.addEventListener('click', function (evt) {
    //         const noteElement = Note.create()
    
    //         // добавляем элемент в список заметок
    //         columnElement.querySelector('[data-notes]').append(noteElement)
    
    //         noteElement.setAttribute('contenteditable', 'true')
    //         noteElement.focus()
    //     })
    
    //     const headerElement = columnElement.querySelector('.column-header')
    //     headerElement.addEventListener('dblclick', function (evt) {
    //         headerElement.setAttribute('contenteditable', 'true')
    //         headerElement.focus()
    //     })
    
    //     headerElement.addEventListener('blur', function (evt) {
    //         headerElement.removeAttribute('contenteditable')
    //     })

    //     columnElement.addEventListener('dragstart', Column.dragstart)
    //     columnElement.addEventListener('dragend', Column.dragend)
   
    //     columnElement.addEventListener('dragover', Column.dragover)
           
    //     columnElement.addEventListener('drop', Column.drop)
    // },

    // create (id = null) {
    //     const columnElement = document.createElement('div')
    //     columnElement.classList.add('column')
    //     columnElement.setAttribute('draggable', 'true')

    //     if (id) {
    //         columnElement.setAttribute('data-column-id', id)
    //     }

    //     else {
    //         columnElement.setAttribute('data-column-id', Column.idCounter)
    //         Column.idCounter++
    //     }

    //     columnElement.innerHTML = 
    //     `<p class="column-header">В плане</p>
    //     <div data-notes></div>
    //     <p class="column-footer">
    //         <span data-action-addNote class="action">+ Добавить карточку</span>
    //     </p>`

    //     Column.process(columnElement)

    //     return columnElement
    // },

//     dragstart (evt) {
//         Column.dragged = this
//         this.classList.add('dragged')
    
//         evt.stopPropagation()

//         document
//             .querySelectorAll('.note')
//             .forEach(noteElement => noteElement.removeAttribute('draggable'))
//     },

//     dragend (evt) {
//         evt.stopPropagation()

//         this.classList.remove('dragged')
//         Column.dragged = null
//         Column.dropped = null
    
//         document
//             .querySelectorAll('.note')
//             .forEach(noteElement => noteElement.setAttribute('draggable', 'true'))

//         Application.save()
//     },

//     dragover (evt) {
//         evt.preventDefault()
//         evt.stopPropagation()

//         if (Column.dragged === this ) {
//             if (Column.dropped) {
//                 Column.dropped.classList.remove('under')
//             }
//             Column.dropped = null
//         }
    
//         if (!Column.dragged || this === Column.dragged) {
//             return
//         }

//         Column.dropped === this

//         document
//             .querySelectorAll('.column')
//             .forEach(columnElement => columnElement.classList.remove('under'))
//         this.classList.add('under')
//     },

//     drop (evt) {

//         evt.stopPropagation()

//         if (Note.dragged) {
//         return this.querySelector('[data-notes]').append(Note.dragged)
//         }
       
//         else if (Column.dragged) {
//             const children = Array.from(document.querySelector('.columns').children)
//             const indexA = children.indexOf(this)
//             const indexB = children.indexOf(Column.dragged)

//             if (indexA < indexB) {
//                 // вставить перетаскиваемую колонку перед тем элементом над которым дропнули
//                 document.querySelector('.columns').insertBefore(Column.dragged, this)
//             }

//             else {
//                 //перед его следующим соседом
//                 document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
//             }

//             document
//                 .querySelectorAll('.column')
//                 .forEach(columnElement => columnElement.classList.remove('under'))
//         }
//     }
// }

