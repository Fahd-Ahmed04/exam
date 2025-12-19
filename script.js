const questions = [
    {
        question: "يختلف التعليم الصفي عن الإلكتروني بكونه تعليم مباشر متزامن، يركز على المعلم، وإنتاج المعرفة.",
        answers: [
            { text: "صواب", correct: true },
            { text: "خطأ", correct: false }
        ]
    },
    {
        question: "أي مما يلي لا يعد من أنظمة إدارة التعلم الإلكتروني؟",
        answers: [
            { text: "JavaScript", correct: true },
            { text: "Google Classroom", correct: false },
            { text: "Moodle", correct: false },
            { text: "Schoology", correct: false }
        ]
    },
    {
        question: "تحتاج المتاحف الافتراضية إلى تكلفة عالية ولذلك يصعب تطويرها وتحديثها.",
        answers: [
            { text: "صواب", correct: false },
            { text: "خطأ", correct: true }
        ]
    },
    {
        question: "أي مما يلي لا يعد من خصائص الكتاب الإلكتروني؟",
        answers: [
            { text: "بساطة قراءته بالمكتبات كصورة مطبوعة", correct: true },
            { text: "تشفير صفحاته بطرق مختلفة", correct: false },
            { text: "احتوائه على الوسائط المتعددة", correct: false },
            { text: "عرضه على الطلاب بقاعات الدراسة", correct: false }
        ]
    },
    {
        question: "يرمز للاختصار LMS إلى أنظمة إدارة التعلم، لإدارة مقررات إلكترونية.",
        answers: [
            { text: "صواب", correct: true },
            { text: "خطأ", correct: false }
        ]
    },
    {
        question: "أي مما يلي لا يعد من متطلبات التعليم الإلكتروني؟",
        answers: [
            { text: "الحضور إلى المؤسسة التعليمية", correct: true },
            { text: "تحسين سرعة الإنترنت", correct: false },
            { text: "وجود خطط وبرامج مدروسة", correct: false },
            { text: "الاستفادة من تجارب المؤسسات الرائدة", correct: false }
        ]
    },
    {
        question: "يقدم تطبيق Solar system VR تشريحًا دقيقًا لأجهزة الجسم مع شرح لكل عضو.",
        answers: [
            { text: "صواب", correct: false },
            { text: "خطأ", correct: true }
        ]
    },
    {
        question: "أي مما يلي يعد من أنواع التعليم الإلكتروني؟",
        answers: [
            { text: "التعليم المدمج", correct: true },
            { text: "التعليم السريع", correct: false },
            { text: "التعليم التفاعلي", correct: false },
            { text: "التعليم التبادلي", correct: false }
        ]
    },
    {
        question: "يعد نموذج المعلم من نماذج بيئات التعلم التكيفية.",
        answers: [
            { text: "صواب", correct: false },
            { text: "خطأ", correct: true }
        ]
    },
    {
        question: "أي مما يلي لا يعد من منصات الفصول الافتراضية؟",
        answers: [
            { text: "Dreamweaver", correct: true },
            { text: "Zoom", correct: false },
            { text: "Microsoft Teams", correct: false },
            { text: "WebEx", correct: false }
        ]
    }
];

// مفاتيح التخزين
const STORAGE_KEYS = {
    USER: 'quiz_user',
    EMAIL: 'quiz_email',
    ANSWERS: 'quiz_answers',
    STATE: 'quiz_state',
    QUIZ_DATA: 'quiz_data'
};

// عناصر DOM
const pages = {
    login: document.getElementById('login-page'),
    quiz: document.getElementById('quiz-page'),
    result: document.getElementById('result-page'),
    review: document.getElementById('review-page')
};

const elements = {
    usernameInput: document.getElementById('username'),
    emailInput: document.getElementById('email'),
    startBtn: document.getElementById('start-btn'),
    currentUser: document.getElementById('current-user'),
    currentEmail: document.getElementById('current-email'),
    logoutBtn: document.getElementById('logout-btn'),
    questionsContainer: document.getElementById('questions-container'),
    submitBtn: document.getElementById('submit-btn'),
    progressFill: document.getElementById('progress-fill'),
    progressText: document.getElementById('progress-text'),
    scoreNumber: document.getElementById('score-number'),
    scorePercentage: document.getElementById('score-percentage'),
    scoreMessage: document.getElementById('score-message'),
    resultUser: document.getElementById('result-user'),
    resultDate: document.getElementById('result-date'),
    resultTime: document.getElementById('result-time'),
    reviewBtn: document.getElementById('review-btn'),
    restartBtn: document.getElementById('restart-btn'),
    homeBtn: document.getElementById('home-btn'),
    backToResults: document.getElementById('back-to-results'),
    reviewContainer: document.getElementById('review-container')
};

