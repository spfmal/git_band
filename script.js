let handleID = 0; // 타이머 핸들 ID 초기화
const timeDisplay = document.getElementById("time"); // html에서 시간 표기할 요소 어디서든지 참조 가능

let hoursInput, minutesInput, secondsInput; // 시간 , 분 , 초 입력값 변수
// var는 함수 스코프 때문에 블록 스코프인 let, const 중에서 재할당 가능한 let으로 결정!
function timerChange(num) {
    return (0 <= num && num < 10) ? "0" + num : num; //숫자 두 자리 변환 ? 참일 경우 : 거짓 경우
}
// 타이머 업데이트 함수
function update() {
    if (hoursInput > 0 || minutesInput > 0 || secondsInput > 0) { //입력한 시간이 0보다 크면
        let remain = hoursInput * 3600 + minutesInput * 60 + secondsInput; // 어차피 초단위니까 이런 식으로 계산하기
        remain--; //감소

        const hours = Math.floor(remain / 3600); //시분초 지역변수 설정 > Math.floor 소수점 이하 버림: 시간에 소수 나오는 걸 방지
        //만약 Math.ceil을 사용해서 올림해버리면 1분 30초가 2분, 이런 식으로 올림 돼서 정확한 시간 표현 불가능
        const minutes = Math.floor((remain % 3600) / 60); //시간의 나머지 값에 60 나누기 = 분을 표현
        const seconds = remain % 60;

        timeDisplay.textContent = `${timerChange(hours)}:${timerChange(minutes)}:${timerChange(seconds)}`;
        //위에서 만든 timerChange 함수로 시간을 두 자리 문자열로 변환 > 템플릿 리터럴 사용 함수의 결과를 ':'로 구분하여 합침
        //timeDisplay가 시간을 표시할 요소니까 이 문자열을 대입하기 위해 textContent 사용, 시간을 html에 표시 '가 아니라 `인 점 유의

        //const로 계산했던 값으로 변수 갱신 
        hoursInput = hours; //원래는 hoursInput, hours 이렇게 변수 여러 개 안 쓰려고 했는데 도저히 변수 갱신할 게 생각이 안 남
        minutesInput = minutes;
        secondsInput = seconds;
    } else { //0일 때의 경우
        clearInterval(handleID);
        handleID = 0;
        timeDisplay.textContent = "00:00:00";
        alert("타이머가 종료되었습니다.");
    }
}

function parseTimeInput(input) { //이게 없으면 01:01:01 입력해도 10시간 됨
    const parsedInput = parseInt(input); //문자열을 정수로 반환
    return isNaN(parsedInput) ? 0 : parsedInput; //주어진 값이 숫자가 아니라면 0 반환, 숫자면 정수로 변환한 값을 반환
}

document.getElementById("start").onclick = function () { //onclick을 써서 HTML에 직접 이벤트 핸들러를 등록 (button의 속성)
    //document(HTML)에서 start라는 id를 가진 요소를 반환
    if (handleID === 0) { // 타이머 작동 안 할 시
        const timeInput = prompt("시간을 입력하세요 (시:분:초): "); // 사용자에게 시간 입력받기 단순한 메시지인 alert보다 시간 입력을 위해 prompt 사용
        const timeParts = timeInput.split(':'); //받은 입력을 : 을 기준으로 분리

        if (timeParts.length === 3) { // 모든 값을 다 입력받았다면 실행 (배열의 길이 3으로 설정)
            hoursInput = parseTimeInput(timeParts[0]); // 배열 첫 번째 값을 입력 받고 위의 함수로 가서 문자열을 정수로 변환하고 변수에 저장
            minutesInput = parseTimeInput(timeParts[1]);
            secondsInput = parseTimeInput(timeParts[2]);

            timeDisplay.textContent = `${timerChange(hoursInput)}:${timerChange(minutesInput)}:${timerChange(secondsInput)}`;
            // 52번 줄을 쓰기 전까진 1초씩 삭제되는 현상 발생 ex: 01:01:01 이라고 입력하면 시간이 01:01:00 부터 진행되는 모습 솔직히 아직도 좀 의문
            // 아마도 위에 remain--; 때문에 미리 1초씩 감소해서 보여지는 듯 그래서 hoursInput을 템플릿 리터럴에 넣어서 진행
            // 생각해 보니까 사용자에게 입력 받은 값을 먼저 보여주고, (위의 템플릿 리터럴) 그 후에 remain--;로 1초씩 감소하는 모습을 이어서 보여준다 하면 말이 될지도
            handleID = setInterval(update, 1000); // setInterval을 사용하여 1초 간격으로 update 반복 실행 (1000ms)
        } else {
            alert("올바른 시간 형식을 입력하세요. (시:분:초)");
        }
    }
};

document.getElementById("stop").onclick = function () {
    clearInterval(handleID); //현재 실행 중인 타이머 중지
    handleID = 0; //현재 실행 중인 타이머가 없다는 뜻
};

document.getElementById("reset").onclick = function () {
    clearInterval(handleID);
    handleID = 0;
    hoursInput = 0; // 새 동작을 입력하기 전에 변수를 0으로 초기화해야 함
    minutesInput = 0;
    secondsInput = 0;
    timeDisplay.textContent = "00:00:00"; //timeDisplay가 시간을 표시할 요소니까 그걸 0으로 초기화한 것처럼 보이게 함 (어차피 같은 문자열)


    setTimeout(function() { //setTimeout 을 통하지 않고 click 이벤트만 넣으면 "00:00:00" 되지 않고 바로 그 자리에서 start과 연결됨
        //setInterval이 아니라 setTimeout을 쓴 이유는 setTimeout은 한 번만 동작 실행일 때 사용되지만 setInterval은 반복적이기 때문
    document.getElementById("start").click(); // reset의 클릭 이벤트 내에서 start에 대한 참조를 얻어와서 클릭 이벤트 발생
    //onclick이 아니라 click을 쓴 이유는 html과 js를 분리하여 사용하기 위해서 (찾아보니까 click이 일반적이래)
    }, 100); //따라서 100ms 의 차이를 주어서 00:00:00이 되게 시각적으로 보여준 담에 start 버튼 실행되게 설정
};


//이 타이머의 문제점 (근데 이거까지 해결은 못 하겠음)
//1. 시간을 입력할 때 숫자를 두 자리수 이상 적으면 Math.floor 계산에 의해 :의 경계를 넘음 (ex, 0:0:1000 입력 시 16분 40초로 진행됨)
//2. 문자열 입력할 시 "0"으로 인식하고 진행 > 오류가 뜨면 좋겠달까? (ex, !@#:!@#$@!%:%^$% 이런 식으로 입력하면 00:00:00으로 인식)
//3. 