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
                let actionDelete = async () => {
                    try {
                        await this.model.deleteTask(currentTask);;
                      } catch (err) {
                        console.error(err);
                      }
                      this.model.getTasks();
                };
                                
                actionDelete();               

            } else if(currentElement.className === 'edit-button') {
                this.subscribers.publish('editEvent', currentTask);
            }        
        });    
        
        const newTaskButton =  document.body.querySelector('.new-task');
        newTaskButton.addEventListener('click', () => this.subscribers.publish('addEvent')); 
    }    

}