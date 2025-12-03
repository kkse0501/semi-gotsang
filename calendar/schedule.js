// calendar/schedule.js - 일정 확인 및 이벤트 핸들러 로직

// YYYY-M-D 포맷을 읽기 쉬운 형식으로 변환 (예: 9월 27일 토요일)
function formatEventDate(dateKey) {
    const parts = dateKey.split('-');
    const date = new Date(parts[0], parts.length > 1 ? parts[1] - 1 : 0, parts.length > 2 ? parts[2] : 1);
    
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const dayOfWeek = dayNames[date.getDay()];

    return `${month}월 ${day}일 ${dayOfWeek}`;
}

// 달력의 날짜 엘리먼트에 클릭 이벤트를 추가하는 함수
function initCalendarClickEvents() {
    const dateElements = document.querySelectorAll('#date-grid .date');

    dateElements.forEach(dayEl => {
        // 기존 리스너 제거 (월 변경 시 중복 등록 방지)
        dayEl.removeEventListener('click', handleDateClick);
        
        // 새 리스너 추가
        dayEl.addEventListener('click', handleDateClick);
    });
}

// 날짜 클릭 이벤트 핸들러
function handleDateClick(e) {
    const clickedDateKey = e.currentTarget.dataset.date;
    if (clickedDateKey) {
        showEventDetails(clickedDateKey);
    }
}

// 상세 일정 표시 함수 (날짜 클릭 시 호출됨)
function showEventDetails(dateKey) {
    // 현재 열려있는 탭을 '홈 화면'으로 변경
    document.querySelectorAll('#bottom-bar-container .tab').forEach(tab => tab.classList.remove('active-tab'));
    document.querySelector('#bottom-bar-container .tab:nth-child(1)').classList.add('active-tab');

    // 1. 데이터 가져오기 (calendar.js의 eventStore 사용)
    const events = window.eventStore ? window.eventStore[dateKey] : [];
    
    const listContainer = document.getElementById('event-details-list');
    const noEventsMessage = document.getElementById('no-events-message');
    const sheetDateDisplay = document.getElementById('sheet-date-display');
    
    listContainer.innerHTML = ''; // 기존 목록 초기화
    
    // 2. 헤더 및 날짜 업데이트
    sheetDateDisplay.textContent = formatEventDate(dateKey);

    // 3. 상세 목록 생성
    if (events && events.length > 0) {
        // 일정이 있는 경우
        noEventsMessage.style.display = 'none';
        listContainer.style.display = 'block';

        events.forEach(event => {
            // ⭐ 상세 목록에 카테고리 색상과 아이콘 반영 ⭐
            const categoryColorCode = {
                red: '#f44336', green: '#4CAF50', blue: '#2196F3', yellow: '#FFC107', default: '#888'
            }[event.categoryColor] || '#888';

            const itemHtml = `
                <div class="event-item-placeholder">
                    <div class="event-icon" style="background-color: ${categoryColorCode}; color: white;">${event.icon || '📝'}</div> 
                    <div class="event-details">
                        <span class="event-title">${event.name || event.title}</span>
                        <span class="event-schedule">${event.memo || '메모 없음'}</span>
                        <span class="event-category">${event.category}</span>
                    </div>
                    <span class="arrow-icon">&gt;</span>
                </div>
            `;
            listContainer.insertAdjacentHTML('beforeend', itemHtml);
        });
        
    } else {
        // 일정이 없는 경우
        noEventsMessage.textContent = "선택한 날짜에 일정이 없습니다.";
        noEventsMessage.style.display = 'block';
        listContainer.style.display = 'none'; // 목록 숨김
    }

    // 4. 바텀 시트 열기 (상세 보기 모드)
    window.toggleEventSheet(true, 'details');
}

window.initCalendarClickEvents = initCalendarClickEvents;
window.showEventDetails = showEventDetails;