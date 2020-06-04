export default class TaskView {
    constructor() {          
        this.typeOfService;
        this.taskOfService;
        this.descriptionText;
        this.location;
        this.taskText;
    }

    showTaskForm(action) {
        const actionBlock = document.querySelector('.action-block');
        actionBlock.innerHTML = '';        
        actionBlock.style.width= '35%';  

        const cancelButton =  document.createElement('button');
        cancelButton.setAttribute('type', 'button');
        cancelButton.setAttribute('class','cancel');
        actionBlock.append(cancelButton);

        const addInfo = document.createElement('div');
        addInfo.setAttribute('class','add-info');
        actionBlock.append(addInfo);

        const captionInfo = document.createElement('p');
        captionInfo.setAttribute('class','caption');
        captionInfo.innerText = 'new task';
        addInfo.append(captionInfo);

        const taskInfo = document.createElement('p');
        taskInfo.setAttribute('class','task-info');
        addInfo.append(taskInfo);

        const locationInfo = document.createElement('p');
        locationInfo.setAttribute('class','location-info');
        addInfo.append(locationInfo);

        const actionButton =  document.createElement('button');
        actionButton.setAttribute('class','action-button');
        actionButton.innerText = action;
        addInfo.append(actionButton);

        const locationBlock = document.createElement('div');
        locationBlock.setAttribute('class','location-block');
        actionBlock.append(locationBlock);

        const captionLocation = document.createElement('p');
        captionLocation.setAttribute('class','caption');
        captionLocation.innerText = 'location';
        locationBlock.append(captionLocation);

        const inputLocation = document.createElement('input');
        inputLocation.setAttribute('class','input-location');
        locationBlock.append(inputLocation);

        const typeService = document.createElement('div');
        typeService.setAttribute('class','type-service');
        actionBlock.append(typeService);

        const captionServices = document.createElement('p');
        captionServices.setAttribute('class','caption');
        captionServices.innerText = 'type service';
        typeService.append(captionServices);

        const serviceBlock = document.createElement('div');        
        serviceBlock.setAttribute('class','service-list');
        typeService.append(serviceBlock);

        const taskBlock = document.createElement('div');
        taskBlock.setAttribute('class','task-block');
        actionBlock.append(taskBlock);

        const captionTask = document.createElement('p');
        captionTask.setAttribute('class','caption');
        taskBlock.append(captionTask);

        const taskListBlock = document.createElement('div');                    
        taskListBlock.setAttribute('class','task-name-list');        
        taskBlock.append(taskListBlock);

        const descriptionBlock = document.createElement('div');
        descriptionBlock.setAttribute('class','description-block');
        actionBlock.append(descriptionBlock);

        const captionDescription = document.createElement('p');
        captionDescription.setAttribute('class','caption');
        captionDescription.innerText = 'description';
        descriptionBlock.append(captionDescription);

        const inputDescription = document.createElement('textarea');
        inputDescription.setAttribute('class','description');
        inputDescription.placeholder = 'Enter description';
        descriptionBlock.append(inputDescription);
    }

    showServices(services) {
        const serviceBlock = document.body.querySelector('.service-list');

        services.forEach( item => {            
            const service = document.createElement('div');
            service.setAttribute('class','service');
            service.id = item['_id'];
            serviceBlock.append(service);
            const serviceName = document.createElement('p');            
            serviceName.innerText = item.type;
            service.append(serviceName);
            const imageButton = document.createElement('button');
            imageButton.setAttribute('class','type-button');
            imageButton.style.background = `url(./images/${item.type}.png) no-repeat center center`;
            service.prepend(imageButton);
        });
    }

    actionCancel() {
        const actionBlock = document.body.querySelector('.action-block');        
        actionBlock.innerHTML = '';        
        actionBlock.style.width = '0';
    }

    changeService(services, currentElement) {        
        const serviceList = document.body.querySelector('.service-list');
        const taskBlock = document.body.querySelector('.task-block');

        for (let i = 0; i < serviceList.childNodes.length; i++) {
            for (let j=0; j <  serviceList.childNodes[i].childNodes.length; j++ ) {
                serviceList.childNodes[i].childNodes[j].style.border = 'none';
            }                
        }

        currentElement.childNodes[0].style.border = '1px solid #4c71fe';

        let checkedService = currentElement.innerText.toLowerCase();
        this.taskOfService = '';
        this.typeOfService = checkedService;

        taskBlock.childNodes[0].innerText = `${checkedService} tasks`;                    
        taskBlock.childNodes[1].innerHTML = '';           

        services.forEach( item => {            
            if(item['_id'] === currentElement.id && item.tasks) {                    
                let tasks = item.tasks;
                tasks.forEach( item => {
                    const task = document.createElement('span');                                           
                    task.setAttribute('class','task-name');
                    task.innerText = item;
                    taskBlock.childNodes[1].append(task);
                });
            }
        });

        taskBlock.style.display = 'block';
        this.changeTask();                
    }

    chooseTask(currentElement) {        
        const taskName = document.body.querySelector('.task-name-list');

        for (let i = 0; i < taskName.childNodes.length; i++) {
            taskName.childNodes[i].style.border = 'none';       
        }       

        currentElement.style.border = '1px solid #4c71fe';
        
        this.taskOfService = currentElement.innerText.toLowerCase();
        this.changeTask(); 
    }

    loadLocation(infoLocation) {        
        const inputLocation = document.body.querySelector('.input-location');
        inputLocation.value = `${infoLocation.region}, ${infoLocation.city}`;
        this.location = inputLocation.value;

        const location = document.body.querySelector('.location-info');
        location.innerText = `My address is ${this.location}`;  
    }

    changeTaskInfo(description) {
        this.descriptionText = description ? description.toLowerCase() : "";
        this.changeTask();               
    }

    changeTask() {
        const taskInfo = document.body.querySelector('.task-info');

        if(!this.typeOfService) {
            taskInfo.innerHTML = `${this.descriptionText.bold()}.`;
        } else if(!this.descriptionText) {
            if(!this.taskOfService){
                taskInfo.innerHTML = `I need ${`a ${this.typeOfService}`.bold()}.`;
            } else {
                taskInfo.innerHTML = 
                `I need ${`a ${this.typeOfService}`.bold()} 
                to ${this.taskOfService.bold()}.`;
            }            
        } else if(!this.taskOfService) {
            taskInfo.innerHTML = 
                `I need ${`a ${this.typeOfService}`.bold()}, 
                ${this.descriptionText.bold()}.`;
        } else {
            taskInfo.innerHTML = 
                `I need ${`a ${this.typeOfService}`.bold()} 
                to ${this.taskOfService.bold()}, 
                ${this.descriptionText.bold()}.`;
        }

        let index = taskInfo.innerText.indexOf(',')
        this.taskText = taskInfo.innerText.slice(0,index);
    }

    changeLocation(location) {
        const locationInfo = document.body.querySelector('.location-info');
        locationInfo.innerText = `My address is ${location}`;
        this.location = location;
    }

    getTaskInfo() {
        return {
            typeOfService: this.typeOfService, 
            taskOfService: this.taskOfService, 
            taskText: this.taskText, 
            description: this.descriptionText, 
            location: this.location
        };
    }

    loadEditForm(task, services) { 
        const inputDescription = document.body.querySelector('.description');
        const inputLocation = document.body.querySelector('.input-location');
        const serviceBlock = document.body.querySelector('.service-list').childNodes;        

        for(let i = 0; i < serviceBlock.length; i++) {
            if(serviceBlock[i].innerText.toLowerCase() === task.typeOfService) {        
                this.changeService(services, serviceBlock[i]);
            }
        }

        const taskList = document.body.querySelectorAll('.task-name');

        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].innerText.toLowerCase() === task.taskOfService) {           
                this.chooseTask(taskList[i]);
            }
        }

        inputDescription.innerText = task.description;
        inputLocation.value = task.location;
        this.changeTaskInfo(task.description);        
        this.changeLocation(task.location);
        this.changeTask();
    }    
}
