const Note = {
    idCounter: 8,
    dragged: null,

    process (noteElement) {
        noteElement.addEventListener('dblclick', function (evt) {
            noteElement.setAttribute('contenteditable', 'true')
            noteElement.removeAttribute('draggable')
            noteElement.closest('.column').removeAttribute('draggable')
            noteElement.focus()
        })
    
        noteElement.addEventListener('blur', function (evt) {
            noteElement.removeAttribute('contenteditable')
            noteElement.setAttribute('draggable', 'true')
            noteElement.closest('.column').setAttribute('draggable', 'true')
    
            if (!noteElement.textContent.trim().length) {
                noteElement.remove()
            }
        })
    
        noteElement.addEventListener('dragstart', Note.dragstart)
        noteElement.addEventListener('dragend', Note.dragend)
        noteElement.addEventListener('dragenter', Note.dragenter)
        noteElement.addEventListener('dragover', Note.dragover)
        noteElement.addEventListener('dragleave', Note.dragleave)
        noteElement.addEventListener('drop', Note.drop)
    },

    dragstart (evt) {
        Note.dragged = this
        this.classList.add('dragged')
    
        evt.stopPropagation()
    },

    dragend (evt) {
        Note.dragged = null
        this.classList.remove('dragged')
    
        document 
            .querySelectorAll('.note')
            .forEach( x => x.classList.remove('under'))
    },

    dragenter (evt) {
        if (this === Note.dragged) {
            return
        }
        this.classList.add('under')
    },

    dragover (evt) {
        evt.preventDefault()
    
        if (this === Note.dragged) {
            return
        }
    },

    dragleave (evt) {
        if (this === Note.dragged) {
            return
        }
        this.classList.remove('under')
    },

    drop (evt) {
        evt.stopPropagation()
    
        if (this === Note.dragged) {
            return
        }
    
        if (this.parentElement === Note.dragged.parentElement) {
            const note = Array.from(this.parentElement.querySelectorAll('.note'))
            const indexA = note.indexOf(this)
            const indexB = note.indexOf(Note.dragged)
    
            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this)
            }
    
            else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
            }
        }
    
        else {
            this.parentElement.insertBefore(Note.dragged, this)
        }
    }
}