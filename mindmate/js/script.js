// MindMate – script.js | Author: AIML Student

// 1. Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

// 2. Highlight active nav link based on current page
const currentPage = window.location.pathname.split('/').pop();
document.querySelectorAll('.nav-links a').forEach(function (link) {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// 3. Study Planner – Add task
const taskInput  = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskListUL = document.getElementById('task-list-ul');

if (addTaskBtn && taskInput && taskListUL) {

  addTaskBtn.addEventListener('click', function () { addTask(); });

  taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addTask();
  });

  function addTask() {
    var taskText = taskInput.value.trim();

    if (taskText === '') {
      alert('Please type a task before adding!');
      return;
    }

    var li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML =
      '<input type="checkbox" onchange="toggleDone(this)">' +
      '<span>' + taskText + '</span>' +
      '<button class="task-delete" onclick="deleteTask(this)">🗑️</button>';

    taskListUL.appendChild(li);
    taskInput.value = '';
    updateCounter();
  }
}

// 4. Mark task as done (strikethrough)
function toggleDone(checkbox) {
  var item = checkbox.parentElement;
  if (checkbox.checked) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
  updateCounter();
}

// 5. Delete a task
function deleteTask(button) {
  button.parentElement.remove();
  updateCounter();
}

// 6. Update the task counter (e.g. "2 / 3 tasks completed")
function updateCounter() {
  var counter = document.getElementById('task-counter');
  if (!counter) return;
  var total = document.querySelectorAll('.task-item').length;
  var done  = document.querySelectorAll('.task-item.done').length;
  counter.textContent = done + ' / ' + total + ' tasks completed';
}

// 7. Mood Tracker – show message based on selected mood
var moodMessages = {
  happy:   { title: '🎉 That\'s Awesome!', text: 'You\'re in a great mood! Use this energy to tackle your hardest subject first. Keep smiling and keep studying!' },
  sad:     { title: '💙 It\'s Okay to Feel Sad', text: 'Some days are harder than others. Take a short break, drink water, and do something you enjoy for 10 minutes. Every day is a fresh start!' },
  anxious: { title: '🌿 Take a Deep Breath', text: 'Feeling anxious is very common. Try breathing slowly: inhale for 4 seconds, hold for 4, exhale for 4. Break tasks into smaller steps!' },
  excited: { title: '🚀 Channel That Energy!', text: 'You\'re excited – brilliant! Perfect time to explore a new topic or dive deeper into AI. Your enthusiasm will take you far!' },
  tired:   { title: '😴 Rest is Productive Too', text: 'Your brain needs rest to work well. Take a 20-minute nap or relax. Recharge first, then come back stronger!' },
  confused:{ title: '🤔 Confusion Means You\'re Learning!', text: 'Being confused means you\'re learning something new! Watch a video, re-read your notes, or ask a classmate. Every expert was once a beginner!' }
};

var moodButtons    = document.querySelectorAll('.mood-btn');
var moodMessageBox = document.getElementById('mood-message');

moodButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {

    // Remove highlight from all buttons, then highlight clicked one
    moodButtons.forEach(function (b) { b.classList.remove('selected'); });
    btn.classList.add('selected');

    var mood = btn.getAttribute('data-mood');
    var msg  = moodMessages[mood];

    if (msg && moodMessageBox) {
      document.getElementById('mood-msg-title').textContent = msg.title;
      document.getElementById('mood-msg-text').textContent  = msg.text;
      moodMessageBox.style.display = 'block';
    }
  });
});
