const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const prioritySelect = document.getElementById("priority");
const tasksContainer = document.getElementById("your-input-id");

function addTodo() {
    const todoText = todoInput.value;
    const priority = prioritySelect.value;
    //우선순위 값 변수에 할당
    if (todoText === "") { //todo 비어있을 시 종료
        alert("할 일을 작성해 주세요.");
        return;
    }
    //새로운 할 일 요소를 생성하고 HTML에 추가
    const task = document.createElement("div"); //새로운 div 요소 class는 task
    task.className = "task";
    task.innerHTML = `
        <span>${todoText}</span>
        <span>Priority: ${priority}</span>
        <button onclick="toggleTaskStatus(this)">Finish</button>
        <button onclick="editTask(this)">Edit</button>
        `;

    tasksContainer.appendChild(task);
    todoInput.value = "";//to-do Input 초기화
}
//할 일의 완료 상태를 토글
function toggleTaskStatus(button) { //버튼의 부모요소인 task에 checked 클래스를 토글
    const task = button.parentElement;
    task.classList.toggle("checked");
}
//할 일 수정
function editTask(button) {
    const task = button.parentElement; //task의 자식인 span에서 현재 텍스트를 가져옴
    const textSpan = task.querySelector("span");
    const newText = prompt("To-do를 수정해주세요:", textSpan.textContent);

    if (newText !== null) { //사용자에게 새로운 텍스트를 입력받음
        textSpan.textContent = newText;
    }
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll(".task"); // .task 클래스를 가진 모든 요소를 가져와서 반복문 시작
    tasks.forEach(task => {
        if (
            filter === "all" || //filter 조건, all이거나
            (filter === "done" && task.classList.contains("checked")) || //done이면서 완료된 경우
            (filter === "undone" && !task.classList.contains("checked")) //undone이면서 완료되지 않은 경우
        ) {
            task.style.display = "flex";
        } else {
            task.style.display = "none"; //필터링한 결과를 보이거나 숨기기
        }
    });
}

filterTasks("all");
//초반에 할 일 전체 표시

todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addTodo();
});
//폼 제출 시 할 일 추가 함수 호출