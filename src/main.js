/*
  Створи список справ.
  На сторінці є два інпути які має вводиться назва і текст задачі.
  Після натискання на кнопку "Add" завдання додається до списку #task-list.

  У кожної картки має бути кнопка "Delete", щоб можна було
  прибрати завдання зі списку.
  Список із завданнями має бути доступним після перезавантаження сторінки.

  Розмітка картки задачі
  <li class="task-list-item">
      <button class="task-list-item-btn">Delete</button>
      <h3>Заголовок</h3>
      <p>Текст</p>
  </li>
*/
import { nanoid } from 'nanoid';
const formElem = document.querySelector("#task-form");
const listElem = document.querySelector(".tasks-list");
const tasks = initialLocalStorage();
markupTasks(tasks);
formElem.addEventListener('submit', heandlerSbmForm);
listElem.addEventListener('click', handlerClickList);


function initialLocalStorage() { 
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}

function saveTaskToLocalStorage(task){
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
}


function heandlerSbmForm(event){
  event.preventDefault();
  const task = {
    id: nanoid(),
    title: event.target.elements.taskName.value.trim(),
    description: event.target.elements.taskDescription.value.trim(),
  }
  saveTaskToLocalStorage(task);
  initialLocalStorage();
  const updatedTasks = initialLocalStorage();
  markupTasks(updatedTasks);
  event.target.reset();
}

function markupTasks(tasks) {
  listElem.innerHTML = "";
  const markup = tasks.map(({id, title, description}) =>{
    return `<li class="task-list-item">
          <button class="task-list-item-btn" data-id="${id}">Delete</button>
          <h3>${title}</h3>
          <p>Т${description}</p>
          </li>`
  }).join("");
  listElem.insertAdjacentHTML('afterbegin', markup);
}

function handlerClickList(event){
  event.preventDefault();
  if (event.target.nodeName !== 'BUTTON') return;
  const deleteButtonId = event.target.dataset.id;
  const task = JSON.parse(localStorage.getItem("tasks"))
  const updatedTasks = task.filter(task => task.id !== deleteButtonId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // 🔁 Записуємо новий масив
  markupTasks(updatedTasks); // 🔄 Перерендер списку
}


// createdTasks();


// initialLocalStorage();
// formElem.addEventListener('submit', heandlerFormSubmit);
// const tasks = [...savedTasks];
// function initialLocalStorage(){
// const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
// }


// function heandlerFormSubmit(e){
//   e.preventDefault();
//   const titleSubmit = e.target.elements.taskName.value.trim();
//   const descriptionSubmit = e.target.elements.taskDescription.value.trim();
//   const newTask = {
//     id: nanoid(),
//     title: titleSubmit,
//     description: descriptionSubmit,
//   }
//   tasks.push(newTask);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   e.target.reset();
//   createdTasks();
// }

// function createdTasks(){
//   listElem.innerHTML = "";
// const markup = tasks.map(({id, title, description})=>{
// return `<li class="task-list-item">
//     <button class="task-list-item-btn" data-id="${id}">Delete</button>
//     <h3>${title}</h3>
//     <p>Т${description}</p>
// </li>`}).join("");

// listElem.insertAdjacentHTML('afterbegin', markup);
// }

// createdTasks();

// listElem.addEventListener('click', handlerBtnClick)

// function handlerBtnClick(e){
//   e.preventDefault();
//   if (e.target.nodeName !== 'BUTTON') return;
// }
