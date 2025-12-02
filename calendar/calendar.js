// calendar/calendar.js

// 전역 일정 저장소 (YYYY-M-D : [Events])
let eventStore = {
    // 초기 더미 일정
    '2025-9-11': [{ title: '하이라이트', type: 'highlight', name: '중요 일정' }], 
    '2025-9-12': [{ title: '피들러프로 시작하는', type: 'label', name: '온라인 세미나' }],
    '2025-9-27': [{ title: '세미콜론 스터디 모임', type: 'dot', name: '스터디 모임' }] 
};

let currentDate = new Date(2025, 8, 1); 
window.currentDate = currentDate; // index.html에서 접근 가능하도록 전역 노출

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
        
        // 날짜 키 생성: YYYY-M-D (월/일은 0 없이)
        const dateKey = `${currentYear}-${currentMonth + 1}-${i}`;

        // 저장된 일정 데이터 읽어와 표시
        const events = eventStore[dateKey];
        
        if (events && events.length > 0) {
            const primaryEvent = events[0]; 

            if (primaryEvent.type === 'highlight') {
                dayEl.classList.add('today-highlight');
            }
            if (primaryEvent.type === 'label') {
                const label = document.createElement('div');
                label.textContent = primaryEvent.title;
                label.classList.add('event-label');
                dayEl.appendChild(label);
            }
            if (primaryEvent.type === 'dot') {
                const dot = document.createElement('div');
                dot.classList.add('event-dot'); 
                dayEl.appendChild(dot);
            }
        }
        
        dayEl.dataset.date = dateKey; 
        dateGrid.appendChild(dayEl);
    }

    // 다음 달 날짜 채우기
    const totalCells = dateGrid.children.length;
    const cellsToFill = 42 - totalCells; 

    for (let i = 1; i <= cellsToFill; i++) {
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

// 일정 추가 함수 (버그 수정 로직 적용)
function addEventToCalendar(dateString, title) {
    const dateParts = dateString.split('-');
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10); 
    const day = parseInt(dateParts[2], 10);
    
    const dateKey = `${year}-${month}-${day}`;
    
    const newEvent = { title: title, type: 'dot', name: title }; 

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