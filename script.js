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
        const columnElement = Column.create()
        document.querySelector('.columns').append(columnElement)

        Application.save()
    })