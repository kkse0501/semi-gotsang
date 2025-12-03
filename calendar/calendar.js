// calendar/calendar.js

// 전역 일정 저장소 (YYYY-M-D : [Events])
let eventStore = {
    // 초기 더미 일정 (모두 제거됨)
}; 

let currentDate = new Date(2025, 8, 1); 
window.currentDate = currentDate;

function renderCalendar(date) {
    const dateGrid = document.getElementById('date-grid');
    const monthDisplay = document.getElementById('current-month-display');
    const yearDisplay = document.getElementById('current-year-display');
    
    if (!dateGrid || !monthDisplay || !yearDisplay) return;

    dateGrid.innerHTML = '';

    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth(); 

    monthDisplay.textContent = `${currentMonth + 1}월`;
    yearDisplay.textContent = currentYear;

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const startDayIndex = firstDayOfMonth.getDay(); 
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();

    // 이전 달 날짜 채우기
    for (let i = prevMonthLastDay - startDayIndex + 1; i <= prevMonthLastDay; i++) {
        const dayEl = document.createElement('span');
        dayEl.textContent = i;
        dayEl.classList.add('date', 'other-month');
        dateGrid.appendChild(dayEl);
    }

    // 현재 달 날짜 채우기
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('span');
        dayEl.textContent = i;
        dayEl.classList.add('date');
        
        const dateKey = `${currentYear}-${currentMonth + 1}-${i}`;

        const events = eventStore[dateKey];
        
        if (events && events.length > 0) {
            const primaryEvent = events[0]; 

            // 1. 점(Dot) 표시
            const dot = document.createElement('div');
            dot.classList.add('event-dot'); 
            
            const colorMap = {
                red: '#f44336', purple: '#9C27B0', green: '#4CAF50', blue: '#2196F3', yellow: '#FFC107', cyan: '#00BCD4', default: '#4CAF50'
            };
            dot.style.backgroundColor = colorMap[primaryEvent.categoryColor] || colorMap.default;
            dayEl.appendChild(dot);

            // 2. ⭐ 일정 제목(Label) 표시 보강 ⭐
            const titleLabel = document.createElement('div');
            titleLabel.textContent = primaryEvent.title;
            titleLabel.classList.add('event-title-label');
            dayEl.appendChild(titleLabel);
        }
        
        dayEl.dataset.date = dateKey; 
        dateGrid.appendChild(dayEl);
    }

    // 다음 달 날짜 채우기
    for (let i = 1; i <= (42 - dateGrid.children.length); i++) {
        const dayEl = document.createElement('span');
        dayEl.textContent = i;
        dayEl.classList.add('date', 'other-month');
        dateGrid.appendChild(dayEl);
    }
    
    // 렌더링 완료 후 클릭 이벤트 핸들러 초기화 함수 호출
    if (window.initCalendarClickEvents) {
        window.initCalendarClickEvents();
    }
}

function changeMonth(delta) {
    const newMonth = currentDate.getMonth() + delta;
    const newDate = new Date(currentDate.getFullYear(), newMonth, 1);
    
    currentDate = newDate;
    window.currentDate = currentDate;

    renderCalendar(currentDate);
}

function initCalendar() {
    currentDate = new Date(2025, 8, 1); 
    window.currentDate = currentDate;
    renderCalendar(currentDate);
}

function addEventToCalendar(dateString, title, memo, category, categoryColor, icon) {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10); 
    const day = parseInt(dateParts[2], 10);
    
    const dateKey = `${year}-${month}-${day}`;
    
    const newEvent = { title: title, type: 'dot', name: title, memo: memo, category: category, categoryColor: categoryColor, icon: icon }; 

    if (!eventStore[dateKey]) {
        eventStore[dateKey] = [];
    }
    eventStore[dateKey].push(newEvent);

    if (currentDate.getFullYear() === year && currentDate.getMonth() + 1 === month) {
        renderCalendar(currentDate);
    }
    
    console.log(`Event saved for ${dateKey}: ${title}`);
}


window.initCalendar = initCalendar;
window.changeMonth = changeMonth;
window.addEventToCalendar = addEventToCalendar;
window.eventStore = eventStore;