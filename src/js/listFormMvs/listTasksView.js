export default class ListTasksView {
    showTask() {
        const container = document.querySelector('.container');

        const actionBlock = document.createElement('div');
        actionBlock.setAttribute('class','action-block');
        container.append(actionBlock);        

        const currentTasks = document.createElement('div');
        currentTasks.setAttribute('class','current-tasks');
        container.append(currentTasks);

        const newTaskButton = document.createElement('button');
        newTaskButton.setAttribute('class','new-task');
        newTaskButton.innerText = '+ new task';
        currentTasks.append(newTaskButton);

        const tasksList = document.createElement('div');
        tasksList.setAttribute('class','tasks-list');
        currentTasks.append(tasksList);  
    }

    showTaskList(tasks) {
        const tasksList = document.body.querySelector('.tasks-list');
        tasksList.innerHTML = '';

        const month = ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday','Thursday', 'Friday', 'Saturday'];

        if(tasks) {
            tasks.forEach(item => {
                const task = document.createElement('div');
                task.setAttribute('class','task');
                task.id = item['_id'];
                tasksList.append(task);
                    
                const dateCreating = document.createElement('p');                     
                let date = new Date(item.dateCreating); 
                let hours =  date.getHours() < 10 ? `0${date.getHours()}`: date.getHours();
                let minutes =  date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes();
                let dateStr = `${dayOfWeek[date.getDay() - 1]}, ${month[date.getMonth()]} ${date.getDate()}, ${hours}:${minutes}`;            
                dateCreating.innerText = dateStr;
                task.append(dateCreating);

                const taskTest = document.createElement('p');            
                taskTest.innerText = item.taskText;
                task.append(taskTest);

                const editButton = document.createElement('button');
                editButton.setAttribute('class','edit-button');
                editButton.innerText = 'edit';
                task.append(editButton);

                const deleteButton = document.createElement('button');
                deleteButton.setAttribute('class','delete-button');
                deleteButton.innerText = 'delete';
                task.append(deleteButton);
            });
        }

    }

}