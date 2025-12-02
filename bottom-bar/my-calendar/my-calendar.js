// bottom-bar/my-calendar/my-calendar.js - 탭 핸들링 로직

function initTabHandler() {
    // #bottom-bar-container 하위의 탭 요소를 찾습니다.
    const tabs = document.querySelectorAll('#bottom-bar-container .tab');
    const calendarTab = document.querySelector('#bottom-bar-container .tab:nth-child(2)'); 

    const handleTabClick = (event) => {
        const clickedTab = event.currentTarget;
        
        tabs.forEach(tab => tab.classList.remove('active-tab'));
        clickedTab.classList.add('active-tab');

        if (window.toggleEventSheet) {
            if (clickedTab === calendarTab) {
                // 'my 캘린더' 탭 클릭 -> 입력 폼 모드로 시트 열기
                window.toggleEventSheet(true, 'input'); 
            } else {
                // 다른 탭 클릭 -> 시트 닫기
                window.toggleEventSheet(false);
            }
        }
    };

    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.removeEventListener('click', handleTabClick);
            tab.addEventListener('click', handleTabClick);
        });
    } else {
        console.error("Tab elements not found in bottom-bar-container.");
    }
}

window.initTabHandler = initTabHandler;