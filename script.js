const monthYear = document.getElementById('month-year');
const calendarGrid = document.querySelector('.calendar-grid');

const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');

let currentDate = new Date(2025, 8); // 2025년 9월 (month는 0부터 시작)

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // 제목 표시
  monthYear.textContent = `${year}년 ${month + 1}월`;

  // 첫째 날과 마지막 날짜 계산
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 달력 초기화
  calendarGrid.innerHTML = `
    <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
  `;

  // 빈 칸 추가
  for (let i = 0; i < firstDay; i++) {
    calendarGrid.innerHTML += `<div class="empty"></div>`;
  }

  // 날짜 채우기
  for (let i = 1; i <= lastDate; i++) {
    let eventHTML = '';


    calendarGrid.innerHTML += `<div class="day">${i}<br>${eventHTML}</div>`;
  }
}

// 이전 달 / 다음 달 버튼 동작
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// 첫 화면 표시
renderCalendar();
