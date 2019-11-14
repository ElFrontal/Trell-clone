// document
//     .querySelectorAll('.column')
//     .forEach(Column.process)

// document
//     .querySelectorAll('.note')
//     .forEach(Note.process)

Application.load()

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', function (evt) {
        const column = new Column
        document.querySelector('.columns').append(column.element)

        Application.save()
    })