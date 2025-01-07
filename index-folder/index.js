    const CAROUSEL_LENGTH = document.querySelectorAll(".idiom-items > div").length - 1;
let current = 0;

const $carousel = document.querySelector(".idiom-items");
const $prevbutton = document.querySelector(".prev-button");
const $nextbutton = document.querySelector(".next-button");

const nextEvent = () => {
    if (current < CAROUSEL_LENGTH) {
        current++;
    } else {
        current = 0;
    }
    $carousel.style.transform = `translateX(${current * -1200}px)`;
};

const prevEvent = () => {
    if (current > 0) {
        current--;
    } else {
        current = CAROUSEL_LENGTH;
    }
    $carousel.style.transform = `translateX(${current * -1200}px)`;
};

$prevbutton.addEventListener("click", prevEvent);
$nextbutton.addEventListener("click", nextEvent);

function github(){
    window.open("https://github.com/doyeon12");
}

function instagram(){
    window.open("https://www.instagram.com/eon.d06y/");
}

function facebook(){
    window.open("https://www.facebook.com/profile.php?id=100033780793643");
}

const idioms2 = Array.from(document.querySelectorAll(".idiom-items2 > div")); // 두 번째 사자성어 항목 선택
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim(); // 검색어 가져오기

    // 두 번째 사자성어 항목 필터링
    idioms2.forEach((idiom) => {
        const idiomText = idiom.querySelector("h2").textContent; // 사자성어 텍스트 가져오기
        // 검색어가 포함된 경우
        if (idiomText.includes(searchTerm)) {
            idiom.style.display = "block"; // 해당 항목 보이기
        } else {
            idiom.style.display = "none"; // 해당 항목 숨기기
        }
    });
    
});

const idioms = {
    '呵呵大笑': {
        pronunciation: '가가대소',
        meaning: '크게 웃음',
        explanation: '\'呵呵(가가)\'는 웃음소리를 나타내는 의성어이고, \'大笑(대소)\'는 \'크게 웃다\'라는 뜻입니다.'
    },
    // 필요한 경우 여기에 더 많은 사자성어를 추가할 수 있습니다
};

// 새로운 사자성어를 동적으로 추가하는 함수
function addIdiom(chinese, data) {
    const container = document.createElement('div');
    container.className = 'idiom-container';
    
    container.innerHTML = `
        <span class="chinese-idiom">
            ${chinese}
            <span class="tooltip">
                [${data.pronunciation}] ${data.meaning}. 
                ${data.explanation}
            </span>
        </span>
    `;
    
    document.body.appendChild(container);
}

{
        // 사자성어 데이터
        const idioms = {
            friends: [
                { text: "管鮑之交 (관포지교)", hint: "우정이 매우 깊은 친구 사이" },
                { text: "竹馬故友 (죽마고우)", hint: "어릴 적부터 함께 놀던 친구" },
                { text: "莫逆之友 (막역지우)", hint: "서로 거스름이 없는 매우 가까운 친구" },
                { text: "刎頸之交 (문경지교)", hint: "목을 벨 수 있을 정도로 깊은 우정" }
            ],
            family: [
                { text: "骨肉之情 (골육지정)", hint: "가족 간의 깊은 정" },
                { text: "父慈子孝 (부자자효)", hint: "아버지는 자애롭고 자식은 효도함" },
                { text: "兄友弟恭 (형우제공)", hint: "형제 간에 우애가 깊고 서로 공경함" },
                { text: "家和萬事成 (가화만사성)", hint: "가정이 화목하면 모든 일이 잘 이루어짐" }
            ],
            advice: [
                { text: "忠言逆耳 (충언역이)", hint: "충고의 말은 귀에 거슬림" },
                { text: "隔靴搔癢 (격화소양)", hint: "신을 신고 발바닥을 긁는 격" },
                { text: "良藥苦口 (양약고구)", hint: "좋은 약은 입에 쓰다" },
                { text: "經世濟民 (경세제민)", hint: "세상을 다스리고 백성을 구제함" }
            ]
          };
      
          // DOM 요소
          const friendsBtn = document.getElementById("friends-btn");
          const familyBtn = document.getElementById("family-btn");
          const adviceBtn = document.getElementById("advice-btn");
          const searchInput = document.getElementById("search-input");
          const idiomList = document.getElementById("idiom-list");
      
          let currentCategory = "friends"; // 기본 카테고리
      
          // 사자성어 목록 표시 함수
          function displayIdioms(category, searchKeyword = "") {
            idiomList.innerHTML = ""; // 기존 목록 초기화
            const filteredIdioms = idioms[category].filter(idiom =>
              idiom.text.includes(searchKeyword) || idiom.hint.includes(searchKeyword)
            );
      
            filteredIdioms.forEach(idiom => {
              const idiomItem = document.createElement("div");
              idiomItem.classList.add("idiom-item");
              idiomItem.innerHTML = `
                ${idiom.text}
                <div class="tooltip">${idiom.hint}</div>
              `;
              idiomList.appendChild(idiomItem);
            });
      
            // 검색 결과가 없을 경우
            if (filteredIdioms.length === 0) {
              idiomList.innerHTML = `<p>검색 결과가 없습니다.</p>`;
            }
          }
      
          // 카테고리 버튼 이벤트 리스너
          friendsBtn.addEventListener("click", () => {
            currentCategory = "friends";
            displayIdioms(currentCategory, searchInput.value);
          });
      
          familyBtn.addEventListener("click", () => {
            currentCategory = "family";
            displayIdioms(currentCategory, searchInput.value);
          });
      
          adviceBtn.addEventListener("click", () => {
            currentCategory = "advice";
            displayIdioms(currentCategory, searchInput.value);
          });
      
          // 검색 입력 이벤트 리스너
          searchInput.addEventListener("input", (event) => {
            displayIdioms(currentCategory, event.target.value);
          });
      
          // 초기화
          displayIdioms(currentCategory);
}