// 대한민국 행정구역 2단계 분류 계층 마스터 데이터
const REGION_MAP = {
    "부산광역시": ["본청", "전체(기초포함)", "중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "해운대구", "사하구", "금정구", "강서구", "연제구", "수영구", "사상구", "기장군"],
    "서울특별시": ["본청", "전체(기초포함)", "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"],
    "대구광역시": ["본청", "전체(기초포함)", "중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군", "군위군"],
    "인천광역시": ["본청", "전체(기초포함)", "중구", "동구", "미추홀구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"],
    "광주광역시": ["본청", "전체(기초포함)", "동구", "서구", "남구", "북구", "광산구"],
    "대전광역시": ["본청", "전체(기초포함)", "동구", "중구", "서구", "유성구", "대덕구"],
    "울산광역시": ["본청", "전체(기초포함)", "중구", "남구", "동구", "북구", "울주군"],
    "세종특별자치시": ["본청"],
    "경기도": ["본청", "전체(기초포함)", "수원시", "고양시", "용인시", "성남시", "부천시", "화성시", "안산시", "남양주시", "안양시", "평택시", "시흥시", "파주시", "의정부시", "김포시", "광주시", "광명시", "군포시", "하남시", "오산시", "양주시", "이천시", "구리시", "의왕시", "포천시", "양평군", "여주시", "동두천시", "가평군", "연천군"],
    "강원특별자치도": ["본청", "전체(기초포함)", "춘천시", "원주시", "강릉시", "동해시", "태백시", "속초시", "삼척시", "홍천군", "횡성군", "영월군", "평창군", "정선군", "철원군", "화천군", "양구군", "인제군", "고성군", "양양군"],
    "충청북도": ["본청", "전체(기초포함)", "청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"],
    "충청남도": ["본청", "전체(기초포함)", "천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"],
    "전북특별자치도": ["본청", "전체(기초포함)", "전주시", "군산시", "익산시", "정읍시", "남원시", "김제시", "완주군", "진안군", "무주군", "장수군", "임실군", "순창군", "고창군", "부안군"],
    "전라남도": ["본청", "전체(기초포함)", "목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군", "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군", "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"],
    "경상북도": ["본청", "전체(기초포함)", "포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"],
    "경상남도": ["본청", "전체(기초포함)", "창원시", "진주시", "통영시", "사천시", "김해시", "밀양시", "거제시", "양산시", "의령군", "함안군", "창녕군", "고성군", "남해군", "하동군", "산청군", "함양군", "거창군", "합천군"],
    "제주특별자치도": ["본청", "전체(기초포함)", "제주시", "서귀포시"],
};

const CENTRAL_GOVS = ["재정경제부", "기획예산처", "교육부", "과학기술정보통신부", "외교부", "통일부", "법무부", "국방부", "행정안전부", "국가보훈부", "문화체육관광부", "농림축산식품부", "산업통상부", "보건복지부", "기후에너지환경부", "고용노동부", "성평등가족부", "국토교통부", "해양수산부", "중소벤처기업부"];

const REAL_GOV_MAP = {
    "재정경제부": "기획재정부",
    "기획예산처": "기획재정부",
    "산업통상부": "산업통상자원부",
    "기후에너지환경부": "환경부",
    "성평등가족부": "여성가족부"
};

const API_KEY = "kicharisma";

// 가짜 부서 필터링용 제외 단어
const EXCLUDE_DEPT_WORDS = new Set([
    "진단", "판단", "공단", "재단", "효과", "결과", "부과", "초과", "일과", "학과", "통과", "관",
    "소관", "과", "단", "실", "국", "원", "소", "처", "체포", "대응", "수행", "안내", 
    "부담", "전담", "조직", "수립", "제출", "작성", "등록", "진흥", "육성", "지원",
    "처리", "전결", "결재", "위임", "업무", "사무", "보고", "관리", "평가", "시달",
    "통보", "시행", "지정", "취소", "등록", "허가", "처분", "정원", "직급", "직렬", "인력",
    "중앙부처", "부처", "공공기관", "기관", "중앙행정기관", "행정기관", "장관", "대통령", "국무총리", 
    "지자체", "지방자치단체", "시장", "도지사", "군수", "구청장", "부시장", "부지사", "지휘부", 
    "배심원단", "배심원", "시민배심원단", "관계부처", "관계기관", "협의체", "조정", "협력", "수감", 
    "감사원", "감찰", "비위", "성과", "직무성과", "상당", "명과", "성명과", "이름과", "개관시간", 
    "휴관", "성명", "이름", "연령", "성별", "개관", "휴관일", "개관시간 및 휴관",
    "주무관", "사무관", "서기관", "기술관", "입소", "퇴소", "사회복지시설 입소", "사회복지시설입소",
    "기소", "공소", "소송", "해소", "청소", "취소", "개소", "폐소", "소장", "체육회",
    "법원", "가족관계등록부", "부존재", "증명원", "본인서명사실", "서명사실", "사실", "취득", "상실", "국적", "인감증명",
    "신청서", "확인원", "등록확인원", "계획서", "동의서", "의견서", "보고서", "명세서", "계약서", "납부서", "확인서", "증명서"
]);

// 위원회를 부서 유형 패턴에 명시적으로 추가
const DEPT_PATTERN = /^[가-힣a-zA-Z\s\u2027·]+(?:과|담당관|관|대변인|단|실|국|본부|위원회|처|센터|원|소)$/;

// UI Elements
const themeToggleBtn = document.getElementById("themeToggleBtn");
const radioCentral = document.getElementById("radioCentral");
const radioLocal = document.getElementById("radioLocal");
const selectMain = document.getElementById("selectMain");
const selectSub = document.getElementById("selectSub");
const groupSub = document.getElementById("groupSub");
const inputKeyword = document.getElementById("inputKeyword");
const btnSearchOrdin = document.getElementById("btnSearchOrdin");
const btnSearchJeongyeol = document.getElementById("btnSearchJeongyeol");
const btnStop = document.getElementById("btnStop");
const btnClearLog = document.getElementById("btnClearLog");
const logOutput = document.getElementById("logOutput");
const reportOutput = document.getElementById("reportOutput");
const reportSummaryCards = document.getElementById("reportSummaryCards");
const countOrgs = document.getElementById("countOrgs");
const countLaws = document.getElementById("countLaws");
const countCases = document.getElementById("countCases");
const tabBtnLogs = document.getElementById("tabBtnLogs");
const tabBtnReport = document.getElementById("tabBtnReport");
const tabLogs = document.getElementById("tabLogs");
const tabReport = document.getElementById("tabReport");
const inputResultSearch = document.getElementById("inputResultSearch");
const btnPrevMatch = document.getElementById("btnPrevMatch");
const btnNextMatch = document.getElementById("btnNextMatch");
const labelSearchStatus = document.getElementById("labelSearchStatus");
const btnDownloadExcel = document.getElementById("btnDownloadExcel");

let isSearching = false;
let abortController = null;
let latestResults = null;
let currentSearchMatches = [];
let currentSearchIndex = -1;
let currentActiveSearchBox = "log"; // 'log' or 'report'

// Theme Toggle
themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.body.classList.toggle("light-mode");
    const isDark = document.body.classList.contains("dark-mode");
    themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// Tab Navigation
const tabButtons = [tabBtnLogs, tabBtnReport];
const tabPanes = [tabLogs, tabReport];

tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));
        
        btn.classList.add("active");
        const targetPane = document.getElementById(btn.getAttribute("data-tab"));
        targetPane.classList.add("active");
        
        currentActiveSearchBox = (btn.id === "tabBtnLogs") ? "log" : "report";
        resetResultSearch();
    });
});

