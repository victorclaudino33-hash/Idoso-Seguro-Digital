/* ==========================================================================
   DADOS DO SIMULADOR (QUIZ)
   ========================================================================== */
const quizData = [
    {
        header: "WhatsApp: Número Desconhecido",
        body: "Oi pai, meu celular quebrou. Salva meu número novo e me faz um PIX de R$ 400 para o conserto?",
        question: "Essa mensagem é confiável?",
        correct: "danger",
        tip: "Golpistas fingem ser parentes. Sempre ligue para o número antigo para confirmar."
    },
    {
        header: "E-mail: Banco Central",
        body: "Você possui R$ 2.500,00 esquecidos em contas antigas. Clique aqui para resgatar.",
        question: "O que você acha deste e-mail?",
        correct: "danger",
        tip: "Bancos não enviam links de resgate por e-mail ou SMS."
    },
    {
        header: "Portal de Notícias Confiável",
        body: "Inscrições para o concurso municipal abertas no site oficial da prefeitura.",
        question: "Essa informação parece segura?",
        correct: "safe",
        tip: "Notícias com fontes oficiais e sem alarmismo tendem a ser reais."
    }
    // Adicione os outros 7 cenários seguindo este padrão
];

let currentQuestion = 0;
let score = 0;

/* ==========================================================================
   CONTROLE DO QUIZ
   ========================================================================== */
const startBtn = document.getElementById('startQuizBtn');
const quizStart = document.getElementById('quizStart');
const quizQuestion = document.getElementById('quizQuestion');
const feedbackScreen = document.getElementById('quizFeedback');

startBtn.addEventListener('click', () => {
    quizStart.classList.add('hidden');
    quizQuestion.classList.remove('hidden');
    loadQuestion();
});

function loadQuestion() {
    const data = quizData[currentQuestion];
    document.getElementById('deviceHeader').innerText = data.header;
    document.getElementById('deviceBody').innerText = data.body;
    document.getElementById('questionText').innerText = data.question;
    document.getElementById('currentQ').innerText = currentQuestion + 1;
    document.getElementById('progressFill').style.width = `${(currentQuestion + 1) * 10}%`;
}

function handleAnswer(choice) {
    const data = quizData[currentQuestion];
    quizQuestion.classList.add('hidden');
    feedbackScreen.classList.remove('hidden');

    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackResult = document.getElementById('feedbackResult');

    if (choice === data.correct) {
        score++;
        feedbackIcon.innerText = "✅";
        feedbackResult.innerText = "Você acertou!";
        feedbackResult.style.color = "#4caf50";
    } else {
        feedbackIcon.innerText = "❌";
        feedbackResult.innerText = "Cuidado!";
        feedbackResult.style.color = "#f44336";
    }

    document.getElementById('feedbackText').innerText = choice === "danger" ? "Você identificou uma suspeita!" : "Você achou que era seguro.";
    document.getElementById('feedbackTipText').innerText = data.tip;
}

document.getElementById('btnSafe').onclick = () => handleAnswer('safe');
document.getElementById('btnDanger').onclick = () => handleAnswer('danger');

document.getElementById('nextQuestionBtn').onclick = () => {
    currentQuestion++;
    feedbackScreen.classList.add('hidden');
    if (currentQuestion < quizData.length) {
        quizQuestion.classList.remove('hidden');
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    document.getElementById('quizResult').classList.remove('hidden');
    document.getElementById('finalScore').innerText = score;
    const level = score >= 8 ? "Especialista em Segurança!" : score >= 5 ? "Bom caminho, mas atenção!" : "Precisa praticar mais!";
    document.getElementById('resultLevel').innerText = level;
}

/* ==========================================================================
   CONTROLE DE ABAS (EDUCATIVO)
   ========================================================================== */
const tabBtns = document.querySelectorAll('.edu-tab');
const panels = document.querySelectorAll('.edu-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
});

/* ==========================================================================
   VÍDEO PLACEHOLDER
   ========================================================================== */
document.getElementById('videoPlaceholder').addEventListener('click', function() {
    this.innerHTML = `<iframe width="100%" height="100%" src="SUA_URL_DO_YOUTUBE_AQUI?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
});
// Adiciona uma classe ao cabeçalho quando o usuário rola a página
window.addEventListener('scroll', () => {
    const header = document.querySelector('.site-header');
    if (window.scrollY > 20) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
/* ==========================================================================
   FUNÇÃO PARA REINICIAR O JOGUINHO
   ========================================================================== */

const restartBtn = document.getElementById('restartQuizBtn');

function restartQuiz() {
    // 1. Zerar as variáveis de controle
    currentQuestion = 0;
    score = 0;

    // 2. Esconder a tela de resultado final
    document.getElementById('quizResult').classList.add('hidden');

    // 3. (Opcional) Voltar direto para a primeira pergunta 
    // ou para a tela inicial. Aqui vamos para a tela inicial:
    document.getElementById('quizStart').classList.remove('hidden');

    // 4. Resetar a barra de progresso visualmente
    document.getElementById('progressFill').style.width = "0%";
    
    // 5. Limpar qualquer feedback anterior que possa ter ficado
    const feedbackIcon = document.getElementById('feedbackIcon');
    const feedbackResult = document.getElementById('feedbackResult');
    feedbackIcon.innerText = "";
    feedbackResult.innerText = "";
}

// Configura o clique do botão "Jogar Novamente"
restartBtn.addEventListener('click', restartQuiz);