const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
  
let currentIndex = 0;
let intervalId; //setInterval(NextSlide(),2000);하면 안 돼서

function nextSlide() {
  if (currentIndex < slides.length - 1) { //인덱스 값과 슬라이드 총 개수와 비교해서 현재 슬라이드 인덱스가 슬라이드의 총 개수 미만일 때
     currentIndex++; // 1증가 시켜 다음 인덱스의 값으로 설정
  } else {
     currentIndex = 0; //아닐 경우는 0으로 설정하여 첫 번째 슬라이드의 인덱스로 이동: 버튼 무한루프를 돌게 함.
  }
   updateSlider();
};
  
function prevSlide() {
  if (currentIndex > 0) { //슬라이드가 첫 번째가 아닌 경우
    currentIndex--; //currentIndex를 1감소 시켜 이전 슬라이드의 인덱스로 이동하기
  } else {
        currentIndex = slides.length - 1; //마지막 슬라이드로 이동: 무한순환
  }
  updateSlider();
};
  
function updateSlider() {
  const translateValue = -currentIndex * 100 + "%"; //현재 슬라이드에 따른 이동할 거리
  track.style.transform = "translateX(" + translateValue + ")"; //계산된 거리를 이용하여 슬라이드를 좌우로 이동
}


// 이벤트 리스너 등록
nextBtn.addEventListener("click", nextSlide); //문서가 로드될 때 바로 이벤트 리스너 안에 넣어서, function을 쓰지 않았는데
prevBtn.addEventListener("click", prevSlide); //setInterval 안에 함수 호출하기 위해서 addEventListener을 빼고 function 사용
intervalId = setInterval(() => {
  nextSlide(); //함수 호출
}, 2000); //2초마다