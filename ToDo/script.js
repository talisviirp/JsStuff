// TO-DO list script
var counter = 0

function addTask(event) {
    event.preventDefault();
    counter++
    const toDo = document.getElementById('list-of-tasks')
    const done = document.getElementById('completed-tasks')

    var input = document.querySelector('input').value
    var li = document.createElement('li')
        li.id = counter
    var btn = document.createElement('button') 
        btn.id = counter
        btn.innerHTML = "Done"
    
    li.innerHTML = input
    toDo.appendChild(li)
    li.appendChild(btn)
    btn.addEventListener('click', () => {
        if (btn.id === li.id) {
            toDo.removeChild(li)
            li.removeChild(btn)
            done.appendChild(li)
        }
    })
}
