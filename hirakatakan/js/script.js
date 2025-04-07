// Data sets
const hiraganaGroups = {
    basic: {
        'Vowels': { 'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o' },
        'K-': { 'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko' },
        'S-': { 'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so' },
        'T-': { 'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to' },
        'N-': { 'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no', 'ん': 'n' },
        'H-': { 'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho' },
        'M-': { 'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo' },
        'Y-': { 'や': 'ya', 'ゆ': 'yu', 'よ': 'yo' },
        'R-': { 'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro' },
        'W-': { 'わ': 'wa', 'を': 'o' }
    },
    dakuten: {
        'G-': { 'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go' },
        'Z-': { 'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo' },
        'D-': { 'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do' },
        'B-': { 'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo' },
        'P-': { 'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po' }
    }
};

const katakanaGroups = {
    basic: {
        'Vowels': { 'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o' },
        'K-': { 'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko' },
        'S-': { 'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so' },
        'T-': { 'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to' },
        'N-': { 'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no', 'ン': 'n' },
        'H-': { 'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho' },
        'M-': { 'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo' },
        'Y-': { 'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo' },
        'R-': { 'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro' },
        'W-': { 'ワ': 'wa', 'ヲ': 'o' }
    },
    dakuten: {
        'G-': { 'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go' },
        'Z-': { 'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo' },
        'D-': { 'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do' },
        'B-': { 'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo' },
        'P-': { 'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po' }
    },
    extended: {
        'V-': { 'ヴ': 'vu' },
        'W-': { 'ウィ': 'wi', 'ウェ': 'we', 'ウォ': 'wo' },
        'SH-': { 'シェ': 'she' },
        'J-': { 'ジェ': 'je' },
        'CH-': { 'チェ': 'che', 'ティ': 'ti', 'ディ': 'di' },
        'T-': { 'トゥ': 'tu', 'ドゥ': 'du' },
        'F-': { 'ファ': 'fa', 'フィ': 'fi', 'フェ': 'fe', 'フォ': 'fo' }
    }
};

