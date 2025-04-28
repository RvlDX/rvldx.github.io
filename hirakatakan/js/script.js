document.addEventListener('DOMContentLoaded', () => {
    // --- State Aplikasi ---
    let currentScript = null; // Untuk quiz
    let selectedSubCategories = []; // Untuk quiz
    let quizQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let incorrectAnswers = 0;
    let questionStartTime;
    let currentTheme = localStorage.getItem('theme') || 'light';
    let currentLearningScript = 'hiragana'; // State untuk halaman kamus
    let synth = window.speechSynthesis; // Akses Speech Synthesis API
    let japaneseVoice = null; // Variabel untuk menyimpan suara Jepang jika ditemukan

    // --- Elemen DOM ---
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeIcon = themeToggleButton.querySelector('i');
    const notificationArea = document.getElementById('notification-area');

    // --- Data Quiz ---
    const quizDataSource = {
        hiragana: {
            title: 'Hiragana',
            categories: {
                basic: {
                    name: 'Basic (Gojūon)', subCategories: {
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
                    }
                },

                dakuten: {
                    name: 'Dakuten/Handakuten', subCategories: {
                        'G-': { 'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go' },
                        'Z-': { 'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo' },
                        'D-': { 'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do' },
                        'B-': { 'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo' },
                        'P-': { 'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po' }
                    }
                },
                yoon: {
                    name: 'Yōon (Kombinasi)', subCategories: {
                        'K-': { 'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo' },
                        'S-': { 'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho' },
                        'T-': { 'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho' },
                        'N-': { 'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo' },
                        'H-': { 'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo' },
                        'M-': { 'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo' },
                        'R-': { 'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo' },
                        'G-': { 'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo' },
                        'J-': { 'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo' },
                        'B-': { 'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo' },
                        'P-': { 'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo' }
                    }
                },
                particles: {
                    name: 'Particles', subCategories: {
                        'Partikel Dasar': { 'は': 'wa (penanda topik)', 'が': 'ga (penanda subjek)', 'を': 'o (penanda objek langsung)', 'に': 'ni (tujuan, waktu, penerima)', 'で': 'de (tempat, sarana)', 'へ': 'e (arah)', 'と': 'to (dengan, dan)', 'も': 'mo (juga)', 'の': 'no (kepemilikan)', 'から': 'kara (dari)', 'まで': 'made (sampai)', 'や': 'ya (dan, dll)', 'か': 'ka (atau / tanya)', 'ね': 'ne (konfirmasi)', 'よ': 'yo (penegasan)', 'な': 'na (larangan / informal)', }, 'Partikel Kuantitas & Batasan': { 'だけ': 'dake (hanya)', 'しか': 'shika (hanya - negatif)', 'ばかり': 'bakari (hanya, sekitar)', 'ほど': 'hodo (sejauh, sebanding)', 'くらい': 'kurai (sekitar)', 'ぐらい': 'gurai (sekitar)', 'など': 'nado (dan lain-lain)', 'やら': 'yara (seperti, dll)', },
                        'Partikel Perbandingan & Pemilihan': { 'より': 'yori (dibanding)', 'のほうが': 'no hou ga (lebih)', 'のに': 'noni (padahal)', 'でも': 'demo (meskipun, pun)', 'とか': 'toka (seperti, dll)', },
                        'Partikel Kondisional': { 'たら': 'tara (kalau sudah)', 'ば': 'ba (jika)', 'なら': 'nara (jika)', 'ても': 'temo (meskipun)', 'のに': 'noni (walaupun)', 'ながら': 'nagara (sambil)', },
                        'Partikel Penjelas Sebab/Akibat': { 'から': 'kara (karena)', 'ので': 'node (karena)', 'のに': 'noni (padahal)', 'くせに': 'kuseni (padahal - negatif)', },
                        'Partikel Arah & Tujuan': { 'に': 'ni (tujuan, arah)', 'へ': 'e (arah)', 'まで': 'made (hingga)', 'から': 'kara (dari)' },
                        'Partikel Kompleks & Gabungan': { 'として': 'toshite (sebagai)', 'にとって': 'ni totte (bagi)', 'について': 'ni tsuite (tentang)', 'に対して': 'ni taishite (terhadap)', 'によって': 'ni yotte (oleh, tergantung)', 'によると': 'ni yoru to (menurut)', 'に関して': 'ni kanshite (terkait)', 'を通じて': 'wo tsuujite (melalui)', 'を通して': 'wo tooshite (melalui)', 'において': 'ni oite (di, pada)', 'をめぐって': 'wo megutte (seputar)', 'に比べて': 'ni kurabete (dibanding)', }
                    }
                }
            }
        },
        katakana: {
            title: 'Katakana',
            categories: {
                basic: {
                    name: 'Basic (Gojūon)', subCategories: {
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
                    }
                },
                dakuten: {
                    name: 'Dakuten/Handakuten', subCategories: {
                        'G-': { 'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go' },
                        'Z-': { 'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo' },
                        'D-': { 'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do' },
                        'B-': { 'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo' },
                        'P-': { 'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po' }
                    }
                },
                yoon: {
                    name: 'Yōon (Kombinasi)', subCategories: {
                        'K-': { 'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo' },
                        'S-': { 'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho' },
                        'T-': { 'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho' },
                        'N-': { 'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo' },
                        'H-': { 'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo' },
                        'M-': { 'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo' },
                        'R-': { 'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo' },
                        'G-': { 'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo' },
                        'J-': { 'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo' },
                        'B-': { 'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo' },
                        'P-': { 'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo' }
                    }
                },
                extended: { name: 'Extended Katakana', subCategories: { 'All': { 'ヴ': 'vu', 'ウィ': 'wi', 'ウェ': 'we', 'ウォ': 'wo', 'シェ': 'she', 'ジェ': 'je', 'チェ': 'che', 'ティ': 'ti', 'ディ': 'di', 'トゥ': 'tu', 'ドゥ': 'du', 'ファ': 'fa', 'フィ': 'fi', 'フェ': 'fe', 'フォ': 'fo' } } }
            }
        },
        kanji: {
            title: 'Kanji',
            categories: {
                n5: {
                    name: 'JLPT N5 Level', subCategories: {
                        'Numbers': { '一': 'ichi (1)', '二': 'ni (2)', '三': 'san (3)', '四': 'shi/yon (4)', '五': 'go (5)', '六': 'roku (6)', '七': 'shichi/nana (7)', '八': 'hachi (8)', '九': 'kyuu (9)', '十': 'juu (10)', '百': 'hyaku (100)', '千': 'sen (1,000)', '万': 'man (10,000)', '円': 'en (Yen)' },
                        'Time & Calendar': { '日': 'nichi (day/sun)', '月': 'getsu (month/moon)', '年': 'nen (year)', '時': 'ji (time/hour)', '分': 'fun (minute)', '間': 'kan (interval)', '今': 'ima (now)', '午': 'go (noon)', '前': 'mae (before)', '後': 'ato (after)', '曜': 'you (day of week)' },
                        'People & Family': { '人': 'hito (person)', '男': 'otoko (man)', '女': 'onna (woman)', '子': 'ko (child)', '父': 'chichi (father)', '母': 'haha (mother)', '友': 'tomo (friend)', '名': 'na (name)', '先': 'saki (previous)', '生': 'sei (life)', '兄': 'ani (older brother)', '弟': 'otouto (younger brother)', '姉': 'ane (older sister)', '妹': 'imouto (younger sister)' },
                        'Places & Directions': { '山': 'yama (mountain)', '川': 'kawa (river)', '田': 'ta (rice field)', '町': 'machi (town)', '村': 'mura (village)', '校': 'kou (school)', '国': 'kuni (country)', '家': 'ie (house)', '上': 'ue (up)', '下': 'shita (down)', '左': 'hidari (left)', '右': 'migi (right)', '東': 'higashi (east)', '西': 'nishi (west)', '南': 'minami (south)', '北': 'kita (north)', '外': 'soto (outside)', '中': 'naka (inside)', '駅': 'eki (station)', '道': 'michi (road)' },
                        'Common Verbs': { '行': 'iku (go)', '来': 'kuru (come)', '見': 'miru (see)', '聞': 'kiku (hear)', '話': 'hanasu (speak)', '食': 'taberu (eat)', '飲': 'nomu (drink)', '書': 'kaku (write)', '読': 'yomu (read)', '出': 'deru (exit)', '入': 'hairu (enter)', '立': 'tatsu (stand)', '休': 'yasumu (rest)', '買': 'kau (buy)', '売': 'uru (sell)', '使': 'tsukau (use)', '作': 'tsukuru (make)', '開': 'aku (open)', '閉': 'shimaru (close)', '始': 'hajimeru (start)', '終': 'owaru (end)', '待': 'matsu (wait)', '帰': 'kaeru (return)' },
                        'Adjectives': { '大': 'dai (big)', '小': 'shou (small)', '高': 'takai (tall/expensive)', '安': 'yasui (cheap)', '新': 'atarashii (new)', '古': 'furui (old)', '長': 'nagai (long)', '短': 'mijikai (short)', '多': 'ooi (many)', '少': 'sukunai (few)', '楽': 'tanoshii (fun)', '好': 'suki (like)', '思': 'omou (think)', '知': 'shiru (know)' },
                        'Nature & Weather': { '天': 'ten (heaven)', '気': 'ki (spirit)', '雨': 'ame (rain)', '雪': 'yuki (snow)', '風': 'kaze (wind)', '空': 'sora (sky)', '火': 'hi (fire)', '水': 'mizu (water)', '木': 'ki (tree)', '土': 'tsuchi (earth)' },
                        'Colors': { '白': 'shiro (white)', '黒': 'kuro (black)', '赤': 'aka (red)', '青': 'ao (blue)', '色': 'iro (color)' },
                        'Transportation & Directions': { '車': 'kuruma (car)', '電': 'den (electricity)', '駅': 'eki (station)', '道': 'michi (road)', '線': 'sen (line)', '上': 'ue (up)', '下': 'shita (down)', '左': 'hidari (left)', '右': 'migi (right)', '前': 'mae (front)', '後': 'ushiro (back)' },
                        'Daily Activities': { '起': 'okiru (wake up)', '寝': 'neru (sleep)', '働': 'hataraku (work)', '休': 'yasumu (rest)', '洗': 'arau (wash)', '浴': 'abiru (bathe)', '遊': 'asobu (play)', '走': 'hashiru (run)' },
                        'Food & Drink': { '米': 'kome (rice)', '肉': 'niku (meat)', '魚': 'sakana (fish)', '飲': 'nomu (drink)', '茶': 'cha (tea)', '飯': 'meshi (meal)', '酒': 'sake (alcohol)' },
                        'Work & Education': { '仕': 'shi (work)', '事': 'koto (thing)', '働': 'hataraku (to work)', '学': 'gaku (study)', '校': 'kou (school)', '教': 'kyou (teach)', '文': 'bun (sentence)', '書': 'kaku (write)', '読': 'yomu (read)', '聞': 'kiku (listen)', '試': 'tamesu (test)', '験': 'ken (examination)', '社': 'sha (company)', '会': 'kai (meeting)', '員': 'in (member)', '医': 'i (doctor)', '院': 'in (institution)', '生': 'sei (life/student)', '先': 'sen (previous)', '語': 'go (language)', '英': 'ei (English)', '数': 'suu (number)', '理': 'ri (reason)', '科': 'ka (subject)', '計': 'kei (plan)', '算': 'san (calculate)', '答': 'tou (answer)', '問': 'mon (question)', '習': 'shuu (learn)', '業': 'gyou (business)', '研': 'ken (research)', '究': 'kyuu (study)' }
                    }
                },
                n4: {
                    name: 'JLPT N4 Level', subCategories: {
                        'Time & Calendar': { '日': 'nichi (day)', '月': 'getsu (month)', '年': 'nen (year)', '時': 'ji (time)', '分': 'fun (minute)', '秒': 'byou (second)', '週': 'shuu (week)', '曜': 'you (day of week)', '朝': 'asa (morning)', '昼': 'hiru (noon)', '夜': 'yoru (night)', '季': 'ki (season)' },
                        'Numbers 1-10': { '一': 'ichi (1)', '二': 'ni (2)', '三': 'san (3)', '四': 'yon (4)', '五': 'go (5)', '六': 'roku (6)', '七': 'nana (7)', '八': 'hachi (8)', '九': 'kyuu (9)', '十': 'juu (10)' },
                        'Numbers & Amounts': { '百': 'hyaku (100)', '千': 'sen (1,000)', '万': 'man (10,000)', '円': 'en (Yen)', '零': 'rei (zero)', '半': 'han (half)' },
                        'People & Family': { '人': 'hito (person)', '男': 'otoko (man)', '女': 'onna (woman)', '父': 'chichi (father)', '母': 'haha (mother)', '子': 'ko (child)', '兄': 'ani (older brother)', '弟': 'otouto (younger brother)', '姉': 'ane (older sister)', '妹': 'imouto (younger sister)', '夫': 'otto (husband)', '妻': 'tsuma (wife)' },
                        'Places': { '山': 'yama (mountain)', '川': 'kawa (river)', '田': 'ta (rice field)', '町': 'machi (town)', '店': 'mise (shop)', '駅': 'eki (station)', '国': 'kuni (country)', '家': 'ie (house)', '村': 'mura (village)', '市': 'shi (city)' },
                        'Common Verbs': { '行': 'iku (go)', '来': 'kuru (come)', '食': 'taberu (eat)', '飲': 'nomu (drink)', '見': 'miru (see)', '聞': 'kiku (hear)', '話': 'hanasu (speak)', '読': 'yomu (read)', '書': 'kaku (write)', '立': 'tatsu (stand)', '帰': 'kaeru (return)', '買': 'kau (buy)' },
                        'Adjectives': { '大': 'dai (big)', '小': 'shou (small)', '新': 'shin (new)', '古': 'ko (old)', '高': 'kou (high/expensive)', '安': 'an (cheap)', '早': 'sou (fast/early)', '多': 'ta (many)', '長': 'nagai (long)', '短': 'mijikai (short)' },
                        'Nature & Weather': { '木': 'moku (tree)', '林': 'rin (grove)', '森': 'mori (forest)', '火': 'ka (fire)', '水': 'sui (water)', '雨': 'ame (rain)', '風': 'kaze (wind)', '雪': 'yuki (snow)', '天': 'ten (sky)', '気': 'ki (energy)', '土': 'tsuchi (earth)', '霧': 'kiri (fog)', '雷': 'kaminari (thunder)' },
                        'Colors': { '赤': 'aka (red)', '青': 'ao (blue)', '白': 'shiro (white)', '黒': 'kuro (black)', '色': 'iro (color)', '灰': 'hai (gray)' },
                        'Transportation': { '車': 'kuruma (car)', '電': 'den (electricity)', '道': 'michi (road)', '空': 'sora (sky)', '港': 'minato (harbor)', '北': 'kita (north)', '南': 'minami (south)', '東': 'higashi (east)', '西': 'nishi (west)', '線': 'sen (line)' },
                        'Daily Activities': { '寝': 'neru (sleep)', '起': 'okiru (wake up)', '働': 'hataraku (work)', '休': 'yasumu (rest)', '洗': 'arau (wash)', '浴': 'abiru (bathe)', '遊': 'asobu (play)', '走': 'hashiru (run)' },
                        'Food & Drink': { '米': 'kome (rice)', '肉': 'niku (meat)', '魚': 'sakana (fish)', '飲': 'nomu (drink)', '茶': 'cha (tea)', '飯': 'meshi (meal)', '酒': 'sake (alcohol)' },
                        'Work & Education': { '仕': 'shi (work)', '学': 'gaku (study)', '校': 'kou (school)', '教': 'kyou (teach)', '医': 'i (doctor)', '院': 'in (institution)', '業': 'gyou (business)', '試': 'tamesu (test)', '社': 'sha (company)', '術': 'jutsu (technique)' },
                        'Emotions': { '楽': 'tanoshii (happy)', '悲': 'kanashii (sad)', '喜': 'yorokobu (joy)', '怒': 'okoru (anger)', '哀': 'ai (sorrow)', '驚': 'odoroku (surprise)' },
                        'Other Important Verbs': { '会': 'au (meet)', '思': 'omou (think)', '使': 'tsukau (use)', '待': 'matsu (wait)', '送': 'okuru (send)', '出': 'deru (exit)', '入': 'hairu (enter)', '開': 'aku (open)', '選': 'eru (choose)' }
                    }
                }
                // Tambah N5, N3 etc. di sini
            }
        }
    };

    // --- Fungsi Notifikasi ---
    let notificationTimeout;
    function showNotification(message, duration = 3000) {
        clearTimeout(notificationTimeout);
        notificationArea.textContent = message;

        // Tambahkan class multiline jika pesan panjang
        if (message.length > 50) {
            notificationArea.classList.add('multiline');
        } else {
            notificationArea.classList.remove('multiline');
        }

        notificationArea.classList.add('show');
        notificationTimeout = setTimeout(() => {
            notificationArea.classList.remove('show');
        }, duration);
    }

    // --- Fungsi Tema ---
    function applyTheme(theme) {
        document.body.classList.remove('light-theme', 'dark-theme');
        document.body.classList.add(`${theme}-theme`);
        themeIcon.className = `fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`;
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }

    function toggleTheme() {
        applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    }

    applyTheme(currentTheme);

    // --- Fungsi Navigasi ---
    function navigateTo(url) {
        window.location.href = url;
    }

    // --- Fungsi Memuat Kategori (Accordion/Dropdown Style) ---
    function loadCategories(script) {
        const scriptData = quizDataSource[script];
        if (!scriptData || !scriptData.categories) {
            showNotification("Data kategori tidak ditemukan.");
            return;
        }

        currentScript = script;
        const selectedScriptTitle = document.getElementById('selected-script-title');
        const mainCategoryContainer = document.getElementById('main-category-container');
        const startGameButton = document.getElementById('start-game-button');

        if (selectedScriptTitle) {
            selectedScriptTitle.textContent = `(${scriptData.title})`;
        }

        if (mainCategoryContainer) {
            mainCategoryContainer.innerHTML = ''; // Kosongkan accordion
            selectedSubCategories = []; // Reset pilihan subkategori

            // Buat setiap item accordion untuk kategori utama
            for (const mainCategoryKey in scriptData.categories) {
                const mainCategory = scriptData.categories[mainCategoryKey];
                if (mainCategory && mainCategory.name && mainCategory.subCategories) {

                    const mainCategoryItem = document.createElement('div');
                    mainCategoryItem.classList.add('main-category-item');
                    mainCategoryItem.dataset.mainKey = mainCategoryKey; // Simpan key

                    // Header Accordion (bisa diklik)
                    const header = document.createElement('div');
                    header.classList.add('main-category-header');
                    header.innerHTML = `
                        <span>${mainCategory.name}</span>
                        <i class="fas fa-chevron-down toggle-icon"></i>
                    `;
                    header.addEventListener('click', () => {
                        mainCategoryItem.classList.toggle('active');
                    });

                    // Kontainer untuk subkategori (tersembunyi)
                    const subListContainer = document.createElement('div');
                    subListContainer.classList.add('subcategory-list');

                    const subOptionsGrid = document.createElement('div');
                    subOptionsGrid.classList.add('subcategory-options');

                    // Buat checkbox untuk setiap subkategori
                    for (const subCategoryKey in mainCategory.subCategories) {
                        const subCategoryItem = document.createElement('div');
                        subCategoryItem.classList.add('subcategory-item');
                        const checkboxId = `subcat-${mainCategoryKey}-${subCategoryKey.replace(/\s+/g, '-')}`; // ID unik
                        // Value format: "mainKey:subKey"
                        const checkboxValue = `${mainCategoryKey}:${subCategoryKey}`;

                        subCategoryItem.innerHTML = `
                            <label for="${checkboxId}">
                                <input type="checkbox" id="${checkboxId}" name="subcategory" value="${checkboxValue}">
                                <span>${subCategoryKey}</span>
                            </label>
                        `;
                        subOptionsGrid.appendChild(subCategoryItem);
                    }

                    subListContainer.appendChild(subOptionsGrid);
                    mainCategoryItem.appendChild(header);
                    mainCategoryItem.appendChild(subListContainer);
                    mainCategoryContainer.appendChild(mainCategoryItem);
                }
            }

            if (startGameButton) {
                startGameButton.disabled = true; // Nonaktifkan tombol start awal
            }
        }

        // Simpan script yang dipilih ke localStorage
        localStorage.setItem('selectedScript', script);

        // Navigasi ke halaman kategori
        navigateTo('/hirakatakan/selectcategory.html');
    }

    // --- Fungsi Helper untuk Mengambil Opsi Salah ---
    function getDistractors(correctAnswer, answerPool, count = 3) {
        const distractors = new Set();
        const uniqueAnswers = Array.from(new Set(answerPool.filter(ans => ans !== correctAnswer)));
        if (uniqueAnswers.length < count) {
            while (uniqueAnswers.length < count) uniqueAnswers.push(`Opsi ${uniqueAnswers.length + 1}`);
        }
        while (distractors.size < count && uniqueAnswers.length > 0) {
            const randomIndex = Math.floor(Math.random() * uniqueAnswers.length);
            distractors.add(uniqueAnswers.splice(randomIndex, 1)[0]);
        }
        return Array.from(distractors);
    }

    // --- Fungsi Mengumpulkan Soal (Berdasarkan Subkategori) ---
    function prepareQuizQuestions() {
        quizQuestions = [];
        const rawQuestions = [];
        let allPossibleAnswers = [];

        // Ambil script dari localStorage
        currentScript = localStorage.getItem('selectedScript') || 'hiragana';

        // Ambil subcategories dari localStorage
        selectedSubCategories = JSON.parse(localStorage.getItem('selectedSubCategories') || '[]');

        const scriptData = quizDataSource[currentScript];
        if (!scriptData || !scriptData.categories) return;

        selectedSubCategories.forEach(subCategoryValue => {
            // Value format: "mainKey:subKey"
            const [mainCategoryKey, subCategoryKey] = subCategoryValue.split(':');

            if (scriptData.categories[mainCategoryKey] &&
                scriptData.categories[mainCategoryKey].subCategories &&
                scriptData.categories[mainCategoryKey].subCategories[subCategoryKey]) {
                const subCategoryData = scriptData.categories[mainCategoryKey].subCategories[subCategoryKey];
                for (const questionItem in subCategoryData) {
                    const answerItem = subCategoryData[questionItem];
                    rawQuestions.push({ q: questionItem, a: answerItem });
                    allPossibleAnswers.push(answerItem);
                }
            } else {
                console.warn(`Subcategory data not found for: ${subCategoryValue}`);
            }
        });

        // Buat soal final dengan opsi
        rawQuestions.forEach(item => {
            const correctAnswer = item.a;
            const distractors = getDistractors(correctAnswer, allPossibleAnswers, 3);
            const options = [correctAnswer, ...distractors];
            quizQuestions.push({ q: item.q, a: correctAnswer, options: options });
        });

        // Acak soal
        for (let i = quizQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
        }

        // Simpan quizQuestions ke localStorage
        localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions));
    }

    // --- Fungsi Menampilkan Soal ---
    function displayQuestion() {
        const questionCounter = document.getElementById('question-counter');
        const currentScoreDisplay = document.getElementById('current-score');
        const questionDisplay = document.getElementById('question-display');
        const optionsContainer = document.getElementById('options-container');
        const feedbackArea = document.getElementById('feedback-area');

        // Ambil quizQuestions dari localStorage
        if (quizQuestions.length === 0) {
            quizQuestions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
        }

        if (currentQuestionIndex >= quizQuestions.length) {
            // Simpan hasil ke localStorage
            localStorage.setItem('score', score);
            localStorage.setItem('incorrectAnswers', incorrectAnswers);
            localStorage.setItem('totalQuestions', quizQuestions.length);

            // Navigasi ke halaman hasil
            navigateTo('/hirakatakan/result.html');
            return;
        }

        const questionData = quizQuestions[currentQuestionIndex];

        if (questionDisplay) {
            questionDisplay.textContent = questionData.q;
        }

        if (optionsContainer) {
            optionsContainer.innerHTML = '';
        }

        if (feedbackArea) {
            feedbackArea.textContent = ''; // Kosongkan text, tapi elemen tetap ada
            feedbackArea.className = 'feedback-placeholder'; // Reset kelas
        }

        const options = [...questionData.options];
        options.sort(() => Math.random() - 0.5); // Acak opsi

        if (optionsContainer) {
            options.forEach(option => {
                const button = document.createElement('button');
                button.classList.add('btn', 'btn-option');
                button.textContent = option;
                button.dataset.answer = option;
                button.addEventListener('click', handleAnswer);
                optionsContainer.appendChild(button);
            });
        }

        if (questionCounter) {
            questionCounter.textContent = `Soal ${currentQuestionIndex + 1}/${quizQuestions.length}`;
        }

        if (currentScoreDisplay) {
            currentScoreDisplay.textContent = `Skor: ${score}`;
        }

        questionStartTime = Date.now();
    }

    // --- Fungsi Menangani Jawaban ---
    function handleAnswer(event) {
        const selectedButton = event.target;
        const selectedAnswer = selectedButton.dataset.answer;

        // Ambil quizQuestions dari localStorage jika belum ada
        if (quizQuestions.length === 0) {
            quizQuestions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');
        }

        const correctAnswer = quizQuestions[currentQuestionIndex].a;
        const optionsContainer = document.getElementById('options-container');
        const feedbackArea = document.getElementById('feedback-area');
        const currentScoreDisplay = document.getElementById('current-score');

        if (optionsContainer) {
            const optionButtons = optionsContainer.querySelectorAll('.btn-option');

            optionButtons.forEach(btn => {
                btn.disabled = true;
                btn.removeEventListener('click', handleAnswer);
            });

            if (selectedAnswer === correctAnswer) {
                score++;
                selectedButton.classList.add('correct');

                if (feedbackArea) {
                    feedbackArea.textContent = 'Benar!';
                    feedbackArea.classList.add('correct');
                }

                triggerConfetti();
            } else {
                incorrectAnswers++;
                selectedButton.classList.add('incorrect');

                if (feedbackArea) {
                    feedbackArea.textContent = `Salah! Jawaban: ${correctAnswer}`; // Tampilkan jawaban benar
                    feedbackArea.classList.add('incorrect');
                }

                optionButtons.forEach(btn => {
                    if (btn.dataset.answer === correctAnswer) {
                        btn.classList.add('correct'); // Highlight jawaban yg benar
                    }
                });
            }

            if (currentScoreDisplay) {
                currentScoreDisplay.textContent = `Skor: ${score}`;
            }

            // Simpan skor saat ini ke localStorage
            localStorage.setItem('score', score);
            localStorage.setItem('incorrectAnswers', incorrectAnswers);

            setTimeout(() => {
                currentQuestionIndex++;
                displayQuestion();
            }, 1800); // Beri waktu lebih lama sedikit untuk melihat jawaban benar
        }
    }

    // --- Fungsi Menampilkan Hasil ---
    function showResults() {
        const resultTotal = document.getElementById('result-total');
        const resultCorrect = document.getElementById('result-correct');
        const resultWrong = document.getElementById('result-wrong');
        const resultPercentage = document.getElementById('result-percentage');
        const resultProgressBar = document.getElementById('result-progress-bar');

        // Ambil hasil dari localStorage
        const totalQuestions = parseInt(localStorage.getItem('totalQuestions') || '0');
        const correctAnswers = parseInt(localStorage.getItem('score') || '0');
        const wrongAnswers = parseInt(localStorage.getItem('incorrectAnswers') || '0');

        if (resultTotal) {
            resultTotal.textContent = totalQuestions;
        }

        if (resultCorrect) {
            resultCorrect.textContent = correctAnswers;
        }

        if (resultWrong) {
            resultWrong.textContent = wrongAnswers;
        }

        const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

        if (resultPercentage) {
            resultPercentage.textContent = `${percentage}%`;
        }

        // Update progress bar
        if (resultProgressBar) {
            resultProgressBar.style.width = `${percentage}%`;
        }
    }

    // --- Fungsi Mulai Game ---
    function startGame(useSameQuestions = false) {
        score = 0;
        incorrectAnswers = 0;
        currentQuestionIndex = 0;

        if (!useSameQuestions) {
            prepareQuizQuestions();
        }

        // Ambil quizQuestions dari localStorage
        quizQuestions = JSON.parse(localStorage.getItem('quizQuestions') || '[]');

        if (quizQuestions.length === 0) {
            // Ini bisa terjadi jika user deselect semua subkategori setelah memilihnya
            showNotification("Pilih minimal satu subkategori untuk memulai.");
            return;
        }

        // Reset skor di localStorage
        localStorage.setItem('score', '0');
        localStorage.setItem('incorrectAnswers', '0');

        // Navigasi ke halaman game
        navigateTo('/hirakatakan/game.html');
    }

    // --- Fungsi Confetti ---
    let confettiInstance = null;
    const confettiCanvas = document.getElementById('confetti-canvas');

    if (confettiCanvas) {
        confettiInstance = confetti.create(confettiCanvas, { resize: true, useWorker: true });
    }

    function triggerConfetti() {
        if (confettiInstance) {
            confettiInstance({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
        }
    }

    // --- Fungsi untuk Menampilkan Konten Belajar ---
    function showLearningContent(scriptType) {
        currentLearningScript = scriptType; // Update state
        const scriptData = quizDataSource[scriptType];
        const learningContent = document.getElementById('learning-content');

        if (learningContent) {
            learningContent.innerHTML = ''; // Kosongkan konten

            if (!synth) {
                learningContent.innerHTML = '<p>Fitur suara tidak didukung browser ini.</p>';
                // Tetap tampilkan kamus visualnya
            }

            if (!scriptData || !scriptData.categories) {
                learningContent.innerHTML += '<p>Data tidak tersedia untuk skrip ini.</p>';
                return;
            }

            // Iterasi Kategori Utama (e.g., basic, dakuten, n4)
            for (const mainCategoryKey in scriptData.categories) {
                const mainCategory = scriptData.categories[mainCategoryKey];
                if (mainCategory && mainCategory.name && mainCategory.subCategories) {
                    const sectionDiv = document.createElement('div');
                    sectionDiv.className = 'learning-section';
                    const mainHeader = document.createElement('h3');
                    const scriptTitle = scriptData.title || scriptType;
                    mainHeader.textContent = `${mainCategory.name.toUpperCase()} ${scriptTitle.toUpperCase()}`;
                    sectionDiv.appendChild(mainHeader);

                    // Iterasi Subkategori
                    for (const subCategoryKey in mainCategory.subCategories) {
                        const subCategoryData = mainCategory.subCategories[subCategoryKey];
                        const groupDiv = document.createElement('div');
                        groupDiv.className = 'learning-group';
                        const subHeader = document.createElement('h4');
                        subHeader.textContent = subCategoryKey;
                        groupDiv.appendChild(subHeader);
                        const charactersDiv = document.createElement('div');
                        charactersDiv.className = 'learning-characters';

                        // Iterasi Item Karakter & Tambahkan Listener
                        for (const [character, reading] of Object.entries(subCategoryData)) {
                            if (character && reading) {
                                const itemDiv = document.createElement('div');
                                itemDiv.className = 'learning-char-item';
                                itemDiv.setAttribute('tabindex', '0'); // Agar bisa difokus keyboard
                                itemDiv.setAttribute('role', 'button'); // Semantik
                                itemDiv.setAttribute('aria-label', `Ucapkan ${character}`);

                                const charDiv = document.createElement('div');
                                charDiv.className = 'learning-char';
                                charDiv.textContent = character;

                                const readingDiv = document.createElement('div');
                                readingDiv.className = 'learning-reading';
                                const readingText = reading.split(' (')[0]; // Ambil bacaan utama
                                readingDiv.textContent = readingText;

                                itemDiv.appendChild(charDiv);
                                itemDiv.appendChild(readingDiv);

                                // Tentukan teks yang akan diucapkan
                                let textToSpeak = character; // Default: ucapkan karakter (baik untuk Kana)
                                if (scriptType === 'kanji') {
                                    textToSpeak = readingText; // Untuk Kanji, ucapkan bacaannya
                                } else if (mainCategoryKey === 'particles') {
                                    textToSpeak = character; // Untuk Partikel, ucapkan partikelnya
                                }

                                // --- TAMBAHKAN EVENT LISTENER KLIK UNTUK SUARA ---
                                itemDiv.addEventListener('click', () => {
                                    playSpeech(textToSpeak, 'ja-JP');
                                });
                                // Tambahkan event listener keyboard (Enter/Space)
                                itemDiv.addEventListener('keydown', (event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault(); // Cegah scroll/aksi lain
                                        playSpeech(textToSpeak, 'ja-JP');
                                    }
                                });
                                // --- AKHIR EVENT LISTENER SUARA ---

                                // Tambahkan meaning jika ini Kanji
                                if (scriptType === 'kanji') {
                                    const meaningMatch = reading.match(/\(([^)]+)\)/);
                                    if (meaningMatch && meaningMatch[1]) {
                                        const meaningDiv = document.createElement('div');
                                        meaningDiv.className = 'learning-meaning';
                                        meaningDiv.textContent = meaningMatch[1];
                                        itemDiv.appendChild(meaningDiv);
                                    }
                                }
                                charactersDiv.appendChild(itemDiv);
                            }
                        } // End Character Loop
                        groupDiv.appendChild(charactersDiv);
                        sectionDiv.appendChild(groupDiv);
                    } // End SubCategory Loop
                    learningContent.appendChild(sectionDiv);
                } // End if mainCategory valid
            } // End MainCategory Loop

            if (learningContent.innerHTML === '') {
                learningContent.innerHTML = '<p>Belum ada data untuk kategori ini.</p>';
            }
        }

        // Simpan script yang dipilih ke localStorage
        localStorage.setItem('currentLearningScript', scriptType);
    }

    // --- Helper untuk mencoba memuat suara Jepang ---
    function loadJapaneseVoice() {
        const voices = synth.getVoices();

        // Tampilkan semua voice Jepang yang tersedia di console (untuk debug)
        console.log("Daftar suara dengan lang 'ja':");
        voices
            .filter(v => v.lang.startsWith('ja'))
            .forEach(v => console.log(`- ${v.name} (${v.lang})`));

        if (voices.length > 0) {
            // Cari suara wanita Jepang yang umum, berdasarkan nama
            japaneseVoice = voices.find(v =>
                v.lang === 'ja-JP' &&
                (
                    v.name.toLowerCase().includes('haruka') || // Windows
                    v.name.toLowerCase().includes('mizuki') || // Amazon Polly (jika tersedia)
                    v.name.toLowerCase().includes('nanami') || // macOS
                    v.name.toLowerCase().includes('female') || // General
                    v.name.toLowerCase().includes('google')    // Google voice (di Chrome)
                )
            );

            // Jika tidak ketemu suara wanita, ambil suara Jepang pertama yang tersedia
            if (!japaneseVoice) {
                japaneseVoice = voices.find(v => v.lang.startsWith('ja'));
            }

            if (japaneseVoice) {
                console.log(`✅ Suara Jepang ditemukan : ${japaneseVoice.name}`);
            } else {
                console.warn("⚠️ Tidak ada suara Jepang ditemukan di sistem ini.");
            }
        } else {
            console.warn("⏳ Voice list belum siap, tunggu 'voiceschanged' event.");
        }
    }

    // Panggil saat voices berubah (mungkin perlu waktu untuk load)
    if (synth && synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadJapaneseVoice;
    }

    if (synth) {
        loadJapaneseVoice(); // Coba panggil langsung juga
    }

    // --- Fungsi untuk Memainkan Suara ---
    function playSpeech(textToSpeak, langCode = 'ja-JP') {
        if (!synth) {
            console.warn("Speech Synthesis not supported by this browser.");
            showNotification("Browser tidak mendukung fitur suara.", 2000);
            return;
        }

        // Hentikan suara yang mungkin sedang berjalan
        synth.cancel();

        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = langCode;

        // Coba gunakan suara Jepang yang sudah dimuat
        if (japaneseVoice) {
            utterance.voice = japaneseVoice;
        } else {
            // Jika belum ada, coba cari lagi (meskipun mungkin tidak efektif di sini)
            loadJapaneseVoice();
            if (japaneseVoice) utterance.voice = japaneseVoice;
            // Jika tetap tidak ada, browser akan pakai default untuk langCode
        }

        utterance.rate = 1; // Sedikit lebih lambat agar jelas
        utterance.pitch = 1.0;

        synth.speak(utterance);

        utterance.onerror = (event) => {
            console.error('SpeechSynthesisUtterance.onerror', event);
            showNotification(`Error memainkan suara : ${event.error}`, 3000);
        };
    }

    // --- Event Listeners ---

    // Listener untuk tema
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }

    // Deteksi halaman saat ini
    const currentPage = window.location.pathname.split('/').pop();

    // Event listeners khusus untuk halaman index.html
    if (currentPage === 'index.html' || currentPage === '') {
        const startQuizButton = document.getElementById('start-quiz-button');
        const startLearningButton = document.getElementById('start-learning-button');

        if (startQuizButton) {
            startQuizButton.addEventListener('click', () => navigateTo('/hirakatakan/selectscript.html'));
        }

        if (location.pathname === "/hirakatakan") {
            location.replace("/hirakatakan/");
        }

        if (startLearningButton) {
            startLearningButton.addEventListener('click', () => {
                // Ambil script terakhir yang dipilih atau gunakan default

                const lastScript = localStorage.getItem('currentLearningScript') || 'hiragana';
                localStorage.setItem('currentLearningScript', lastScript);
                navigateTo('/hirakatakan/learning.html');
            });
        }
    }

    // Event listeners khusus untuk halaman selectscript.html
    else if (currentPage === 'selectscript.html') {
        const scriptButtons = document.querySelectorAll('.btn-script');
        const backButton = document.querySelector('.btn-back');

        scriptButtons.forEach(button => {
            button.addEventListener('click', () => loadCategories(button.dataset.script));
        });

        if (backButton) {
            backButton.addEventListener('click', () => navigateTo('/hirakatakan/index.html'));
        }
    }

    // Event listeners khusus untuk halaman selectcategory.html
    else if (currentPage === 'selectcategory.html') {
        const startGameButton = document.getElementById('start-game-button');
        const backButton = document.querySelector('.btn-back');
        const mainCategoryContainer = document.getElementById('main-category-container');

        // Ambil script yang dipilih dari localStorage
        currentScript = localStorage.getItem('selectedScript') || 'hiragana';

        // Load kategori berdasarkan script yang dipilih
        const scriptData = quizDataSource[currentScript];
        if (scriptData) {
            const selectedScriptTitle = document.getElementById('selected-script-title');
            if (selectedScriptTitle) {
                selectedScriptTitle.textContent = `(${scriptData.title})`;
            }

            // Load kategori
            if (mainCategoryContainer) {
                mainCategoryContainer.innerHTML = ''; // Kosongkan accordion
                selectedSubCategories = []; // Reset pilihan subkategori

                // Buat setiap item accordion untuk kategori utama
                for (const mainCategoryKey in scriptData.categories) {
                    const mainCategory = scriptData.categories[mainCategoryKey];
                    if (mainCategory && mainCategory.name && mainCategory.subCategories) {

                        const mainCategoryItem = document.createElement('div');
                        mainCategoryItem.classList.add('main-category-item');
                        mainCategoryItem.dataset.mainKey = mainCategoryKey; // Simpan key

                        // Header Accordion (bisa diklik)
                        const header = document.createElement('div');
                        header.classList.add('main-category-header');
                        header.innerHTML = `
                            <span>${mainCategory.name}</span>
                            <i class="fas fa-chevron-down toggle-icon"></i>
                        `;
                        header.addEventListener('click', () => {
                            mainCategoryItem.classList.toggle('active');
                        });

                        // Kontainer untuk subkategori (tersembunyi)
                        const subListContainer = document.createElement('div');
                        subListContainer.classList.add('subcategory-list');

                        const subOptionsGrid = document.createElement('div');
                        subOptionsGrid.classList.add('subcategory-options');

                        // Buat checkbox untuk setiap subkategori
                        for (const subCategoryKey in mainCategory.subCategories) {
                            const subCategoryItem = document.createElement('div');
                            subCategoryItem.classList.add('subcategory-item');
                            const checkboxId = `subcat-${mainCategoryKey}-${subCategoryKey.replace(/\s+/g, '-')}`; // ID unik
                            // Value format: "mainKey:subKey"
                            const checkboxValue = `${mainCategoryKey}:${subCategoryKey}`;

                            subCategoryItem.innerHTML = `
                                <label for="${checkboxId}">
                                    <input type="checkbox" id="${checkboxId}" name="subcategory" value="${checkboxValue}">
                                    <span>${subCategoryKey}</span>
                                </label>
                            `;
                            subOptionsGrid.appendChild(subCategoryItem);
                        }

                        subListContainer.appendChild(subOptionsGrid);
                        mainCategoryItem.appendChild(header);
                        mainCategoryItem.appendChild(subListContainer);
                        mainCategoryContainer.appendChild(mainCategoryItem);
                    }
                }
            }
        }

        // Listener untuk perubahan checkbox subkategori
        if (mainCategoryContainer) {
            mainCategoryContainer.addEventListener('change', (event) => {
                if (event.target.type === 'checkbox' && event.target.name === 'subcategory') {
                    // Update selectedSubCategories array
                    selectedSubCategories = Array.from(mainCategoryContainer.querySelectorAll('input[name="subcategory"]:checked'))
                        .map(cb => cb.value);

                    // Simpan ke localStorage
                    localStorage.setItem('selectedSubCategories', JSON.stringify(selectedSubCategories));

                    // Enable/disable start button
                    if (startGameButton) {
                        startGameButton.disabled = selectedSubCategories.length === 0;
                    }
                }
            });
        }

        if (startGameButton) {
            startGameButton.addEventListener('click', (event) => {
                event.preventDefault();
                // Ambil selectedSubCategories dari localStorage
                const storedSubCategories = JSON.parse(localStorage.getItem('selectedSubCategories') || '[]');
                if (storedSubCategories.length > 0) {
                    selectedSubCategories = storedSubCategories;
                    startGame(false);
                } else {
                    showNotification("Pilih minimal satu subkategori dari dropdown.");
                }
            });
        }

        if (backButton) {
            backButton.addEventListener('click', () => navigateTo('/hirakatakan/selectscript.html'));
        }
    }

    // Event listeners khusus untuk halaman game.html
    else if (currentPage === 'game.html') {
        const quitGameButton = document.getElementById('quit-game-button');

        // Ambil data dari localStorage
        score = parseInt(localStorage.getItem('score') || '0');
        incorrectAnswers = parseInt(localStorage.getItem('incorrectAnswers') || '0');
        currentQuestionIndex = parseInt(localStorage.getItem('currentQuestionIndex') || '0');

        // Tampilkan soal
        displayQuestion();

        if (quitGameButton) {
            quitGameButton.addEventListener('click', () => navigateTo('/hirakatakan/index.html'));
        }
    }

    // Event listeners khusus untuk halaman result.html
    else if (currentPage === 'result.html') {
        const tryAgainButton = document.getElementById('try-again-button');
        const newCategoriesButton = document.getElementById('new-categories-button');
        const homeButton = document.getElementById('home-button');

        // Tampilkan hasil
        showResults();

        if (tryAgainButton) {
            tryAgainButton.addEventListener('click', () => {
                // Reset skor
                localStorage.setItem('score', '0');
                localStorage.setItem('incorrectAnswers', '0');
                localStorage.setItem('currentQuestionIndex', '0');

                // Navigasi ke halaman game
                navigateTo('/hirakatakan/game.html');
            });
        }

        if (newCategoriesButton) {
            newCategoriesButton.addEventListener('click', () => {
                // Ambil script yang dipilih dari localStorage
                const selectedScript = localStorage.getItem('selectedScript');
                if (selectedScript) {
                    navigateTo('/hirakatakan/selectcategory.html');
                } else {
                    navigateTo('/hirakatakan/selectscript.html');
                }
            });
        }

        if (homeButton) {
            homeButton.addEventListener('click', () => navigateTo('/hirakatakan/index.html'));
        }
    }

    // Event listeners khusus untuk halaman learning.html
    else if (currentPage === 'learning.html') {
        const learningScriptTabs = document.querySelectorAll('.script-tabs .btn-script');
        const backButton = document.querySelector('.btn-back');

        // Ambil script yang dipilih dari localStorage
        currentLearningScript = localStorage.getItem('currentLearningScript') || 'hiragana';

        // Update tombol aktif
        learningScriptTabs.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.script === currentLearningScript);

            // Tambahkan event listener
            btn.addEventListener('click', function () {
                // 1. Hapus kelas active dari semua tab
                learningScriptTabs.forEach(b => b.classList.remove('active'));
                // 2. Tambahkan kelas active ke tab yang diklik
                this.classList.add('active');
                // 3. Muat konten sesuai data-script tombol yang diklik
                showLearningContent(this.dataset.script);
            });
        });

        // Tampilkan konten
        showLearningContent(currentLearningScript);

        if (backButton) {
            backButton.addEventListener('click', () => navigateTo('/hirakatakan/index.html'));
        }

        // Jika voices belum siap, coba load lagi
        if (!japaneseVoice && synth && synth.onvoiceschanged === undefined) {
            loadJapaneseVoice();
        }

        //Memanggil template
        fetch('templates/head.html')
        .then(response => response.text())
        .then(data => {
          document.getElementById('head-placeholder').innerHTML = data;
        });
    }
});
