let selectedDate = new Date(); //date객체로 초기화를 안 해서 getMonth에 오류가...
//현재 날짜 초기화
function generateCalendar(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 현재 월의 총 일 수
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 첫째 날의 요일
  //<h2>
  const titleElement = document.getElementById("calendar-title"); //캘린더 제목 엘리먼트
  titleElement.textContent = `${year}년 ${month + 1}월`; // month는 0부터 시작하므로 1을 더해줍니다.
  //캘린더 제목 업데이트
  const table = document.createElement('table'); //테이블 엘리먼트 생성
  let dayCounter = 1; //1일을 기준으로 초기화

  // 헤더
  const headerRow = table.insertRow();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < 7; i++) {
    const th = document.createElement('th');
    th.textContent = daysOfWeek[i];
    headerRow.appendChild(th);
  }
  const memoDates = getMemoDates(year, month); // 메모가 있는 날짜 가져오기
  // 달력
  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();
    for (let j = 0; j < 7; j++) {
      const cell = row.insertCell();

      if (i === 0 && j < firstDayOfMonth) { // 첫째 날 시작 전에 비어있는 달력 셀들
        continue;
      }

      if (dayCounter > daysInMonth) { // 그 달의 날짜가 다 채워지면 멈춤
        break;
      }

      cell.textContent = dayCounter; //셀에 날짜 표시
      cell.dataset.date = `${year}-${month + 1}-${dayCounter}`; //날짜 데이터 속성 추가
      cell.onclick = showMemoPopup; // 클릭 이벤트 주면 메모 팝업 표시
        
      // 메모가 있는 날짜에 배경색 변경
      if (memoDates.includes(cell.dataset.date)) {
        cell.style.backgroundColor = 'lightblue';
      }
    dayCounter++;
    }
  }
  document.getElementById('calendar').innerHTML = ''; //캘린더 초기화
  document.getElementById('calendar').appendChild(table); //테이블 추가
}
 // 해당 월에 메모가 있는 날짜 가져오기 
function getMemoDates(year, month) { //메모가 있는 날짜를 가져오면
  const memoDates = [];
  const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); //현재 월의 마지막 날짜

  for (let day = 1; day <= lastDayOfMonth; day++) {
    const date = `${year}-${month + 1}-${day}`;
    if (localStorage.getItem(date)) {
      memoDates.push(date);
    }
  } return memoDates;
}
//이전달
  function showPreviousMonth() {
    const currentMonth = selectedDate.getMonth();
    selectedDate.setMonth(currentMonth - 1);
    generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
  }
//다음달
function showNextMonth() {
  const currentMonth = selectedDate.getMonth();
  selectedDate.setMonth(currentMonth + 1);
  generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
}
//원래는 새로운 함수 만들고 (-n) 또는 (n) 이런 식으로 하려 했는데 따로 씀
// 클릭하면 메모 팝업 보여짐
function showMemoPopup(event) {
  const date = event.target.dataset.date; //클릭한 셀의 날짜 가져오기
  const memoPopup = document.getElementById('memoPopup'); //메모 팝업 엘리먼트 가져오기
  memoPopup.style.display = 'block'; //메모 팝업 보이게 설정

  // 지금 날짜 메모 팝업에 보이게
  memoPopup.dataset.date = date;
  // 메모 있으면 보이게 하기
  document.getElementById('memoText').value = localStorage.getItem(date) || '';
} 
// 메모 저장하고 팝업 닫기
function saveMemo() {
  const memoPopup = document.getElementById('memoPopup'); //메모 팝업 엘리먼트 가져오기
  const date = memoPopup.dataset.date; //팝업에 표시된 날짜 가져오기
  const memoText = document.getElementById('memoText').value; //메모 내용 가져오기

  localStorage.setItem(date, memoText); //로컬 스토리지에 메모 저장
  memoPopup.style.display = 'none'; //메모 팝업 닫기
}
const currentDate = new Date();
generateCalendar(currentDate.getFullYear(), currentDate.getMonth()); //현재 월의 캘린더 표시