const kanjiGroups = {
    n4: {
        'Time & Calendar': {
            '日': 'nichi (day)',
            '月': 'getsu (month)',
            '年': 'nen (year)',
            '時': 'ji (time)',
            '分': 'fun (minute)',
            '秒': 'byou (second)',
            '週': 'shuu (week)',
            '曜': 'you (day of week)',
            '朝': 'asa (morning)',
            '昼': 'hiru (noon)',
            '夜': 'yoru (night)',
            '季': 'ki (season)'
        },
        'Numbers 1-10': {
            '一': 'ichi (1)',
            '二': 'ni (2)',
            '三': 'san (3)',
            '四': 'yon (4)',
            '五': 'go (5)',
            '六': 'roku (6)',
            '七': 'nana (7)',
            '八': 'hachi (8)',
            '九': 'kyuu (9)',
            '十': 'juu (10)'
        },
        'Numbers & Amounts': {
            '百': 'hyaku (100)',
            '千': 'sen (1,000)',
            '万': 'man (10,000)',
            '円': 'en (Yen)',
            '零': 'rei (zero)',
            '半': 'han (half)'
        },
        'People & Family': {
            '人': 'hito (person)',
            '男': 'otoko (man)',
            '女': 'onna (woman)',
            '父': 'chichi (father)',
            '母': 'haha (mother)',
            '子': 'ko (child)',
            '兄': 'ani (older brother)',
            '弟': 'otouto (younger brother)',
            '姉': 'ane (older sister)',
            '妹': 'imouto (younger sister)',
            '夫': 'otto (husband)',
            '妻': 'tsuma (wife)'
        },
        'Places': {
            '山': 'yama (mountain)',
            '川': 'kawa (river)',
            '田': 'ta (rice field)',
            '町': 'machi (town)',
            '店': 'mise (shop)',
            '駅': 'eki (station)',
            '国': 'kuni (country)',
            '家': 'ie (house)',
            '村': 'mura (village)',
            '市': 'shi (city)'
        },
        'Common Verbs': {
            '行': 'iku (go)',
            '来': 'kuru (come)',
            '食': 'taberu (eat)',
            '飲': 'nomu (drink)',
            '見': 'miru (see)',
            '聞': 'kiku (hear)',
            '話': 'hanasu (speak)',
            '読': 'yomu (read)',
            '書': 'kaku (write)',
            '立': 'tatsu (stand)',
            '帰': 'kaeru (return)',
            '買': 'kau (buy)'
        },
        'Adjectives': {
            '大': 'dai (big)',
            '小': 'shou (small)',
            '新': 'shin (new)',
            '古': 'ko (old)',
            '高': 'kou (high/expensive)',
            '安': 'an (cheap)',
            '早': 'sou (fast/early)',
            '多': 'ta (many)',
            '長': 'nagai (long)',
            '短': 'mijikai (short)'
        },
        'Nature & Weather': {
            '木': 'moku (tree)',
            '林': 'rin (grove)',
            '森': 'mori (forest)',
            '火': 'ka (fire)',
            '水': 'sui (water)',
            '雨': 'ame (rain)',
            '風': 'kaze (wind)',
            '雪': 'yuki (snow)',
            '天': 'ten (sky)',
            '気': 'ki (energy)',
            '土': 'tsuchi (earth)',
            '霧': 'kiri (fog)',
            '雷': 'kaminari (thunder)'
        },
        'Colors': {
            '赤': 'aka (red)',
            '青': 'ao (blue)',
            '白': 'shiro (white)',
            '黒': 'kuro (black)',
            '色': 'iro (color)',
            '灰': 'hai (gray)'
        },
        'Transportation': {
            '車': 'kuruma (car)',
            '電': 'den (electricity)',
            '道': 'michi (road)',
            '空': 'sora (sky)',
            '港': 'minato (harbor)',
            '北': 'kita (north)',
            '南': 'minami (south)',
            '東': 'higashi (east)',
            '西': 'nishi (west)',
            '線': 'sen (line)'
        },
        'Daily Activities': {
            '寝': 'nemui (sleep)',
            '起': 'okiru (wake up)',
            '働': 'hataraku (work)',
            '休': 'yasumu (rest)',
            '洗': 'arau (wash)',
            '浴': 'abiru (bathe)',
            '遊': 'asobu (play)',
            '走': 'hashiru (run)'
        },
        'Food & Drink': {
            '米': 'kome (rice)',
            '肉': 'niku (meat)',
            '魚': 'sakana (fish)',
            '飲': 'nomu (drink)',
            '茶': 'cha (tea)',
            '飯': 'meshi (meal)',
            '酒': 'sake (alcohol)'
        },
        'Work & Education': {
            '仕': 'shi (work)',
            '学': 'gaku (study)',
            '校': 'kou (school)',
            '教': 'kyou (teach)',
            '医': 'i (doctor)',
            '院': 'in (institution)',
            '業': 'gyou (business)',
            '試': 'tamesu (test)',
            '社': 'sha (company)',
            '術': 'jutsu (technique)'
        },
        'Emotions': {
            '楽': 'tanoshii (happy)',
            '悲': 'kanashii (sad)',
            '喜': 'yorokobu (joy)',
            '怒': 'okoru (anger)',
            '哀': 'ai (sorrow)',
            '驚': 'odoroku (surprise)'
        },
        'Other Important Verbs': {
            '会': 'au (meet)',
            '思': 'omou (think)',
            '使': 'tsukau (use)',
            '待': 'matsu (wait)',
            '送': 'okuru (send)',
            '出': 'deru (exit)',
            '入': 'hairu (enter)',
            '開': 'aku (open)',
            '選': 'eru (choose)'
        }
    }
};

// Game State
let currentScriptType = '';
let selectedGroups = [];
let questions = [];
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let totalQuestions = 10;