// تهيئة التطبيق
function initApp() {
    loadUserState();
    setupEventListeners();
}

// تحميل حالة المستخدم
function loadUserState() {
    const user = sessionStorage.getItem(STORAGE_KEYS.USER);
    const email = sessionStorage.getItem(STORAGE_KEYS.EMAIL);
    const state = sessionStorage.getItem(STORAGE_KEYS.STATE);
    
    if (user && email) {
        elements.currentUser.textContent = user;
        elements.currentEmail.textContent = email;
        elements.resultUser.textContent = user;
        
        if (state === 'quiz') {
            showPage('quiz');
            startQuiz();
        } else if (state === 'result') {
            showPage('result');
            showResults();
        } else {
            showPage('login');
        }
    } else {
        showPage('login');
    }
}

// عرض صفحة معينة
function showPage(pageName) {
    Object.keys(pages).forEach(key => {
        pages[key].classList.remove('active');
    });
    pages[pageName].classList.add('active');
}

// إعداد المستمعين للأحداث
function setupEventListeners() {
    // صفحة تسجيل الدخول
    elements.startBtn.addEventListener('click', handleLogin);
    elements.usernameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    elements.emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
    
    // صفحة الاختبار
    elements.logoutBtn.addEventListener('click', handleLogout);
    elements.submitBtn.addEventListener('click', handleSubmit);
    
    // صفحة النتائج
    elements.reviewBtn.addEventListener('click', showReview);
    elements.restartBtn.addEventListener('click', handleRestart);
    elements.homeBtn.addEventListener('click', () => {
        sessionStorage.removeItem(STORAGE_KEYS.STATE);
        showPage('login');
    });
    
    // صفحة المراجعة
    elements.backToResults.addEventListener('click', () => showPage('result'));
}

// معالجة تسجيل الدخول
function handleLogin() {
    const username = elements.usernameInput.value.trim();
    const email = elements.emailInput.value.trim();
    
    if (!username || !email) {
        alert('الرجاء إدخال الاسم والبريد الإلكتروني');
        return;
    }
    
    if (!validateEmail(email)) {
        alert('الرجاء إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // حفظ بيانات المستخدم
    sessionStorage.setItem(STORAGE_KEYS.USER, username);
    sessionStorage.setItem(STORAGE_KEYS.EMAIL, email);
    sessionStorage.setItem(STORAGE_KEYS.STATE, 'quiz');
    
    // تحديث واجهة المستخدم
    elements.currentUser.textContent = username;
    elements.currentEmail.textContent = email;
    elements.resultUser.textContent = username;
    
    showPage('quiz');
    startQuiz();
}

// التحقق من صحة البريد الإلكتروني
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// بدء الاختبار
function startQuiz() {
    // مسح المحتوى السابق
    elements.questionsContainer.innerHTML = '';
    
    // إعادة تهيئة الإجابات المحفوظة
    const savedAnswers = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ANSWERS) || '{}');
    
    // إنشاء الأسئلة
    questions.forEach((question, index) => {
        const questionElement = document.createElement('div');
        questionElement.className = 'question-item';
        questionElement.innerHTML = `
            <div class="question-header">
                <div class="question-number">${index + 1}</div>
                <div class="question-text">${question.question}</div>
            </div>
            <div class="answers-container" id="answers-${index}">
                ${question.answers.map((answer, ansIndex) => `
                    <label class="answer-label">
                        <input type="radio" name="question-${index}" value="${ansIndex}" 
                               data-question="${index}" ${savedAnswers[index] == ansIndex ? 'checked' : ''}>
                        <span>${answer.text}</span>
                    </label>
                `).join('')}
            </div>
        `;
        elements.questionsContainer.appendChild(questionElement);
    });
    
    // إعداد مستمعي الإجابات
    setupAnswerListeners();
    
    // تحديث شريط التقدم
    updateProgress();
}

// إعداد مستمعي الإجابات
function setupAnswerListeners() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const questionIndex = parseInt(this.dataset.question);
            const answerIndex = parseInt(this.value);
            saveAnswer(questionIndex, answerIndex);
            updateProgress();
        });
    });
}

// حفظ الإجابة
function saveAnswer(questionIndex, answerIndex) {
    let savedAnswers = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ANSWERS) || '{}');
    savedAnswers[questionIndex] = answerIndex;
    sessionStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(savedAnswers));
}

