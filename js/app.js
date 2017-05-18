$(document).foundation()

const megaroster = {
    students: [],

    init() {
        this.studentList = document.querySelector('#student-list')
        this.max = 0
        this.setupEventListeners()
    },

    setupEventListeners() {
        document
            .querySelector('#new-student')
            .addEventListener('submit', this.addStudent.bind(this))
    },

    addStudent(ev) {
        ev.preventDefault()
        const f = ev.target
        const student = {
            id: this.max + 1,
            name: f.studentName.value
        }

        this.students.unshift(student)

        const listItem = this.buildListItem(student)
        this.prependChild(this.studentList, listItem)
        
        this.max ++
        f.reset()

        localStorage.setItem('roster', JSON.stringify(this.students))
    },

    prependChild(parent, child) {
        parent.insertBefore(child, parent.firstChild)
    },

    buildListItem(student) {
        const template = document.querySelector('.student.template')
        const li = template.cloneNode(true)
        li.querySelector('.student-name').textContent = student.name
        li.dataset.id = student.id
        this.removeClassName(li, 'template')

        li
            .querySelector('button.remove')
            .addEventListener('click', this.removeStudent.bind(this))
        return li
    },

    removeStudent(ev) {
        const btn = ev.target
        const name = btn.closest('.student')
        name.remove()
        const id = name.getAttribute('data-id')
        const index = this.findName(id)
        this.students.splice(index , 1)
    },

    findName(index) { 
        for (let i = 0; i < this.students.length; i ++){
            if (this.students[i].id == index)
                {
                    return i
                }
            
        }
    },

    removeClassName(el, className) {
        el.className = el.className.replace(className, '').trim()
    }
}
megaroster.init()