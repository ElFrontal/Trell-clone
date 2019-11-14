class Note {
    constructor (id = null, content = '') {
        const instance = this
        const element = this.element = document.createElement('div')
        
        element.classList.add('note')
        element.setAttribute('draggable', 'true')
        element.textContent = content

        if (id) {
            element.setAttribute('data-note-id', id)
        }

        else {
            element.setAttribute('data-note-id', Note.idCounter)
            Note.idCounter++
        }


        element.addEventListener('dblclick', function (evt) {
            element.setAttribute('contenteditable', 'true')
            element.removeAttribute('draggable')
            instance.column.element.removeAttribute('draggable')
            element.focus()
        })
    
        element.addEventListener('blur', function (evt) {
            element.removeAttribute('contenteditable')
            element.setAttribute('draggable', 'true')
            instance.column.element.setAttribute('draggable', 'true')
    
            if (!element.textContent.trim().length) {
                element.remove()
            }

            Application.save()
        })
    
        element.addEventListener('dragstart', this.dragstart.bind(this))
        element.addEventListener('dragend', this.dragend.bind(this))
        element.addEventListener('dragenter', this.dragenter.bind(this))
        element.addEventListener('dragover', this.dragover.bind(this))
        element.addEventListener('dragleave', this.dragleave.bind(this))
        element.addEventListener('drop', this.drop.bind(this))
    }

        
    // геттер
    get column () {
        return this.element.closest('.column')
    }



    dragstart (evt) {
        Note.dragged = this.element
        this.element.classList.add('dragged')
    
        evt.stopPropagation()
    }

    dragend (evt) {
        evt.stopPropagation()

        Note.dragged = null
        this.element.classList.remove('dragged')
    
        document 
            .querySelectorAll('.note')
            .forEach( x => x.classList.remove('under'))

        Application.save()
    }

    dragenter (evt) {
        evt.stopPropagation()

        if (!Note.dragged || this.element === Note.dragged) {
            return
        }

        this.element.classList.add('under')
    }

    dragover (evt) {
        evt.preventDefault()
    
        if (!Note.dragged || this.element === Note.dragged) {
            return
        }
    }

    dragleave (evt) {
        evt.stopPropagation()

        if (!Note.dragged || this.element === Note.dragged) {
            return
        }

        this.element.classList.remove('under')
    }

    drop (evt) {
        evt.stopPropagation()
    
        if (this.element === Note.dragged) {
            return
        }
    
        if (this.element.parentElement === Note.dragged.parentElement) {
            const note = Array.from(this.element.parentElement.querySelectorAll('.note'))
            const indexA = note.indexOf(this.element)
            const indexB = note.indexOf(Note.dragged)
    
            if (indexA < indexB) {
                this.element.parentElement.insertBefore(Note.dragged, this.element)
            }
    
            else {
                this.element.parentElement.insertBefore(Note.dragged, this.element.nextElementSibling)
            }
        }
    
        else {
            this.element.parentElement.insertBefore(Note.dragged, this.element)
        }
    }
}

Note.idCounter = 8
Note.dragged = null


// const Note = {
//     idCounter: 8,
//     dragged: null,

// process (noteElement) {
    //     noteElement.addEventListener('dblclick', function (evt) {
    //         noteElement.setAttribute('contenteditable', 'true')
    //         noteElement.removeAttribute('draggable')
    //         noteElement.closest('.column').removeAttribute('draggable')
    //         noteElement.focus()
    //     })
    
    //     noteElement.addEventListener('blur', function (evt) {
    //         noteElement.removeAttribute('contenteditable')
    //         noteElement.setAttribute('draggable', 'true')
    //         noteElement.closest('.column').setAttribute('draggable', 'true')
    
    //         if (!noteElement.textContent.trim().length) {
    //             noteElement.remove()
    //         }

    //         Application.save()
    //     })
    
    //     noteElement.addEventListener('dragstart', Note.dragstart)
    //     noteElement.addEventListener('dragend', Note.dragend)
    //     noteElement.addEventListener('dragenter', Note.dragenter)
    //     noteElement.addEventListener('dragover', Note.dragover)
    //     noteElement.addEventListener('dragleave', Note.dragleave)
    //     noteElement.addEventListener('drop', Note.drop)
    // },

    // create (id = null, content = '') {
    //     const noteElement = document.createElement('div')
        
    //     noteElement.classList.add('note')
    //     noteElement.setAttribute('draggable', 'true')
    //     noteElement.textContent = content

    //     if (id) {
    //         noteElement.setAttribute('data-note-id', id)
    //     }

    //     else {
    //         noteElement.setAttribute('data-note-id', Note.idCounter)
    //         Note.idCounter++
    //     }

    //     Note.process(noteElement)
    
    //     return noteElement
    // },

    // dragstart (evt) {
    //     Note.dragged = this
    //     this.classList.add('dragged')
    
    //     evt.stopPropagation()
    // },

    // dragend (evt) {
    //     evt.stopPropagation()

    //     Note.dragged = null
    //     this.classList.remove('dragged')
    
    //     document 
    //         .querySelectorAll('.note')
    //         .forEach( x => x.classList.remove('under'))

    //     Application.save()
    // },

    // dragenter (evt) {
    //     evt.stopPropagation()

    //     if (!Note.dragged || this === Note.dragged) {
    //         return
    //     }

    //     this.classList.add('under')
    // },

    // dragover (evt) {
    //     evt.preventDefault()
    
    //     if (!Note.dragged || this === Note.dragged) {
    //         return
    //     }
    // },

    // dragleave (evt) {
    //     evt.stopPropagation()

    //     if (!Note.dragged || this === Note.dragged) {
    //         return
    //     }

    //     this.classList.remove('under')
    // },

    // drop (evt) {
    //     evt.stopPropagation()
    
    //     if (this === Note.dragged) {
    //         return
    //     }
    
    //     if (this.parentElement === Note.dragged.parentElement) {
    //         const note = Array.from(this.parentElement.querySelectorAll('.note'))
    //         const indexA = note.indexOf(this)
    //         const indexB = note.indexOf(Note.dragged)
    
    //         if (indexA < indexB) {
    //             this.parentElement.insertBefore(Note.dragged, this)
    //         }
    
    //         else {
    //             this.parentElement.insertBefore(Note.dragged, this.nextElementSibling)
    //         }
    //     }
    
    //     else {
    //         this.parentElement.insertBefore(Note.dragged, this)
    //     }
    // }
// }