// تحديث شريط التقدم
function updateProgress() {
    const savedAnswers = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ANSWERS) || '{}');
    const answeredCount = Object.keys(savedAnswers).length;
    const totalQuestions = questions.length;
    const percentage = (answeredCount / totalQuestions) * 100;
    
    // تحديث شريط التقدم
    elements.progressFill.style.width = `${percentage}%`;
    elements.progressText.textContent = `${answeredCount}/${totalQuestions}`;
    
    // تحديث زر التصحيح
    if (answeredCount === totalQuestions) {
        elements.submitBtn.disabled = false;
        elements.submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> تصحيح الإجابات (${answeredCount}/${totalQuestions})`;
    } else {
        elements.submitBtn.disabled = true;
        elements.submitBtn.innerHTML = `<i class="fas fa-paper-plane"></i> تصحيح الإجابات (${answeredCount}/${totalQuestions})`;
    }
}

// معالجة إرسال الإجابات
function handleSubmit() {
    // حساب النتيجة
    const score = calculateScore();
    
    // حفظ النتيجة والحالة
    sessionStorage.setItem(STORAGE_KEYS.STATE, 'result');
    sessionStorage.setItem('quiz_score', score.toString());
    sessionStorage.setItem('quiz_date', new Date().toLocaleDateString('ar-EG'));
    sessionStorage.setItem('quiz_time', new Date().toLocaleTimeString('ar-EG'));
    
    // عرض صفحة النتائج
    showPage('result');
    showResults();
}

// حساب النتيجة
function calculateScore() {
    const savedAnswers = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ANSWERS) || '{}');
    let score = 0;
    
    questions.forEach((question, index) => {
        if (savedAnswers[index] !== undefined) {
            const answerIndex = savedAnswers[index];
            if (question.answers[answerIndex].correct) {
                score++;
            }
        }
    });
    
    return score;
}

// عرض النتائج
function showResults() {
    const score = parseInt(sessionStorage.getItem('quiz_score') || '0');
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // تحديث العناصر
    elements.scoreNumber.textContent = score;
    elements.scorePercentage.textContent = `${percentage}%`;
    elements.resultDate.textContent = sessionStorage.getItem('quiz_date') || '-';
    elements.resultTime.textContent = sessionStorage.getItem('quiz_time') || '-';
    
    // تحديد الرسالة المناسبة
    let message = '';
    if (percentage >= 90) {
        message = 'ممتاز! 🎉';
    } else if (percentage >= 80) {
        message = 'جيد جداً! 👍';
    } else if (percentage >= 70) {
        message = 'جيد! 👏';
    } else if (percentage >= 60) {
        message = 'مقبول! 💪';
    } else {
        message = 'يحتاج تحسين! 📚';
    }
    
    elements.scoreMessage.textContent = message;
}

// عرض مراجعة الإجابات
function showReview() {
    const savedAnswers = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ANSWERS) || '{}');
    
    elements.reviewContainer.innerHTML = '';
    
    questions.forEach((question, index) => {
        const userAnswerIndex = savedAnswers[index];
        const correctAnswer = question.answers.find(answer => answer.correct);
        const userAnswer = userAnswerIndex !== undefined ? question.answers[userAnswerIndex] : null;
        
        const isCorrect = userAnswer ? userAnswer.correct : false;
        const reviewClass = isCorrect ? 'correct' : 'incorrect';
        
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${reviewClass}`;
        reviewItem.innerHTML = `
            <div class="question">${index + 1}. ${question.question}</div>
            <div class="answer">
                <strong>إجابتك:</strong> 
                <span class="user-answer ${isCorrect ? '' : 'incorrect'}">
                    ${userAnswer ? userAnswer.text : 'لم تجب'}
                </span>
            </div>
            <div class="answer correct-answer">
                <strong>الإجابة الصحيحة:</strong> ${correctAnswer.text}
            </div>
        `;
        
        elements.reviewContainer.appendChild(reviewItem);
    });
    
    showPage('review');
}

// إعادة الاختبار
function handleRestart() {
    if (confirm('هل تريد بدء اختبار جديد؟ سيتم مسح إجاباتك السابقة.')) {
        // مسح الإجابات المحفوظة
        sessionStorage.removeItem(STORAGE_KEYS.ANSWERS);
        sessionStorage.setItem(STORAGE_KEYS.STATE, 'quiz');
        
        // إعادة التحميل
        showPage('quiz');
        startQuiz();
    }
}

// تسجيل الخروج
function handleLogout() {
    if (confirm('هل تريد تسجيل الخروج؟ سيتم فقدان تقدمك الحالي.')) {
        sessionStorage.clear();
        showPage('login');
        elements.usernameInput.value = '';
        elements.emailInput.value = '';
    }
}

// تشغيل التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initApp);