// Navigation Functions
function showHome() {
    //Reset game state
    selectedGroups = [];
    questions = [];
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    
    // Sembunyikan semua container
    document.getElementById('homeContainer').classList.remove('hidden');
    document.getElementById('scriptSelectionContainer').classList.add('hidden');
    document.getElementById('categoryContainer').classList.add('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
    document.getElementById('learningContainer').classList.add('hidden'); // Tambahkan ini

    // Tampilkan menu utama
    document.getElementById('homeContainer').classList.remove('hidden');
}

function showScriptSelection() {
    //Reset game state
    selectedGroups = [];
    questions = [];
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    
    document.getElementById('homeContainer').classList.add('hidden');
    document.getElementById('scriptSelectionContainer').classList.remove('hidden');
    document.getElementById('categoryContainer').classList.add('hidden');
    document.getElementById('resultContainer').classList.add('hidden');
}

function showCategorySelection(scriptType) {
    //Reset game state
    selectedGroups = [];
    questions = [];
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    
    currentScriptType = scriptType;
    document.getElementById('scriptSelectionContainer').classList.add('hidden');
    document.getElementById('categoryContainer').classList.remove('hidden');

    // Update UI based on script type
    const titleMap = {
        hiragana: 'Hiragana',
        katakana: 'Katakana',
        kanji: 'Kanji'
    };
    document.getElementById('categoryTitle').textContent = `Select ${titleMap[scriptType]} Categories`;
    populateCategories(scriptType);
}

// Category Population
function populateCategories(scriptType) {
    const container = document.getElementById('categoryList');
    container.innerHTML = '';

    const groups = scriptType === 'hiragana' ? hiraganaGroups :
        scriptType === 'katakana' ? katakanaGroups : kanjiGroups;

    for (const [categoryName, groupsObj] of Object.entries(groups)) {
        const categoryHTML = `
            <div class="category-card">
                <button class="category-header" onclick="toggleCategory(this)">
                    ${categoryName.toUpperCase()}
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="groups-container"></div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', categoryHTML);

        const groupsContainer = container.lastElementChild.querySelector('.groups-container');
        for (const [groupName, characters] of Object.entries(groupsObj)) {
            const groupHTML = `
                <button class="group-btn" 
                    onclick="toggleGroupSelection('${scriptType}', '${categoryName}', '${groupName}', this)">
                    ${groupName}
                </button>
            `;
            groupsContainer.insertAdjacentHTML('beforeend', groupHTML);
        }
    }
}

// Group Selection
function toggleCategory(header) {
    const categoryCard = header.closest('.category-card');
    const groupsContainer = categoryCard.querySelector('.groups-container');
    header.classList.toggle('expanded');
    groupsContainer.classList.toggle('show');
}

function toggleGroupSelection(scriptType, category, groupName, button) {
    // Properly handle category names with spaces
    const groupKey = `${scriptType}|${category}|${groupName}`;

    if (selectedGroups.includes(groupKey)) {
        selectedGroups = selectedGroups.filter(g => g !== groupKey);
    } else {
        selectedGroups.push(groupKey);
    }
    button.classList.toggle('selected');
}

// Game Initialization
function startGame() {
    if (selectedGroups.length === 0) {
        showNotification('error');
        return;
    }

    questions = generateQuestions();
    currentQuestionIndex = 0;
    correctCount = 0;
    wrongCount = 0;

    document.getElementById('categoryContainer').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
    showNextQuestion();
}

function generateQuestions() {
    const allCharacters = [];
    selectedGroups.forEach(groupKey => {
        const [script, category, group] = groupKey.split('|');
        const characters = script === 'hiragana' ? hiraganaGroups[category][group] :
            script === 'katakana' ? katakanaGroups[category][group] :
                kanjiGroups[category][group];
        allCharacters.push(...Object.entries(characters));
    });

    return shuffleArray(allCharacters).slice(0, totalQuestions);
}

// Game Logic
function showNextQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    updateProgress();
    const [character, correctAnswer] = questions[currentQuestionIndex];
    document.getElementById('character').textContent = character;

    const options = generateOptions(correctAnswer);
    renderOptions(options);
}

function generateOptions(correctAnswer) {
    const options = [correctAnswer];
    while (options.length < 4) {
        const randomChar = getRandomDistractor();
        if (!options.includes(randomChar)) {
            options.push(randomChar);
        }
    }
    return shuffleArray(options);
}

function getRandomDistractor() {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    return randomQuestion[1];
}

function renderOptions(options) {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    options.forEach(option => {
        const isReading = currentScriptType !== 'kanji';
        const optionHTML = `
            <button class="option-btn" onclick="checkAnswer('${option}')">
                <span class="option-reading">${option}</span>
                ${!isReading ? `<span class="option-meaning">${getKanjiMeaning(option)}</span>` : ''}
            </button>
        `;
        optionsContainer.insertAdjacentHTML('beforeend', optionHTML);
    });
}

function getKanjiMeaning(reading) {
    const kanjiEntry = Object.entries(kanjiGroups.n4)
        .flatMap(([_, groups]) => Object.entries(groups))
        .find(([_, meaning]) => meaning.includes(reading));
    return kanjiEntry ? kanjiEntry[1].split('(')[1].replace(')', '') : '';
}

function checkAnswer(selectedAnswer) {
    const [character, correctAnswer] = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');
    let correctElement;

    options.forEach(option => {
        option.disabled = true;
        const optionText = option.querySelector('.option-reading').textContent;

        if (optionText === correctAnswer) {
            option.classList.add('correct');
            correctElement = option;
        }

        if (optionText === selectedAnswer && selectedAnswer !== correctAnswer) {
            option.classList.add('wrong');
        }
    });

    // Show correct answer message
    const meaning = currentScriptType === 'kanji' ? getKanjiMeaning(correctAnswer) : '';
    document.getElementById('correctAnswerMessage').textContent =
        `Correct answer : ${correctAnswer} ${meaning}`;

    setTimeout(() => {
        if (selectedAnswer === correctAnswer) {
            correctCount++;
        } else {
            wrongCount++;
        }

        updateScore();
        currentQuestionIndex++;
        showNextQuestion();
        document.getElementById('correctAnswerMessage').textContent = '';
    }, 2000);
}

// Results Screen
function showResults() {
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('resultContainer').classList.remove('hidden');

    document.getElementById('finalCorrect').textContent = correctCount;
    document.getElementById('finalWrong').textContent = wrongCount;
    document.getElementById('accuracy').textContent =
        `${Math.round((correctCount / (correctCount + wrongCount)) * 100)}%`;
}

// Utilities
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function updateProgress() {
    const progress = (currentQuestionIndex / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function updateScore() {
    document.getElementById('correctCount').textContent = correctCount;
    document.getElementById('wrongCount').textContent = wrongCount;
}

function showNotification(type) {
    const notification = document.getElementById(`${type}Notification`);
    notification.classList.add('show');
    setTimeout(() => notification.classList.remove('show'), 3000);
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    showHome();
});

// Learning Section
function showLearningDictionary() {
    document.getElementById('homeContainer').classList.add('hidden');
    document.getElementById('scriptSelectionContainer').classList.add('hidden');
    document.getElementById('categoryContainer').classList.add('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('resultContainer').classList.add('hidden');

    // Show learning container
    document.getElementById('learningContainer').classList.remove('hidden');

    // Load default content (Hiragana)
    showLearningTab('hiragana');
}

// Show learning tab content
function showLearningTab(scriptType) {
    // Update active tab
    const scriptTabs = document.querySelectorAll('.script-tab');
        if(scriptTabs) {
            scriptTabs.forEach(tab => {
                tab.classList.remove('active');
            });
        }

    // Clear previous content
    const content = document.getElementById('learningContent');
    content.innerHTML = '';

    // Get data for selected script
    const data = {
        hiragana: hiraganaGroups,
        katakana: katakanaGroups,
        kanji: kanjiGroups
    }[scriptType];

    // Build content for each group
    for (const [category, groups] of Object.entries(data)) {
        const categoryHTML = `
        <div class="learning-script-container">
            <h3 class="learning-group-title">${category.toUpperCase()}</h3>
            ${Object.entries(groups).map(([groupName, characters]) => `
                <div class="learning-group">
                    <h4 class="group-subtitle">${groupName}</h4>
                    <div class="learning-characters">
                        ${Object.entries(characters).map(([character, reading]) => `
                            <div class="learning-char-item">
                                <div class="learning-char">${character}</div>
                                <div class="learning-reading">${reading.split(' (')[0]}</div>
                                ${scriptType === 'kanji' ?
                `<div class="learning-meaning">${reading.split('(')[1]?.replace(')', '') || ''}</div>` :
                ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
        content.insertAdjacentHTML('beforeend', categoryHTML);
    }
}

// Initialize with Hiragana by default
document.addEventListener('DOMContentLoaded', () => {
    showLearningTab('hiragana');
});
