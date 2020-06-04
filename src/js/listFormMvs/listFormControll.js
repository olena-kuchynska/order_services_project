export default class ListFormControll {
    constructor(model, view, subscribers) {
        this.model = model;        
        this.view = view;
        this.subscribers = subscribers;
        this.tasks;
    }

    handleShowTasks() {
        this.handleGetTasks();
        this.view.showTask();
        this.actionForShow();
    }

    handleGetTasks() {
        this.model.getTasks();
    }

    actionForShow() {
        const actions = document.body.querySelector('.tasks-list');    
        actions.addEventListener('click', (events) => {
            let currentElement = events.target;
            let currentTask = currentElement.parentElement;
            if(currentElement.className === 'delete-button') {
                Promise.all([
                this.model.deleteTask(currentTask),
                this.handleGetTasks(),
                ]);
            } else if(currentElement.className === 'edit-button') {
                this.subscribers.publish('editEvent', currentTask);                
            }            
        });    
        
        /* window.addEventListener('resize', () => {
            this.view.resizeWindow();
        }); */

        const newTaskButton =  document.body.querySelector('.new-task');
        newTaskButton.addEventListener('click', () => this.subscribers.publish('addEvent')); 
    }    

}