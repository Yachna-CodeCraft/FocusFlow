document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    contentHeight: 'auto',
    aspectRatio: 1.5
  });

  calendar.render();

  document.getElementById('planForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;

    if (title && date) {
      calendar.addEvent({ title, start: date });

      const li = document.createElement('li');
      li.textContent = `${title} (${date})`;
      document.getElementById('planList').appendChild(li);

      this.reset();
    }
  });
});

// ✅ Progress Tracker
let totalTasks = 0;
let completedTasks = 0;

function updateProgress() {
  document.getElementById("task-count").textContent = totalTasks;
  document.getElementById("completed-count").textContent = completedTasks;

  const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  document.getElementById("progress-bar").style.width = percentage + "%";
}

// ✅ To-Do List
function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();

  if (task) {
    const li = document.createElement("li");
    li.textContent = task;

    // Toggle complete on click
    li.onclick = function () {
      if (li.classList.contains("completed")) {
        li.classList.remove("completed");
        completedTasks--;
      } else {
        li.classList.add("completed");
        completedTasks++;
      }
      updateProgress();
    };

    document.getElementById("todoList").appendChild(li);
    input.value = "";

    totalTasks++;
    updateProgress();
  }
}

// ✅ Pomodoro Timer
let pomodoroTime = 25 * 60;
let timer;

function startPomodoro() {
  if (timer) return;

  timer = setInterval(() => {
    if (pomodoroTime <= 0) {
      clearInterval(timer);
      timer = null;
      alert("Time's up!");
      return;
    }

    pomodoroTime--;
    const min = String(Math.floor(pomodoroTime / 60)).padStart(2, '0');
    const sec = String(pomodoroTime % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `${min}:${sec}`;
  }, 1000);
}

function resetPomodoro() {
  clearInterval(timer);
  timer = null;
  pomodoroTime = 25 * 60;
  document.getElementById("timer").textContent = "25:00";
}
