const planner = document.getElementById('planner');
const hours = [
  '9 AM', '10 AM', '11 AM', '12 PM',
  '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'
];

function getHour24Format(label) {
  const [time, period] = label.split(" ");
  let hour = parseInt(time);
  if (period === 'PM' && hour !== 12) hour += 12;
  if (period === 'AM' && hour === 12) hour = 0;
  return hour;
}

function loadPlanner() {
  const now = new Date();
  const currentHour = now.getHours();

  hours.forEach((hourLabel, index) => {
    const hour = getHour24Format(hourLabel);
    const task = localStorage.getItem(`task-${hourLabel}`) || "";

    const block = document.createElement('div');
    block.className = 'time-block';

    const hourDiv = document.createElement('div');
    hourDiv.className = 'hour';
    hourDiv.innerText = hourLabel;

    const textarea = document.createElement('textarea');
    textarea.value = task;
    textarea.classList.add(
      hour < currentHour ? 'past' :
      hour === currentHour ? 'present' : 'future'
    );

    const button = document.createElement('button');
    button.className = 'saveBtn';
    button.innerText = 'Save';

    button.onclick = () => {
      localStorage.setItem(`task-${hourLabel}`, textarea.value);
      alert("Task Saved!");
    };

    block.appendChild(hourDiv);
    block.appendChild(textarea);
    block.appendChild(button);
    planner.appendChild(block);
  });
}

loadPlanner();
