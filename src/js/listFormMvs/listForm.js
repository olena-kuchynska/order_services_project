export default class ListForm {
    constructor(view) {
        this.view = view;
    }

    getTasks() {    
        fetch('/tasks')
        .then(infoTasks => infoTasks.json())
        .then(infoTasks => this.view.showTaskList(infoTasks))
        .catch(err => console.error(`Connection Error:${err}`));
    }

    deleteTask(currentTask) {
        fetch(`/tasks/${currentTask.id}`, {
                method: 'DELETE'
            })
        .then(response => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }
}