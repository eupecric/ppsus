
function intializateAnswers() {
    localStorage.setItem("1", -1);
    localStorage.setItem("2", -1);
    localStorage.setItem("3", -1);
    localStorage.setItem("4", -1);
    localStorage.setItem("5", -1);
    localStorage.setItem("6", -1);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function confirmForm() {
    var p = [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3"), document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")];
    for(i=1;i<7;i++)
        p[i-1].innerHTML = p[i-1].innerHTML + " <p>Resposta: <strong>" + localStorage.getItem(i) + "</strong></p>";
    writePatient();

    span = document.getElementById("agent-name");
    span.innerHTML = localStorage.getItem("login").toUpperCase();
}

function goConfirmFormPage(value) { 
    var answer = document.querySelector('input[name="answer"]:checked');
    var currentQuestion = parseInt(value);
    if(answer!=null) {
        saveQuestion(currentQuestion, answer.value);
        window.location.href="https://eupecric.github.io/ppsus/confirma_respostas.html";
    }
    else
        alert("SELECIONE ALGUMA RESPOSTA PARA PROSSEGUIR");
}

function loadPatients() {
    var to_write = '<a href="#" class="active">Pacientes</a>';
    var patients = localStorage.getItem("patients");

    if(patients==null) { 
        list.innerHTML = "";
        return;
    }
                    // <a href="#">Link 1</a>
    // alert("aqui");
    html_list = document.getElementById("patient-list");
    var patient = patients.split("_");
    for(i=0; i<patient.length; i++) {
        // alert(patient[i]);
        to_write = to_write + '<a href="https://eupecric.github.io/ppsus/respostas.html?patient=' + patient[i] + '">'+ patient[i] +'</a>';
    }
    html_list.innerHTML = to_write;
}

function submitForm() {
    alert("Formulario enviado com sucesso!");
    window.location.href="https://eupecric.github.io/ppsus/paciente.html";
}

function goInsertPatientPage() {
    localStorage.setItem("login",document.getElementById("login").value);
    window.location.href = "https://eupecric.github.io/ppsus/paciente.html";
}

function showAnswers() {
    var patient = getParameterByName('patient');
    var p = [document.getElementById("p1"), document.getElementById("p2"), document.getElementById("p3"), document.getElementById("p4"), document.getElementById("p5"), document.getElementById("p6")];
    var answer = [localStorage.getItem(patient + '_1'),localStorage.getItem(patient + '_2'),localStorage.getItem(patient + '_3'),localStorage.getItem(patient + '_4'),localStorage.getItem(patient + '_5'),localStorage.getItem(patient + '_6')];
    for(i=1;i<7;i++)
        p[i-1].innerHTML = p[i-1].innerHTML + " <p>Resposta: <strong>" + answer[i-1] + "</strong></p>";
    
    patientSpan = document.getElementById("patient-name");
    patientSpan.innerHTML = patient;


    patientSpan = document.getElementById("agent-name");
    patientSpan.innerHTML = localStorage.getItem("login").toUpperCase();

    // alert(answer);
}

function insertPatient() {
    patient = document.getElementById("patient-name").value;
    patients = localStorage.getItem("patients");
    if(patients==null)
        patients = patient;
    else
        patients = patients + "_" + patient;
    localStorage.setItem("patient",patient);
    alert(patients);
    localStorage.setItem("patients",patients);
    window.location.href = "https://eupecric.github.io/ppsus/questao1.html";
}

function writePatient() {
    patientSpan = document.getElementById("patient-name");
    patientSpan.innerHTML = localStorage.getItem("patient").toUpperCase();
}

function verifyForm(currentQuestion) {
    var answer = [localStorage.getItem("1"), localStorage.getItem("2"), localStorage.getItem("3"), localStorage.getItem("4"), localStorage.getItem("5"), localStorage.getItem("6")];
    var navQuestion = [document.getElementById("nav-q1"), document.getElementById("nav-q2"), document.getElementById("nav-q3"), document.getElementById("nav-q4"), document.getElementById("nav-q5"), document.getElementById("nav-q6")];

    for(i=0;i<6;i++) {
        questionNumber = parseInt(i) + 1;
        if(i == (currentQuestion-1)) {
            navQuestion[i].innerHTML = "Questão " + questionNumber + '<br> <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>';
            if(answer[i]!=-1) {
                document.getElementById("label-" + answer[i]).style="background-color:#205077; font-weight:bold; color:#fff";
                document.getElementById("radio-" + answer[i]).checked=true;
            }
            navQuestion[i].style="color:#fff";
            break;
        }

        if(answer[i]==-1 || answer[i]==null) 
            navQuestion[i].innerHTML = "Questão " + questionNumber + '<br> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
        else {
            navQuestion[i].innerHTML = "Questão " + questionNumber + '<br> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
            // navQuestion[i].style="color:#4CAF50";
            navQuestion[i].style="color:#FFF";
        }
            navQuestion[i].className="six-col-grid active";
    }
    
    //Escreve nome do paciente
    writePatient();

    //Escreve nome do agente de saude no footer
    footer = document.getElementById("agent-name");
    footer.innerHTML = "<strong>PPSUS - Formulario 1<br>" +  localStorage.getItem("login").toUpperCase() + "<br><a href='#'>Logout</a></strong>";
}

function clearSelection() {
    radio = document.querySelectorAll(".opt-question");
    for(i=0; i<radio.length; i++) {
        radio[i].style = "background-color:#ddd; color:initial; font-weight: normal";
        radio[i].checked = false;
    }
}

function radioClick(answer) {
    clearSelection();
    label = document.getElementById("label-" + answer);
    label.style = "background-color:#205077; font-weight:bold; color:#fff";
}

function goTo(question) {
    navQ = document.getElementById("nav-q" + question);
    if(navQ.className.search("active")>-1)
        window.location.href = "https://eupecric.github.io/ppsus/questao" + question  + ".html";
}

function saveQuestion(question, answer) {
    var patient = localStorage.getItem('patient') + '_' + question;
    localStorage.setItem(patient, answer);
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

function printDiv(divName) {

    var printContents = document.getElementById(divName).innerHTML;
    w=window.open();
    w.document.write(printContents);
    w.print();
    w.close();
}