// Dropdowns Updates
function initDropdowns() {
    if (radioCentral.checked) {
        populateSelect(selectMain, ["전체 중앙행정기관", ...CENTRAL_GOVS]);
        selectMain.value = "전체 중앙행정기관";
        groupSub.style.display = "none";
        selectSub.disabled = true;
    } else {
        populateSelect(selectMain, ["전국 광역단체 전체", ...Object.keys(REGION_MAP)]);
        selectMain.value = "부산광역시";
        groupSub.style.display = "flex";
        selectSub.disabled = false;
        updateSubDropdown("부산광역시");
    }
}

function updateSubDropdown(mainChoice) {
    if (mainChoice === "전국 광역단체 전체") {
        populateSelect(selectSub, ["본청"]);
        selectSub.value = "본청";
        selectSub.disabled = true;
    } else {
        selectSub.disabled = false;
        const subList = REGION_MAP[mainChoice] || ["본청"];
        populateSelect(selectSub, subList);
        selectSub.value = "본청";
    }
}

function populateSelect(element, items) {
    element.innerHTML = "";
    items.forEach(item => {
        const opt = document.createElement("option");
        opt.value = item;
        opt.textContent = item;
        element.appendChild(opt);
    });
}

radioCentral.addEventListener("change", initDropdowns);
radioLocal.addEventListener("change", initDropdowns);
selectMain.addEventListener("change", (e) => {
    if (radioLocal.checked) {
        updateSubDropdown(e.target.value);
    }
});

// Clear Log
btnClearLog.addEventListener("click", () => {
    logOutput.innerHTML = `
        <div class="empty-welcome">
            <i class="fa-solid fa-arrow-pointer wave-animation"></i>
            <h3>데이터 대기 중...</h3>
            <p>사무 검색어를 입력하고 정밀 추적을 시작해 주세요.</p>
        </div>
    `;
    resetResultSearch();
});

// Initialize on load
initDropdowns();

/* CORS Proxy list for request rotation */
const PROXY_TEMPLATES = [
    url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    url => `https://thingproxy.freeboard.io/fetch/${url}`
];

// Fetch helper with proxy fallback and timeout support
async function fetchViaProxy(url, signal) {
    let lastError = null;
    for (let i = 0; i < PROXY_TEMPLATES.length; i++) {
        if (signal && signal.aborted) {
            throw new DOMException("Aborted", "AbortError");
        }
        const proxyUrl = PROXY_TEMPLATES[i](url);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 12000);
            
            let linkedSignal = controller.signal;
            if (signal) {
                signal.addEventListener("abort", () => controller.abort());
            }

            const response = await fetch(proxyUrl, { signal: linkedSignal });
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            
            let decoder = new TextDecoder("utf-8");
            let text = decoder.decode(arrayBuffer);
            
            const korMatches = text.match(/[가-힣]/g);
            if (!korMatches || korMatches.length < 3) {
                decoder = new TextDecoder("euc-kr");
                text = decoder.decode(arrayBuffer);
            }
            return text;
        } catch (e) {
            console.warn(`Proxy ${i+1} failed: ${url}`, e);
            lastError = e;
        }
    }
    throw new Error(`모든 CORS 프록시 서버 호출에 실패했습니다. (최종 에러: ${lastError?.message})`);
}

// Logging functions (renders to clean Light Logs Panel)
function writeLog(text, tag = "normal") {
    if (logOutput.querySelector(".empty-welcome")) {
        logOutput.innerHTML = "";
    }
    const line = document.createElement("div");
    line.className = "log-line";
    
    const keyword = inputKeyword.value.trim();
    if (keyword && text.includes(keyword)) {
        const parts = text.split(keyword);
        parts.forEach((part, idx) => {
            if (part) {
                const spanPart = document.createElement("span");
                spanPart.className = `log-${tag}`;
                spanPart.textContent = part;
                line.appendChild(spanPart);
            }
            if (idx < parts.length - 1) {
                const spanKw = document.createElement("span");
                spanKw.className = "log-highlight-kw";
                spanKw.textContent = keyword;
                line.appendChild(spanKw);
            }
        });
    } else {
        const span = document.createElement("span");
        span.className = `log-${tag}`;
        span.textContent = text;
        line.appendChild(span);
    }
    logOutput.appendChild(line);
    logOutput.scrollTop = logOutput.scrollHeight;
}

// Log multiple styled segments in one line
function writeLogTagged(segments) {
    if (logOutput.querySelector(".empty-welcome")) {
        logOutput.innerHTML = "";
    }
    const line = document.createElement("div");
    line.className = "log-line";
    const keyword = inputKeyword.value.trim();

    segments.forEach(([text, tag]) => {
        if (keyword && text.includes(keyword)) {
            const parts = text.split(keyword);
            parts.forEach((part, idx) => {
                if (part) {
                    const spanPart = document.createElement("span");
                    spanPart.className = `log-${tag}`;
                    spanPart.textContent = part;
                    line.appendChild(spanPart);
                }
                if (idx < parts.length - 1) {
                    const spanKw = document.createElement("span");
                    spanKw.className = "log-highlight-kw";
                    spanKw.textContent = keyword;
                    line.appendChild(spanKw);
                }
            });
        } else {
            const span = document.createElement("span");
            span.className = `log-${tag}`;
            span.textContent = text;
            line.appendChild(span);
        }
    });

    logOutput.appendChild(line);
    logOutput.scrollTop = logOutput.scrollHeight;
}

