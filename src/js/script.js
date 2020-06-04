import TaskView from './taskFormMvs/taskView';
import ListTasksView from './listFormMvs/listTasksView';
import ListForm from './listFormMvs/listForm';
import TaskForm from './taskFormMvs/taskForm';
import ListFormControll from './listFormMvs/listFormControll';
import TaskFormControll from './taskFormMvs/taskFormControll';
import PubSub from './patterns/pubSub';

document.addEventListener('DOMContentLoaded', function() {

    const listTasksView = new ListTasksView();
    const taskView = new TaskView();

    const listForm = new ListForm(listTasksView);
    const taskForm = new TaskForm(taskView);

    const subscribers = new PubSub();


    const listController = new ListFormControll(listForm, listTasksView, subscribers);
    const taskFormController = new TaskFormControll(taskForm, taskView, subscribers);

    subscribers.subscribe('addEvent', taskFormController.handleCreateTasks.bind(taskFormController));
    subscribers.subscribe('showEvent', listController.handleGetTasks.bind(listController));
    subscribers.subscribe('editEvent', taskFormController.handleEditForm.bind(taskFormController));
    
    listController.handleShowTasks();    
    
});




