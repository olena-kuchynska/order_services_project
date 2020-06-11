export default class TaskFormControll {
    constructor(model, view, subscribers) {
        this.model = model;
        this.view = view;
        this.subscribers = subscribers;
    }

    handleCreateTasks() {
        this.view.showTaskForm('create task');
        this.model.getServices(); 
        this.model.getLocation();        
        this.actionforForm();
    }

    handleEditForm(currentTask) {
        this.model.getServices(currentTask);
        this.view.showTaskForm('edit task');   
        this.actionforForm();
    }
    
    actionforForm() {        
        const cancelButton =  document.body.querySelector('.cancel');
        const location = document.body.querySelector('.input-location');
        const description = document.body.querySelector('.description');
        const serviceList = document.body.querySelector('.service-list'); 
        const taskName = document.body.querySelector('.task-name-list'); 
        const actionButton = document.body.querySelector('.action-button');        

        description.addEventListener('input', () => { 
            this.view.changeTaskInfo(description.value);                               
        });
        
        location.addEventListener('input', () => {
            this.view.changeLocation(location.value);            
        });

        serviceList.addEventListener('click', (event) => {
            let currentElement = event.target.parentElement;
            if(currentElement.className === 'service') {
                this.view.changeService(this.model.services, currentElement);
            }     
        });

        taskName.addEventListener('click', (event) => {
            let currentElement = event.target;
            if(currentElement.className === 'task-name') {
                this.view.chooseTask(currentElement);
            }
        });

        cancelButton.addEventListener('click', () => {
            this.view.actionCancel();   
        });

        actionButton.addEventListener('click', (event) => {
            let taskInfo = this.view.getTaskInfo();
            let task = {
                typeOfService: taskInfo.typeOfService,
                taskOfService: taskInfo.taskOfService,
                dateCreating: Date.now(),
                taskText:  taskInfo.taskText,
                description: taskInfo.description,
                location:  taskInfo.location
            }
            let action;
            if(event.target.innerText.toLowerCase() === 'create task') {
                action = this.model.addTask(task);                      
            } else if(event.target.innerText.toLowerCase() === 'edit task') {
                action = this.model.editTask(task);                             
            }

            let actionForTask = async () => {
                try {
                    await action;
                  } catch (err) {
                    console.error(err);
                  }
                  this.subscribers.publish('showEvent');
            };
            actionForTask();
            
            this.view.actionCancel();
        });
    }
}