// Department extraction helper logic
function isValidDeptName(name, originalText = "") {
    let sName = name.trim();
    if (!sName || sName === "확인실패") return false;
    
    if (originalText) {
        let ori = originalText.trim();
        if (ori.includes(',') || ori.includes('/') || ori.includes('\\')) {
            if (!["기획·조정", "홍보·소통", "안전·재난", "기획·예산"].some(x => ori.includes(x))) {
                return false;
            }
        }
    }
    
    if (/^\d+/.test(sName)) {
        if (!["과", "담당관", "관", "단", "실", "국"].some(w => sName.endsWith(w))) {
            return false;
        }
    }
    
    if (/\d+\s*급/.test(sName) || ["급 이하", "급 상당", "급(상당)", "급(상당) 공무원"].some(w => sName.includes(w))) {
        return false;
    }
    
    let plainText = sName.replace(/[\(\[\{].*?[\)\}\]]/g, '').trim();
    plainText = plainText.replace(/[^가-힣a-zA-Z]/g, '').trim();
    if (plainText.length < 2 || plainText.length > 20) {
        return false;
    }
    
    let clean = sName.replace(/[\(\[\{].*?[\)\}\]]/g, '').trim();
    clean = clean.replace(/^[0-9가-힣a-zA-Z\s\.\-]+\.\s*/, '').trim();
    clean = clean.replace(/^[가-힣a-zA-Z0-9\-\.\s]+\)\s*/, '').trim();
    clean = clean.replace(/[^가-힣a-zA-Z\s\u2027·ㆍ]/g, '').trim();
    
    if (!clean) return false;
    if (!DEPT_PATTERN.test(clean)) return false;
    
    const fakeEnds = ["공무원", "요원", "회의소", "상공회의소", "연구원", "지도원", "직원", "경비원", "법원", "증명원", "체육회", "확인원", "진흥원", "재단", "공단", "공사", "협회", "서비스원", "의료원"];
    if (fakeEnds.some(e => clean.endsWith(e))) return false;
    
    const additionalExcludes = [
        "대처", "대비", "대응", "대접", "대책", "수행", "조치", "파악", "동향", "동향파악",
        "대통령", "국무총리", "장관", "도지사", "시장", "군수", "구청장", "본부장", "지휘부", "의원",
        "비위", "감사원", "감찰", "안전감찰", "감사수감", "실·과", "실 과", "실과", "명과", "개관시간", "휴관",
        "개관시간 및 휴관", "개관시간및휴관", "이용시간", "운영시간", "관람시간", "이용시간 및 휴관"
    ];
    
    const fakeEndsEndswith = [
        "보관", "동원", "귀국", "민원", "승인", "배포", "관리", "지원", "제출", "작성", "등록", 
        "진흥", "육성", "처리", "평가", "통보", "시행", "지정", "취소", "허가", "처분", "직인", 
        "합의", "조정", "협의", "감사", "단속", "점검", "정비", "운영", "훈련", "방지", "홍보", 
        "교육", "계획", "설계", "조사", "검토", "지도", "감독", "실시", "개최", "유치", "구축", 
        "이용", "선정", "추진", "개발", "예방", "기획", "협력", "수행", "안내", "명과", "성명과", 
        "이름과", "개관시간", "휴관", "개관", "휴관일", "개관시간 및 휴관",
        "사실", "상실", "증명원", "법원", "취득", "부존재", "서명사실",
        "신청서", "확인원", "등록확인원", "계획서", "동의서", "의견서", "보고서", "명세서", "계약서", "납부서", "확인서", "증명서",
        "진흥원", "재단", "공단", "공사", "협회", "서비스원", "의료원"
    ];
    
    if (fakeEndsEndswith.some(x => clean.endsWith(x))) return false;
    
    if (clean.endsWith("관") && !clean.endsWith("담당관")) {
        const validGwanEnds = ["기획관", "대변인", "홍보관", "심의관", "보좌관", "조정관", "협력관", "감사관", "통상관", "영사관"];
        if (["주무관", "조사관", "수사관", "행정관", "전문관", "지도관", "자문관", "연구관", "분석관", "검사관", "심사관", "상담관", "안전관"].some(x => clean.endsWith(x))) {
            return false;
        }
        if (clean.length >= 3 && !validGwanEnds.some(x => clean.endsWith(x))) {
            if (!["기획", "심의", "홍보", "조정", "협력"].some(x => clean.includes(x))) {
                return false;
            }
        }
    }
    
    if (clean.endsWith("소")) {
        const validSoEnds = ["보건소", "사업소", "관리소", "연구소", "지소", "검소", "대피소", "상소"];
        if (["입소", "퇴소", "개소", "폐소", "해소", "취소", "기소", "공소", "소송", "청소", "소유", "숙소", "장소", "소장"].some(x => clean.endsWith(x))) {
            return false;
        }
        if (clean.length >= 2 && !validSoEnds.some(x => clean.endsWith(x))) {
            if (!["보건", "사업", "관리", "연구", "지소", "진료소"].some(x => clean.includes(x))) {
                return false;
            }
        }
    }
    
    if (EXCLUDE_DEPT_WORDS.has(clean)) return false;
    for (let word of EXCLUDE_DEPT_WORDS) {
        if (word.length >= 2 && clean.endsWith(word)) {
            if (word === "진단" && clean.endsWith("추진단")) continue;
            return false;
        }
    }
    
    if (additionalExcludes.some(word => clean.includes(word))) return false;
    
    return true;
}

function extractValidDeptName(text) {
    let sText = text.trim();
    if (!sText) return null;
    
    const parenMatches = sText.match(/[\(\[\{](.*?)[\)\}\]]/g);
    if (parenMatches) {
        for (let m of parenMatches) {
            let partClean = m.slice(1, -1).trim();
            if (["실장", "과장", "단장", "국장", "본부장", "처장", "원장", "소장", "센터장", "기획관", "대변인"].some(x => partClean.endsWith(x))) {
                if (!partClean.endsWith("담당관") && !partClean.endsWith("대변인") && partClean.endsWith("장")) {
                    partClean = partClean.slice(0, -1);
                }
            }
            if (isValidDeptName(partClean, m)) {
                return partClean;
            }
        }
    }
    
    const isDefinitionLine = ["관장", "분장", "둔다", "소관 사무", "담당 사무"].some(k => sText.includes(k));
    if (isDefinitionLine) {
        const words = sText.match(/([가-힣·]+(?:과|담당관|관|대변인|단|실|국|본부|위원회|처|센터|원|소)(?:장)?)(?=[은는이가의을를에서와과도만으로]|[^가-힣·]|$)/g);
        if (words) {
            for (let word of words) {
                let wordClean = word.trim();
                if (["실장", "과장", "단장", "국장", "본부장", "처장", "원장", "소장", "센터장"].some(x => wordClean.endsWith(x))) {
                    if (!wordClean.endsWith("담당관") && !wordClean.endsWith("대변인") && wordClean.endsWith("장")) {
                        wordClean = wordClean.slice(0, -1);
                    }
                }
                if (isValidDeptName(wordClean, word)) {
                    return wordClean;
                }
            }
        }
    }
    
    let clean = sText.replace(/[\(\[\{].*?[\)\}\]]/g, '').trim();
    clean = clean.replace(/^제\s*\d+\s*조의?\s*\d*/, '').trim();
    clean = clean.replace(/^[0-9가-힣a-zA-Z\s\.\-]+\.\s*/, '').trim();
    clean = clean.replace(/^[가-힣a-zA-Z0-9\-\.\s]+\)\s*/, '').trim();
    clean = clean.replace(/[^가-힣a-zA-Z\s\u2027·]/g, '').trim();
    if (isValidDeptName(clean, sText)) {
        return clean;
    }
    
    return null;
}

