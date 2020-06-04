export default class TaskForm {
    constructor(view) {
        this.view = view;
        this.services;
        this.currentTask;
    }

    getServices(currentTask) {
        fetch('/services')
        .then(infoServices => infoServices.json())
        .then(infoServices => {
            this.services = infoServices;
            this.view.showServices(infoServices);
            if(currentTask) {
                this.getCurrentTask(currentTask);
            }          
        })
        .catch(err => console.error(`Connection Error:${err}`));
    }

    getCurrentTask(currentTask) {
        fetch(`/tasks/${currentTask.id}`)
        .then(infoServices => infoServices.json())
        .then(infoServices => {
            this.currentTask = currentTask.id;
            this.view.loadEditForm(infoServices, this.services);            
        })
        .catch(err => console.error(`Connection Error:${err}`));      
    }

    getLocation() {
        fetch('/location')
        .then(infoLocation => infoLocation.json())
        .then(infoLocation => {
            this.view.loadLocation(infoLocation);            
        })
        .catch(err => console.error(`Connection Error:${err}`));
    }   

    addTask(task) {
        if(task.typeOfService && task.location) {         
            fetch('/tasks', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(task)
            })
            .then(response => response)
            .catch(err => console.error(`Connection Error:${err}`));
        } else {
            alert('Enter all data, please!!');
        }
    }

    editTask(task) { 
        fetch(`/tasks/${this.currentTask}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                    },
                body: JSON.stringify(task)
        })
        .then(response => response)
        .catch(err => console.error(`Connection Error:${err}`));
    }

}