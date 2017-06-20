
function intializateAnswers() {
    localStorage.setItem("1", -1);
    localStorage.setItem("2", -1);
    localStorage.setItem("3", -1);
    localStorage.setItem("4", -1);
    localStorage.setItem("5", -1);
    localStorage.setItem("6", -1);
}

function verifyForm(currentQuestion) {
    var answer = [localStorage.getItem("1"), localStorage.getItem("2"), localStorage.getItem("3"), localStorage.getItem("4"), localStorage.getItem("5"), localStorage.getItem("6")];
    var navQuestion = [document.getElementById("nav-q1"), document.getElementById("nav-q2"), document.getElementById("nav-q3"), document.getElementById("nav-q4"), document.getElementById("nav-q5"), document.getElementById("nav-q6")];

    for(i=0;i<6;i++) {
        questionNumber = parseInt(i) + 1;
        if(i == (currentQuestion-1)) {
            navQuestion[i].innerHTML = "Questão " + questionNumber + '<br> <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>';
            if(answer[i]!=-1) {
                document.getElementById("label-" + answer[i]).style="background-color:#333; font-weight:bold; color:white";
                document.getElementById("radio-" + answer[i]).checked=true;
            }
            // navQuestion[i].style="color:#fff";
            break;
        }

        if(answer[i]==-1 || answer[i]==null) 
            navQuestion[i].innerHTML = "Questão " + questionNumber + '<br> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
        else {
            navQuestion[i].innerHTML = "Questão " + questionNumber + '<br> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
            navQuestion[i].style="color:#4CAF50";
        }
            navQuestion[i].className="six-col-grid active";
    }
}

function goTo(question) {
    navQ = document.getElementById("nav-q" + question);
    if(navQ.className.search("active")>-1)
        window.location.href = "https://eupecric.github.io/ppsus/questao" + question  + ".html";
}

function saveQuestion(question, answer) {
    localStorage.setItem(question, answer);
}

function previousQuestion(btn) {
    var answer = document.querySelector('input[name="answer"]:checked');
    var currentQuestion = parseInt(btn.value)+1;
    if(answer!=null) {
        saveQuestion(currentQuestion, answer.value);
    }
    else
        saveQuestion(currentQuestion, -1);

    window.location.href = "https://eupecric.github.io/ppsus/questao" + btn.value  + ".html";
}

function nextQuestion(btn) {
    var answer = document.querySelector('input[name="answer"]:checked');
    var currentQuestion = parseInt(btn.value)-1;
    if(answer!=null) {
        saveQuestion(currentQuestion, answer.value);
        window.location.href = "https://eupecric.github.io/ppsus/questao" + btn.value  + ".html";
    }
    else
        alert("SELECIONE ALGUMA RESPOSTA PARA PROSSEGUIR");
}