// API list querying function
async function querySearchList(target, query, signal) {
    const results = {};
    const display = 100;
    
    for (let page = 1; page <= 5; page++) {
        if (signal && signal.aborted) throw new DOMException("Aborted", "AbortError");
        
        const url = `https://www.law.go.kr/DRF/lawSearch.do?OC=${API_KEY}&target=${target}&type=XML&query=${encodeURIComponent(query)}&display=${display}&page=${page}`;
        try {
            const raw = await fetchViaProxy(url, signal);
            
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(raw, "text/xml");
            
            const totalElement = xmlDoc.querySelector("totalCnt");
            const total = totalElement ? parseInt(totalElement.textContent) || 0 : 0;
            
            if (total === 0) break;
            
            // lawSearch list API returns elements <law id="..."> even for target="ordin"
            const items = xmlDoc.querySelectorAll("ordin, law, admrul");
            if (items.length === 0) break;
            
            items.forEach(item => {
                const idAttr = item.getAttribute("id");
                const tagId = item.querySelector("행정규칙일련번호, 자치법규일련번호, 법령일련번호")?.textContent;
                const mst = tagId || idAttr;
                
                const name = item.querySelector("법령명, 자치법규명, 행정규칙명")?.textContent || "";
                // 소관기관/지자체기관명 추출 추가
                const org = item.querySelector("소관부처, 소관기관, 소관지자체, 지자체기관명")?.textContent || "";
                
                if (mst && name) {
                    results[mst] = { name: name.trim(), org: org.trim(), target: target };
                }
            });
            
            if (page * display >= total) break;
        } catch (e) {
            console.error("XML 검색 리스트 요청 실패:", e);
            break;
        }
    }
    return results;
}

// Start Search Trigger
btnSearchOrdin.addEventListener("click", () => startTracking("ordin"));
btnSearchJeongyeol.addEventListener("click", () => startTracking("jeongyeol"));
btnStop.addEventListener("click", stopTracking);

function stopTracking() {
    if (isSearching && abortController) {
        abortController.abort();
        writeLog("\n🛑 사용자에 의해 추적 작업이 중단되었습니다.", "error");
        setSearchingState(false);
    }
}

function setSearchingState(state) {
    isSearching = state;
    btnSearchOrdin.disabled = state;
    btnSearchJeongyeol.disabled = state;
    btnStop.disabled = !state;
    
    if (state) {
        btnSearchOrdin.innerHTML = '<i class="fa-solid fa-spinner fa-spin-custom"></i> 가동 중...';
        btnSearchJeongyeol.disabled = true;
    } else {
        btnSearchOrdin.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> 분장사무 정밀 추적';
        btnSearchJeongyeol.disabled = false;
        
        if (latestResults && Object.keys(latestResults.summary).length > 0) {
            btnDownloadExcel.disabled = false;
            inputResultSearch.disabled = false;
        }
    }
}

async function startTracking(mode) {
    if (isSearching) return;
    
    const keyword = inputKeyword.value.trim();
    if (!keyword) {
        alert("사무 검색어를 입력해주세요.");
        inputKeyword.focus();
        return;
    }
    
    tabBtnLogs.click();
    
    logOutput.innerHTML = "";
    reportOutput.innerHTML = "";
    reportSummaryCards.style.display = "none";
    setSearchingState(true);
    
    const mainRegion = selectMain.value;
    const subRegion = radioCentral.checked ? "" : selectSub.value;
    
    abortController = new AbortController();
    const signal = abortController.signal;
    
    try {
        await executeSearchLogic(keyword, mainRegion, subRegion, mode, signal);
    } catch (err) {
        if (err.name === 'AbortError') {
            writeLog("\n🛑 추적 엔진이 안전하게 중단되었습니다.", "error");
        } else {
            writeLog(`\n❌ 치명적 추적 오류 발생: ${err.message}`, "error");
        }
        console.error(err);
    } finally {
        setSearchingState(false);
    }
}

