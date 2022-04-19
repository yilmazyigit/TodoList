const task = document.getElementById("task");
const addBtn = document.getElementById("liveToastBtn");
const removeBtn = document.querySelectorAll("#list li .close");
const success = document.querySelector("success");
const error = document.querySelector("error");

addBtn.addEventListener("click", () => {
  addElement();
});

function addElement() {
  
  if (
    task.value == "" ||
    task.value == task.defaultValue ||
    task.value.trim() == ""
  ) {
    $(".error").toast("show");
    task.value = "";
  } else {
    let ulDOM = document.getElementById("list");
    let liDOM = document.createElement("li");
    let spanDOM = document.createElement("span");
    spanDOM.innerHTML = "&#10005;";
    spanDOM.classList.add("close");
    liDOM.innerHTML = `${task.value} `;
    liDOM.appendChild(spanDOM);
    spanDOM.onclick = function (event) {
      let getTodos = JSON.parse(localStorage.getItem("todoArr"));
      let liText = event.target.parentElement.innerText;
      let changeItemIndex = getTodos.findIndex(
        (s) => s.todo == liText.slice(0, liText.length - 1).trim()
      ); 
      getTodos.splice(changeItemIndex, 1); 
      localStorage.setItem("todoArr", JSON.stringify(getTodos)); 
      event.target.parentElement.remove(); 
    };
    liDOM.onclick = function (event) {
      let getTodos = JSON.parse(localStorage.getItem("todoArr"));
      event.currentTarget.classList.toggle("checked");
      let liText = event.currentTarget.innerText;
      let changeItemIndex = getTodos.findIndex(
        (s) => s.todo == liText.slice(0, liText.length - 1).trim()
      );
      if (getTodos[changeItemIndex]) {
        if (getTodos[changeItemIndex].isChecked) {
          liDOM.classList.remove("checked");
          getTodos[changeItemIndex].isChecked = false;
          localStorage.setItem("todoArr", JSON.stringify(getTodos));
        } else {
          liDOM.classList.add("checked");
          getTodos[changeItemIndex].isChecked = true;
          localStorage.setItem("todoArr", JSON.stringify(getTodos));
        }
      }
    };
    ulDOM.append(liDOM);
    add(liDOM);
    task.value = ""; 
  }
}
function add(item) {
  let todoArr = JSON.parse(localStorage.getItem("todoArr"));
  const todo = {
    todo: item.innerText.slice(0, item.innerText.length - 2),
    isChecked: false,
  };
  todoArr.push(todo);
  localStorage.setItem("todoArr", JSON.stringify(todoArr));
}
window.addEventListener("load", () => {
  let todos = JSON.parse(localStorage.getItem("todoArr"));
  if (todos) {
    for (let i = 0; i < todos.length; i++) {
      let ulDOM = document.getElementById("list");
      let liDOM = document.createElement("li");
      let spanDOM = document.createElement("span");
      spanDOM.innerHTML = "&#10005;";
      spanDOM.classList.add("close");
      liDOM.innerHTML = `${todos[i].todo} `;
      liDOM.appendChild(spanDOM);
      spanDOM.onclick = function (event) {
        let liText = event.target.parentElement.innerText; 
        let cahngeItemIndex = todos.findIndex(
          (s) => s.todo == liText.slice(0, liText.length - 1).trim()
        ); 
        todos.splice(cahngeItemIndex, 1); 
        localStorage.setItem("todoArr", JSON.stringify(todos)); 
        event.target.parentElement.remove(); 
      };
      liDOM.onclick = function (event) {
        event.currentTarget.classList.toggle("checked");
        let liText = event.currentTarget.innerText;
        let changeItemIndex = todos.findIndex(
          (s) => s.todo == liText.slice(0, liText.length - 1).trim()
        );
        if (todos[changeItemIndex]) {
          if (todos[changeItemIndex].isChecked) {
            liDOM.classList.remove("checked");
            todos[changeItemIndex].isChecked = false;
            localStorage.setItem("todoArr", JSON.stringify(todos));
          } else {
            liDOM.classList.add("checked");
            todos[changeItemIndex].isChecked = true;
            localStorage.setItem("todoArr", JSON.stringify(todos));
          }
        }
      };
      ulDOM.append(liDOM);
    }
  } else {
    todoArr = [];
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
  }
});