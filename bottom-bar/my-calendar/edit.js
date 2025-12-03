// bottom-bar/my-calendar/edit.js - 일정 입력 및 저장 로직

// 인덱스 및 아이콘 선택 상태 관리
function initSelectionHandlers() {
    const categorySelection = document.getElementById('category-selection');
    const iconSelection = document.getElementById('icon-selection');
    const saveEventBtn = document.getElementById('save-event-btn');

    if (categorySelection) {
        categorySelection.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-tag')) {
                categorySelection.querySelectorAll('.category-tag').forEach(tag => tag.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    if (iconSelection) {
        iconSelection.addEventListener('click', (e) => {
            if (e.target.classList.contains('icon-option')) {
                iconSelection.querySelectorAll('.icon-option').forEach(icon => icon.classList.remove('active'));
                e.target.classList.add('active');
            }
        });
    }

    // 일정 저장 버튼 클릭 시 로직
    if (saveEventBtn) {
        saveEventBtn.removeEventListener('click', saveEventLogic); 
        saveEventBtn.addEventListener('click', saveEventLogic); 
    }
}

function saveEventLogic() {
    const dateInput = document.getElementById('event-date').value;
    const titleInput = document.getElementById('event-title').value;
    const memoInput = document.getElementById('event-memo').value;
    
    // 선택된 인덱스/아이콘 정보 가져오기
    const selectedCategoryEl = document.querySelector('#category-selection .active');
    const category = selectedCategoryEl ? selectedCategoryEl.dataset.category : '미분류';
    const categoryColor = selectedCategoryEl ? selectedCategoryEl.dataset.color : 'default';

    const selectedIconEl = document.querySelector('#icon-selection .active');
    const icon = selectedIconEl ? selectedIconEl.dataset.icon : '📝';

    // 필수 입력 체크
    if (!dateInput || !titleInput) {
        alert('날짜와 일정 제목을 모두 입력해주세요.');
        return;
    }

    // calendar.js의 함수를 호출하여 일정 추가 및 달력 업데이트
    if (window.addEventToCalendar) {
        window.addEventToCalendar(dateInput, titleInput, memoInput, category, categoryColor, icon); 
        window.toggleEventSheet(false); // 저장 후 시트 닫기
    }
}

window.initInputHandlers = initSelectionHandlers; // index.html이 호출할 수 있도록 전역 노출
window.saveEventLogic = saveEventLogic; // index.html의 saveEvent가 호출할 수 있도록 전역 노출