async function executeSearchLogic(keyword, mainRegion, subRegion, mode, signal) {
    const isCentral = radioCentral.checked;
    const modeText = mode === "jeongyeol" ? "사무전결" : "행정분류";
    
    writeLog(`🚀 ${modeText} 엔진 가동: [${mainRegion} ${subRegion ? '-> ' + subRegion : ''}] 정밀 스캔 시작`, "welcome");
    writeLog("==========================================================================================", "normal");
    
    let targetRegions = [];
    if (isCentral) {
        targetRegions = mainRegion === "전체 중앙행정기관" ? CENTRAL_GOVS : [mainRegion];
    } else {
        targetRegions = mainRegion === "전국 광역단체 전체" ? Object.keys(REGION_MAP) : [mainRegion];
    }
    
    const finalSummary = {};
    let foundCount = 0;
    const spaceStrippedKeyword = keyword.replace(/\s+/g, "");
    
    for (const curRegion of targetRegions) {
        if (signal.aborted) throw new DOMException("Aborted", "AbortError");
        
        if (targetRegions.length > 1) {
            writeLog(`\n📡 [${curRegion}] ${isCentral ? '소관직제 법령' : '자치법규'} 수집 시작...`);
        }
        
        const targetLaws = {};
        if (isCentral) {
            if (mode === "jeongyeol") {
                const realRegion = REAL_GOV_MAP[curRegion] || curRegion;
                const searchQueries = [
                    [`${realRegion} 위임전결규정`, ["admrul"]],
                    [`${realRegion} 위임전결 규정`, ["admrul"]],
                    [`${realRegion} 위임 전결 규정`, ["admrul"]],
                    [`${realRegion} 전결`, ["admrul"]],
                    [`${realRegion} 사무분장`, ["admrul", "law"]]
                ];
                for (const [q, targets] of searchQueries) {
                    for (const tgt of targets) {
                        const found = await querySearchList(tgt, q, signal);
                        Object.entries(found).forEach(([mst, d]) => {
                            if (d.name.includes(realRegion) && !["교육청", "교육감", "의회"].some(w => d.name.includes(w))) {
                                targetLaws[mst] = d;
                            }
                        });
                    }
                }
            } else {
                const govSearchMap = {
                    "재정경제부": ["재정경제부 직제", "재정경제부 직제 시행규칙"],
                    "기획예산처": ["기획예산처와 그 소속기관 직제", "기획예산처와 그 소속기관 직제 시행규칙"],
                    "산업통상부": ["산업통상부와 그 소속기관 직제", "산업통상부와 그 소속기관 직제 시행규칙"],
                    "성평등가족부": ["성평등가족부 직제", "성평등가족부 직제 시행규칙"]
                };
                
                let queries = [];
                let matchKw = curRegion;
                if (govSearchMap[curRegion]) {
                    queries = govSearchMap[curRegion];
                } else {
                    const realRegion = REAL_GOV_MAP[curRegion] || curRegion;
                    queries = [
                        `${realRegion} 직제`,
                        `${realRegion}와 그 소속기관 직제`,
                        `${realRegion} 사무분장`
                    ];
                    matchKw = realRegion;
                }
                
                for (const q of queries) {
                    for (const tgt of ["law", "admrul"]) {
                        const found = await querySearchList(tgt, q, signal);
                        Object.entries(found).forEach(([mst, d]) => {
                            if (d.name.includes(matchKw) && !["전결", "결재", "위임", "처리"].some(w => d.name.includes(w))) {
                                targetLaws[mst] = d;
                            }
                        });
                    }
                }
            }
        } else {
            let queries = [];
            if (mode === "jeongyeol") {
                queries = [
                    `${curRegion} 사무전결처리규칙`,
                    `${curRegion} 사무전결 처리 규칙`,
                    `${curRegion} 사무전결 규칙`,
                    `${curRegion} 사무전결처리 규칙`,
                    `${curRegion} 사무 전결 규칙`,
                    `${curRegion} 사무전결`,
                    `${curRegion} 사무 전결`
                ];
            } else {
                queries = [
                    `${curRegion} 행정기구 설치 조례 시행규칙`,
                    `${curRegion} 행정기구 및 정원 조례 시행규칙`,
                    `${curRegion} 행정기구 설치 조례`,
                    `${curRegion} 행정기구 및 정원 조례`,
                    `${curRegion} 사무분장`
                ];
            }
            
            const guList = REGION_MAP[curRegion] ? REGION_MAP[curRegion].slice(2) : [];
            const regionShort = curRegion.replace(/(특별시|광역시|특별자치시|특별자치도|도)/g, "").trim();
            
            const rawPool = {};
            for (const q of queries) {
                const found = await querySearchList("ordin", q, signal);
                Object.assign(rawPool, found);
            }
            
            Object.entries(rawPool).forEach(([mst, d]) => {
                const nm = d.name;
                if (mode === "ordin") {
                    if (["교육청", "교육감", "의회", "의사", "의원", "전결", "결재", "위임", "처리규정", "처리 규칙", "처리 조례"].some(w => nm.includes(w))) {
                        return;
                    }
                } else {
                    if (["교육청", "교육감", "의회", "의사", "의원"].some(w => nm.includes(w))) {
                        return;
                    }
                }
                
                const nmMatch = nm.includes(curRegion) || nm.includes(regionShort);
                const effectiveSub = subRegion || "본청";
                
                if (effectiveSub === "전체(기초포함)") {
                    if (nmMatch) targetLaws[mst] = d;
                } else if (effectiveSub === "본청") {
                    const isGu = guList.some(g => g && nm.includes(g));
                    if (nmMatch && !isGu) targetLaws[mst] = d;
                } else {
                    if (nm.includes(effectiveSub)) targetLaws[mst] = d;
                }
            });
        }
        
        if (Object.keys(targetLaws).length === 0) {
            if (targetRegions.length === 1) {
                const displaySub = subRegion || "전체";
                writeLog(`❌ [${curRegion} -> ${displaySub}] 필터 조건에 매칭되는 조직법령을 찾지 못했습니다.`, "error");
                return;
            }
            continue;
        }
        
        for (const [mst, ldata] of Object.entries(targetLaws)) {
            if (signal.aborted) throw new DOMException("Aborted", "AbortError");
            
            const lName = ldata.name;
            const tgt = ldata.target;
            
            let detailUrl = "";
            if (tgt === "ordin") {
                detailUrl = `https://www.law.go.kr/DRF/lawService.do?OC=${API_KEY}&target=ordin&type=XML&MST=${mst}`;
            } else if (tgt === "admrul") {
                detailUrl = `https://www.law.go.kr/DRF/lawService.do?OC=${API_KEY}&target=admrul&type=XML&ID=${mst}`;
            } else {
                detailUrl = `https://www.law.go.kr/DRF/lawService.do?OC=${API_KEY}&target=${tgt}&type=XML&MST=${mst}`;
            }
            
            try {
                const decodedText = await fetchViaProxy(detailUrl, signal);
                let fullText = "";
                
                const cdataRegex = /<!\[CDATA\[([\s\S]*?)\]\]>/g;
                let cdataMatch;
                const cdatas = [];
                while ((cdataMatch = cdataRegex.exec(decodedText)) !== null) {
                    cdatas.push(cdataMatch[1]);
                }
                
                if (cdatas.length > 0) {
                    fullText = cdatas.join("\n");
                } else {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(decodedText, "text/xml");
                    fullText = xmlDoc.documentElement.textContent || "";
                }
                
                const matchedLines = [];
                const spaceStrippedContent = fullText.replace(/\s+/g, "");
                
                if (spaceStrippedContent.includes(spaceStrippedKeyword)) {
                    const lines = fullText.split('\n');
                    for (let idx = 0; idx < lines.length; idx++) {
                        const line = lines[idx];
                        if (/^\s*부\s*칙\b/.test(line) || /^\[부칙\]/.test(line)) {
                            break;
                        }
                        
                        const cl = line.replace(/\s+/g, " ").trim();
                        const lineStripped = cl.replace(/\s+/g, "");
                        
                        if (lineStripped.includes(spaceStrippedKeyword) && cl.length > 1) {
                            let isNonBoncheong = false;
                            if (!isCentral && (!subRegion || subRegion === "본청")) {
                                for (let lookBack = idx; lookBack >= 0; lookBack--) {
                                    const backLine = lines[lookBack].trim();
                                    if (/^제\s*\d+\s*[장절]/.test(backLine) || (backLine.startsWith('[') && backLine.endsWith(']') && (backLine.includes('장') || backLine.includes('절')))) {
                                        if (["직속기관", "사업소", "의회", "소방", "합의제행정기관", "합의제"].some(k => backLine.includes(k))) {
                                            isNonBoncheong = true;
                                            break;
                                        } else if (backLine.includes("본청")) {
                                            break;
                                        }
                                    }
                                }
                            }
                            
                            if (isNonBoncheong) continue;
                            
                            let foundDept = "알 수 없음 (부서 매칭 실패)";
                            for (let lookBack = idx; lookBack >= 0; lookBack--) {
                                const backLine = lines[lookBack].trim();
                                const deptExt = extractValidDeptName(backLine);
                                if (deptExt) {
                                    if (!isCentral && (!subRegion || subRegion === "본청")) {
                                        if (["소방", "의회", "의사", "의원", "구조구급", "특수구조", "소방행정", "예방과"].some(k => deptExt.includes(k))) {
                                            isNonBoncheong = true;
                                            break;
                                        }
                                    }
                                    foundDept = deptExt;
                                    break;
                                }
                            }
                            
                            if (isNonBoncheong) continue;
                            if (foundDept && foundDept !== "알 수 없음 (부서 매칭 실패)") {
                                if (!isValidDeptName(foundDept)) {
                                    foundDept = "알 수 없음 (부서 매칭 실패)";
                                }
                            }
                            matchedLines.push([foundDept, cl]);
                        }
                    }
                    
                    const isOrgLaw = lName.includes("행정기구") || lName.includes("직제") || lName.includes("조직");
                    const orgKey = isCentral ? curRegion : (ldata.org || curRegion);
                    
                    if (matchedLines.length > 0) {
                        foundCount++;
                        writeLog(`\n🎯 [소관 부서 본문 내 분장사무 발견! -> ${lName}]`, "success");
                        if (tgt === "ordin") {
                            writeLog(`   🔗 https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=${mst}`);
                        }
                        writeLog("------------------------------------------------------------------------------------------", "normal");
                        
                        matchedLines.forEach(([dept, matchLine]) => {
                            writeLogTagged([["   ▶ 소관부서: ", "normal"], [`[${dept}]`, "dept"]]);
                            writeLog(`      - 분장사무: ${matchLine}`, "office");
                            
                            if (!finalSummary[orgKey]) finalSummary[orgKey] = [];
                            finalSummary[orgKey].push([lName, dept, matchLine, isOrgLaw, mst]);
                        });
                        writeLog("------------------------------------------------------------------------------------------", "normal");
                    }
                }
                
                // 별표 서식 추적 (ordinbyl API 활용해 완벽 수집 및 동기화)
                let uniqueBylSeqs = [];
                if (tgt === "ordin") {
                    try {
                        let cleanLawName = lName.split('[')[0].trim();
                        cleanLawName = cleanLawName.replace(/본청\s+|소방공무원\s+|의회사무처\s+|와\s+그\s+소속기관|그\s+소속기관/g, "");
                        cleanLawName = cleanLawName.replace(/\s*(시행규칙|규칙|조례|규정)$/, "").trim();
                        
                        const kichoWords = ["구 ", "군 ", "시 "];
                        const kichoEnds = ["구", "군", "시"];
                        const isKichoLaw = kichoWords.some(k => cleanLawName.includes(k)) || kichoEnds.some(k => cleanLawName.endsWith(k));
                        if (isKichoLaw) {
                            const regions = ["부산광역시", "서울특별시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원특별자치도", "충청북도", "충청남도", "전북특별자치도", "전라남도", "경상북도", "경상남도", "제주특별자치도"];
                            for (let r of regions) {
                                if (cleanLawName.startsWith(r)) {
                                    cleanLawName = cleanLawName.replace(r, "").trim();
                                    break;
                                }
                            }
                        }
                        
                        let bylUrl = `https://www.law.go.kr/DRF/lawSearch.do?OC=${API_KEY}&target=ordinbyl&type=XML&search=2&query=${encodeURIComponent(cleanLawName)}&display=100`;
                        let xmlText = await fetchViaProxy(bylUrl, signal);
                        
                        let parser = new DOMParser();
                        let doc = parser.parseFromString(xmlText, "text/xml");
                        let blocks = doc.querySelectorAll("ordinbyl");
                        
                        if (blocks.length === 0) {
                            const regionShort = curRegion.replace(/(특별시|광역시|특별자치시|특별자치도|도)/g, "").trim();
                            const fallbackQueries = [
                                `${curRegion} 사무 전결`,
                                `${regionShort} 사무 전결`,
                                `${curRegion} 행정기구`
                            ];
                            for (let fq of fallbackQueries) {
                                let fallbackUrl = `https://www.law.go.kr/DRF/lawSearch.do?OC=${API_KEY}&target=ordinbyl&type=XML&search=2&query=${encodeURIComponent(fq)}&display=100`;
                                let xmlFb = await fetchViaProxy(fallbackUrl, signal);
                                let docFb = parser.parseFromString(xmlFb, "text/xml");
                                let blocksFb = docFb.querySelectorAll("ordinbyl");
                                if (blocksFb.length > 0) {
                                    blocks = blocksFb;
                                    break;
                                }
                            }
                        }
                        
                        blocks.forEach(block => {
                            const refSeq = block.querySelector("관련자치법규일련번호, 자치법규일련번호")?.textContent;
                            if (refSeq === mst) {
                                const bylSeq = block.querySelector("별표일련번호")?.textContent;
                                if (bylSeq) {
                                    uniqueBylSeqs.push(bylSeq);
                                }
                            }
                        });
                    } catch (eBylSearch) {
                        console.error("ordinbyl API 검색 실패:", eBylSearch);
                    }
                }
                
                // 2차 폴백: 본문 내부 direct regex 추출
                const directSeqs = [];
                const re1 = /bylSeq\s*=\s*["']?(\d+)/g;
                const re2 = /lsBylPop\s*\(\s*["']?(\d+)/g;
                const re3 = /<별표일련번호>(\d+)<\/별표일련번호>/g;
                const re4 = /bylSeq\s*:\s*["']?(\d+)/g;
                
                let match;
                while ((match = re1.exec(decodedText)) !== null) directSeqs.push(match[1]);
                while ((match = re2.exec(decodedText)) !== null) directSeqs.push(match[1]);
                while ((match = re3.exec(decodedText)) !== null) directSeqs.push(match[1]);
                while ((match = re4.exec(decodedText)) !== null) directSeqs.push(match[1]);
                
                directSeqs.forEach(seq => uniqueBylSeqs.push(seq));
                uniqueBylSeqs = [...new Set(uniqueBylSeqs)];
                
                const isOrgLaw = lName.includes("행정기구") || lName.includes("직제") || lName.includes("조직");
                const orgKey = isCentral ? curRegion : (ldata.org || curRegion);

                for (const bylSeq of uniqueBylSeqs) {
                    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
                    
                    const bylHtmlUrl = `https://www.law.go.kr/LSW/lsBylInfoR.do?bylSeq=${bylSeq}&type=html`;
                    try {
                        const rawBylHtml = await fetchViaProxy(bylHtmlUrl, signal);
                        
                        const parser = new DOMParser();
                        const htmlDoc = parser.parseFromString(rawBylHtml, "text/html");
                        const text = htmlDoc.body.textContent || "";
                        
                        const spaceStrippedBylText = text.replace(/\s+/g, "");
                        if (spaceStrippedBylText.includes(spaceStrippedKeyword)) {
                            const lines = text.split('\n');
                            const matchedBylLines = [];
                            const seenLines = new Set();
                            
                            lines.forEach((line, lineIdx) => {
                                const cl = line.replace(/\s+/g, " ").trim();
                                const strippedCl = cl.replace(/\s+/g, "");
                                
                                if (strippedCl.includes(spaceStrippedKeyword) && cl.length > 1) {
                                    let foundDept = "확인실패";
                                    for (let lookBack = lineIdx; lookBack >= 0; lookBack--) {
                                        const backLine = lines[lookBack].trim();
                                        const deptExt = extractValidDeptName(backLine);
                                        if (deptExt && isValidDeptName(deptExt)) {
                                            foundDept = deptExt;
                                            break;
                                        }
                                    }
                                    if (!seenLines.has(cl)) {
                                        matchedBylLines.push([foundDept, cl]);
                                        seenLines.add(cl);
                                    }
                                }
                            });
                            
                            if (matchedBylLines.length > 0) {
                                foundCount++;
                                writeLog(`\n🎯 [첨부 별표 내부 분장사무 발견! -> 별표 일련번호 #${bylSeq}]`, "success");
                                writeLog(`   📜 근거법령: ${lName}`);
                                writeLog("------------------------------------------------------------------------------------------", "normal");
                                
                                matchedBylLines.forEach(([dept, matchLine]) => {
                                    writeLogTagged([["   ▶ 소관부서: ", "normal"], [`[${dept}]`, "dept"]]);
                                    writeLog(`      - 분장사무: ${matchLine}`, "office");
                                    
                                    if (!finalSummary[orgKey]) finalSummary[orgKey] = [];
                                    finalSummary[orgKey].push([lName, dept, matchLine, isOrgLaw, mst]);
                                });
                                writeLog("------------------------------------------------------------------------------------------", "normal");
                            }
                        }
                    } catch (eByl) {
                        console.error(`별표 #${bylSeq} 파싱 실패:`, eByl);
                    }
                }
            } catch (e) {
                console.error(`${lName} 파싱 중 오류:`, e);
            }
        }
    }
    
    writeLog("------------------------------------------------------------------------------------------", "normal");
    if (foundCount === 0) {
        writeLog(`❌ '${keyword}' 관련 분장사무를 찾지 못했습니다.`, "error");
        writeLog("\n💡 검색 팁:");
        if (isCentral) {
            writeLog("   - 검색 키워드를 축약해 보세요 (예: '정부예산관리' -> '예산' 또는 '재정')");
        } else {
            writeLog("   - 단어 단위를 축약해 보세요 (예: '대중교통민원' -> '교통' 또는 '버스')");
            writeLog("   - 자치구 단위를 스캔하려면 '전체(기초포함)'로 검색하세요.");
        }
        latestResults = null;
    } else {
        writeLog(`🎉 스캔 완료! 총 ${foundCount}개 조직법령에서 '${keyword}' 분석을 완료했습니다.`, "success");
        
        const cleanedSummary = {};
        const targetKeys = isCentral ? targetRegions : (mainRegion === "전국 광역단체 전체" ? Object.keys(REGION_MAP) : [mainRegion]);
        const missedRegions = [];
        
        targetKeys.forEach(r => {
            let hasAny = false;
            Object.keys(finalSummary).forEach(k => {
                if (k.startsWith(r) || r.startsWith(k)) hasAny = true;
            });
            if (!hasAny) missedRegions.push(r);
        });
        
        Object.entries(finalSummary).forEach(([region, matches]) => {
            const hasOrgLaw = matches.some(m => m[3]);
            const filteredMatches = hasOrgLaw ? matches.filter(m => m[3]) : matches;
            
            const grouped = {};
            filteredMatches.forEach(([lName, dept, matchLine, isOrg, mst]) => {
                let cleanDept = dept.replace(/^[0-9가-힣a-zA-Z\s\.\-]+\.\s*/, '').trim();
                cleanDept = cleanDept.replace(/[\(\[\{].*?[\)\}\]]/g, '').trim();
                if (!cleanDept) cleanDept = dept;
                
                const groupKey = `${cleanDept}||${lName}`;
                if (!grouped[groupKey]) {
                    grouped[groupKey] = {
                        lName,
                        dept: cleanDept,
                        lines: [],
                        isOrg,
                        mst
                    };
                }
                if (!grouped[groupKey].lines.includes(matchLine)) {
                    grouped[groupKey].lines.push(matchLine);
                }
            });
            
            cleanedSummary[region] = Object.values(grouped);
        });
        
        latestResults = {
            summary: cleanedSummary,
            missed: missedRegions,
            isCentral: isCentral
        };
        
        // Print the Final Report directly in the Log Terminal (matching Python's double printing in light box)
        writeLog("\n" + "------------------------------------------------------------------------------------------", "normal");
        writeLogTagged([["📢 [최종 분석 보고서: '", "welcome"], [keyword, "dept"], ["' 소관 부서 정밀 매칭 결과]\n", "welcome"]]);
        writeLog("------------------------------------------------------------------------------------------\n", "normal");
        
        let totalCasesCount = 0;
        let totalOrgsCount = Object.keys(cleanedSummary).length;
        let totalLawsCount = 0;

        Object.entries(cleanedSummary).forEach(([region, matches]) => {
            writeLogTagged([["📍 [", "normal"], [region, "region"], ["]", "normal"]]);
            
            matches.forEach(m => {
                totalLawsCount++;
                totalCasesCount += m.lines.length;
                
                let lawType = "";
                if (isCentral) {
                    lawType = m.isOrg ? "★ 1순위 (기구 조직 직제/시행규칙)" : "📝 2순위 (일반 사무 규정)";
                } else {
                    lawType = m.isOrg ? "★ 1순위 (기구 조직 조례/규칙)" : "📝 2순위 (일반 사무 규정)";
                }
                
                writeLogTagged([["   ▶ 소관 부서 : ", "normal"], [m.dept, "dept"], [` (${lawType})`, "office"]]);
                writeLogTagged([["   ▶ 근거 법령 : ", "normal"], [m.lName, "law"]]);
                
                if (m.lines.length === 1) {
                    writeLogTagged([["   ▶ 분장 사무 : ", "normal"], [m.lines[0], "office"]]);
                } else {
                    writeLogTagged([["   ▶ 분장 사무 :", "normal"]]);
                    m.lines.forEach(line => {
                        writeLogTagged([["      - ", "normal"], [line, "office"]]);
                    });
                }
                writeLog(""); 
            });
            writeLog("------------------------------------------------------------------------------------------\n", "normal");
        });
        
        if (missedRegions.length > 0) {
            writeLogTagged([["⚠️ [사무 미검출 지자체/부처 목록 (총 ", "normal"], [String(missedRegions.length), "error"], ["건)]", "normal"]]);
            writeLog("   - 해당 검색어로 명시적인 소관 사무를 규정하지 않은 단체 목록입니다.", "office");
            missedRegions.forEach(mr => {
                writeLogTagged([["   ❌ ", "error"], [mr, "region"]]);
            });
            writeLog("\n" + "------------------------------------------------------------------------------------------\n", "normal");
        }
        
        writeLogTagged([
            ["❖ 전체 정밀 스캔 완료! (총 ", "normal"],
            [String(totalOrgsCount), "error"],
            ["개 기관 ", "normal"],
            [String(totalCasesCount), "success"],
            ["건 소관 매칭 완료)", "normal"]
        ]);
        writeLog("==========================================================================================", "normal");
        
        // Also render Report in Tab 2
        renderReport(latestResults, keyword);
    }
}

// Render the final report (Tab 2 cards)
function renderReport(data, keyword) {
    reportOutput.innerHTML = "";
    reportSummaryCards.style.display = "grid";
    
    let totalOrgs = Object.keys(data.summary).length;
    let totalLaws = 0;
    let totalCases = 0;
    
    Object.entries(data.summary).forEach(([region, matches]) => {
        const regionBlock = document.createElement("div");
        regionBlock.className = "report-region-block";
        
        const title = document.createElement("h3");
        title.className = "report-region-title";
        title.innerHTML = `<i class="fa-solid fa-map-pin"></i> ${region}`;
        regionBlock.appendChild(title);
        
        matches.forEach(m => {
            totalLaws++;
            totalCases += m.lines.length;
            
            const matchCard = document.createElement("div");
            matchCard.className = "report-match-card";
            
            let lawType = "";
            if (data.isCentral) {
                lawType = m.isOrg ? "★ 1순위 (기구 조직 직제/시행규칙)" : "📝 2순위 (일반 사무 규정)";
            } else {
                lawType = m.isOrg ? "★ 1순위 (기구 조직 조례/규칙)" : "📝 2순위 (일반 사무 규정)";
            }
            
            const deptRow = document.createElement("div");
            deptRow.className = "report-dept-row";
            deptRow.innerHTML = `
                <span class="report-dept-name">${m.dept}</span>
                <span class="report-law-badge">${lawType}</span>
            `;
            matchCard.appendChild(deptRow);
            
            const lawRow = document.createElement("div");
            lawRow.className = "report-law-row";
            const lawUrl = `https://www.law.go.kr/LSW/ordinInfoP.do?ordinSeq=${m.mst}`;
            lawRow.innerHTML = `
                <i class="fa-solid fa-file-signature"></i> 
                <span>근거 법령: <a href="${lawUrl}" target="_blank">${m.lName}</a></span>
            `;
            matchCard.appendChild(lawRow);
            
            const workRow = document.createElement("div");
            workRow.className = "report-work-row";
            
            if (m.lines.length === 1) {
                workRow.textContent = `분장 사무: ${m.lines[0]}`;
            } else {
                const list = document.createElement("div");
                list.className = "report-work-row-list";
                m.lines.forEach(line => {
                    const item = document.createElement("div");
                    item.className = "report-work-row-item";
                    item.textContent = `- ${line}`;
                    list.appendChild(item);
                });
                workRow.appendChild(list);
            }
            
            matchCard.appendChild(workRow);
            regionBlock.appendChild(matchCard);
        });
        
        reportOutput.appendChild(regionBlock);
    });
    
    if (data.missed && data.missed.length > 0) {
        const missingBlock = document.createElement("div");
        missingBlock.className = "report-missing-block";
        missingBlock.innerHTML = `
            <h4 class="report-missing-title"><i class="fa-solid fa-triangle-exclamation"></i> 사무 미검출 지자체/부처 목록 (총 ${data.missed.length}건)</h4>
            <p class="report-missing-desc">- 해당 검색어로 명시적인 소관 사무를 규정하지 않은 단체 목록입니다.</p>
        `;
        
        const grid = document.createElement("div");
        grid.className = "report-missing-grid";
        data.missed.forEach(mr => {
            const item = document.createElement("div");
            item.className = "report-missing-item";
            item.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${mr}`;
            grid.appendChild(item);
        });
        
        missingBlock.appendChild(grid);
        reportOutput.appendChild(missingBlock);
    }
    
    countOrgs.textContent = totalOrgs;
    countLaws.textContent = totalLaws;
    countCases.textContent = totalCases;
}

// Client-side Excel Downloader
btnDownloadExcel.addEventListener("click", () => {
    if (!latestResults) return;
    
    try {
        const wb = XLSX.utils.book_new();
        const wsData = [
            ["시도/부처", "소관 부서", "근거 법령", "분장 사무", "우선순위"]
        ];
        
        Object.entries(latestResults.summary).forEach(([region, matches]) => {
            matches.forEach(m => {
                let priorityText = "";
                if (latestResults.isCentral) {
                    priorityText = m.isOrg ? "1순위 (기구 조직 직제/시행규칙)" : "2순위 (일반 사무 규정)";
                } else {
                    priorityText = m.isOrg ? "1순위 (기구 조직 조례/규칙)" : "2순위 (일반 사무 규정)";
                }
                const combinedLines = m.lines.length === 1 ? m.lines[0] : m.lines.map(l => `- ${l}`).join("\n");
                wsData.push([region, m.dept, m.lName, combinedLines, priorityText]);
            });
        });
        
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        
        const colWidths = wsData[0].map((_, colIdx) => {
            let maxLen = 0;
            wsData.forEach(row => {
                const val = row[colIdx] ? String(row[colIdx]) : "";
                const visualLen = [...val].reduce((acc, char) => acc + (char.charCodeAt(0) > 127 ? 2 : 1), 0);
                if (visualLen > maxLen) maxLen = visualLen;
            });
            return { wch: Math.min(Math.max(maxLen + 4, 12), 60) };
        });
        ws["!cols"] = colWidths;
        
        XLSX.utils.book_append_sheet(wb, ws, "소관부서 및 사무분장");
        
        const fileName = `소관부서_및_사무분장_검증결과_${inputKeyword.value.trim()}.xlsx`;
        XLSX.writeFile(wb, fileName);
    } catch (e) {
        alert("엑셀 파일 다운로드 중 오류 발생: " + e.message);
    }
});

// Result search toolbar functionality
inputResultSearch.addEventListener("input", performResultSearch);
inputResultSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        navigateSearchResult("next");
    }
});
btnPrevMatch.addEventListener("click", () => navigateSearchResult("prev"));
btnNextMatch.addEventListener("click", () => navigateSearchResult("next"));

function resetResultSearch() {
    inputResultSearch.value = "";
    labelSearchStatus.textContent = "0/0";
    btnPrevMatch.disabled = true;
    btnNextMatch.disabled = true;
    currentSearchMatches = [];
    currentSearchIndex = -1;
    
    document.querySelectorAll(".search-highlight-active, .search-highlight").forEach(el => {
        el.outerHTML = el.textContent;
    });
}

function performResultSearch() {
    const query = inputResultSearch.value.trim();
    if (!query) {
        resetResultSearch();
        return;
    }
    
    removeHighlights();
    
    const container = currentActiveSearchBox === "log" ? logOutput : reportOutput;
    
    const textNodes = [];
    const walk = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while (node = walk.nextNode()) {
        if (node.textContent.toLowerCase().includes(query.toLowerCase())) {
            textNodes.push(node);
        }
    }
    
    currentSearchMatches = [];
    
    textNodes.forEach(node => {
        const text = node.textContent;
        const parent = node.parentNode;
        
        if (parent.tagName === "SPAN" && parent.className.includes("search-highlight")) return;
        if (parent.tagName === "SCRIPT" || parent.tagName === "STYLE") return;
        
        const frag = document.createDocumentFragment();
        let lastIdx = 0;
        const regex = new RegExp(escapeRegex(query), "gi");
        let match;
        
        while (match = regex.exec(text)) {
            const before = text.substring(lastIdx, match.index);
            if (before) frag.appendChild(document.createTextNode(before));
            
            const span = document.createElement("span");
            span.className = "search-highlight";
            span.style.backgroundColor = "rgba(254, 240, 138, 0.8)";
            span.style.color = "#000000";
            span.style.borderRadius = "2px";
            span.style.padding = "0 2px";
            span.textContent = match[0];
            
            frag.appendChild(span);
            currentSearchMatches.push(span);
            
            lastIdx = regex.lastIndex;
        }
        
        const after = text.substring(lastIdx);
        if (after) frag.appendChild(document.createTextNode(after));
        
        parent.replaceChild(frag, node);
    });
    
    if (currentSearchMatches.length > 0) {
        currentSearchIndex = 0;
        highlightActiveMatch();
        btnPrevMatch.disabled = false;
        btnNextMatch.disabled = false;
    } else {
        currentSearchIndex = -1;
        labelSearchStatus.textContent = "0/0";
        btnPrevMatch.disabled = true;
        btnNextMatch.disabled = true;
    }
}

function removeHighlights() {
    const container = currentActiveSearchBox === "log" ? logOutput : reportOutput;
    const highlights = container.querySelectorAll(".search-highlight");
    highlights.forEach(span => {
        const textNode = document.createTextNode(span.textContent);
        span.parentNode.replaceChild(textNode, span);
    });
    container.normalize();
}

function highlightActiveMatch() {
    currentSearchMatches.forEach((el, idx) => {
        if (idx === currentSearchIndex) {
            el.classList.add("search-highlight-active");
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            el.classList.remove("search-highlight-active");
        }
    });
    labelSearchStatus.textContent = `${currentSearchIndex + 1}/${currentSearchMatches.length}`;
}

function navigateSearchResult(direction) {
    if (currentSearchMatches.length === 0) return;
    
    if (direction === "next") {
        currentSearchIndex = (currentSearchIndex + 1) % currentSearchMatches.length;
    } else {
        currentSearchIndex = (currentSearchIndex - 1 + currentSearchMatches.length) % currentSearchMatches.length;
    }
    highlightActiveMatch();
}

function escapeRegex(string) {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
