// 날짜 클릭 → 팝업 열기
document.querySelectorAll(".day").forEach(day => {
  day.addEventListener("click", () => {
    document.getElementById("dayPopup").classList.remove("hidden");
  });
});

// 팝업 닫기
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("dayPopup").classList.add("hidden");
});

// 일정 버튼 클릭 → 일정 모달
document.getElementById("addSchedule").addEventListener("click", () => {
  document.getElementById("dayPopup").classList.add("hidden");
  document.getElementById("scheduleModal").classList.remove("hidden");
});

// 메모 버튼 클릭 → 메모 모달
document.getElementById("addMemo").addEventListener("click", () => {
  document.getElementById("dayPopup").classList.add("hidden");
  document.getElementById("memoModal").classList.remove("hidden");
});

// 일정 모달 닫기
document.getElementById("closeSchedule").addEventListener("click", () => {
  document.getElementById("scheduleModal").classList.add("hidden");
});

// 메모 모달 닫기
document.getElementById("closeMemo").addEventListener("click", () => {
  document.getElementById("memoModal").classList.add("hidden");
});
