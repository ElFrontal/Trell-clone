const Column = {
    idCounter: 4,
    dragged: null,

    process (columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]')
    
        spanAction_addNote.addEventListener('click', function (evt) {
            const noteElement = document.createElement('div')
            noteElement.classList.add('note')
            noteElement.setAttribute('draggable', 'true')
            noteElement.setAttribute('data-note-id', Note.idCounter)
    
            Note.idCounter++
    
            columnElement.querySelector('[data-notes]').append(noteElement)
            Note.process(noteElement)
    
            noteElement.setAttribute('contenteditable', 'true')
            noteElement.focus()
        })
    
        const headerElement = columnElement.querySelector('.column-header')
        headerElement.addEventListener('dblclick', function (evt) {
            headerElement.setAttribute('contenteditable', 'true')
            headerElement.focus()
        })
    
        headerElement.addEventListener('blur', function (evt) {
            headerElement.removeAttribute('contenteditable')
        })

        columnElement.addEventListener('dragstart', Column.dragstart)
        columnElement.addEventListener('dragend', Column.dragend)
        columnElement.addEventListener('dragenter', Column.dragenter)    
        columnElement.addEventListener('dragover', Column.dragover)
        columnElement.addEventListener('dragleave', Column.dragleave)    
        columnElement.addEventListener('drop', Column.drop)
    },

    dragstart (evt) {
        Column.dragged = this
        this.classList.add('dragged')
    
        evt.stopPropagation()
    },

    dragend (evt) {
        evt.stopPropagation()
        
        Column.dragged = null
        this.classList.remove('dragged')
    
        document 
            .querySelectorAll('.column')
            .forEach( x => x.classList.remove('under'))
    },

    dragenter (evt) {
        if (this === Column.dragged) {
            return
        }
        this.classList.add('under')
    },

    dragover (evt) {
        evt.preventDefault()
    
        if (this === Column.dragged) {
            return
        }
    },

    dragleave (evt) {
        if (this === Column.dragged) {
            return
        }
        this.classList.remove('under')
    },

    drop (evt) {
        evt.stopPropagation()

        if (Note.dragged) {
            return columnElement.querySelector('[data-notes]').append(Note.dragged)
        }
    
        if (this === Column.dragged) {
            return
        }
    
        if (this.parentElement === Column.dragged.parentElement) {
            const column = Array.from(this.parentElement.querySelectorAll('.column'))
            const indexA = column.indexOf(this)
            const indexB = column.indexOf(Column.dragged)
    
            if (indexA < indexB) {
                this.parentElement.insertBefore(Column.dragged, this)
            }
    
            else {
                this.parentElement.insertBefore(Column.dragged, this.nextElementSibling)
            }
        }
    
        else {
            this.parentElement.insertBefore(Column.dragged, this)
        }
    }
}

