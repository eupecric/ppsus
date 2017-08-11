function intializateAnswers(form_number) {
    if(form_number==1) {
        localStorage.setItem("1_1", -1);
        localStorage.setItem("2_1", -1);
        localStorage.setItem("3_1", -1);
        localStorage.setItem("4_1", -1);
        localStorage.setItem("5_1", -1);
        localStorage.setItem("6_1", -1);
    }
    else {
        localStorage.setItem("1_2", -1);
        localStorage.setItem("2a_2", -1);
        localStorage.setItem("2b_2", -1);
        localStorage.setItem("3_2", -1);
        localStorage.setItem("4_2", -1);
        localStorage.setItem("5a_2", -1);
        localStorage.setItem("5b_2", -1);
        localStorage.setItem("6_2", -1);
        localStorage.setItem("7_2", -1);
        localStorage.setItem("8_2", -1);
        localStorage.setItem("9_2", -1);
    }
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

function confirmForm(form_number) {
    var number_questions = 1;
    var p = [];
    var aux_p;
    aux_p = document.getElementById("p1");
    while(aux_p != null) {
        number_questions++;
        p.push(aux_p);
        aux_p = document.getElementById("p" + number_questions);
    }
    
    for(i=1;i<number_questions;i++)
        p[i-1].innerHTML = p[i-1].innerHTML + " <p>Resposta: <strong>" + localStorage.getItem(i + "_" + form_number) + "</strong></p>";

    writePatient();
    span = document.getElementById("agent-name");
    span.innerHTML = localStorage.getItem("login").toUpperCase();
}

function goConfirmFormPage(currentQuestion, form_number) { 
    var answer = document.querySelector('input[name="answer"]:checked');
    if(answer!=null) {
        saveQuestion(currentQuestion + "_" + form_number, answer.value);
        window.location.href="https://eupecric.github.io/ppsus/form" + form_number + "/confirma.html";
    }
    else
        alert("SELECIONE ALGUMA RESPOSTA PARA PROSSEGUIR");
}

function loadPatients() {
    var to_write = '<a href="#" class="active">Pacientes</a>';
    var patients = localStorage.getItem("patients");
    html_list = document.getElementById("patient-list");

    if(patients==null) { 
        html_list.innerHTML = "";
        return;
    }
    var patient = patients.split("_");
    for(i=0; i<patient.length; i++) {
        to_write = to_write + '<a href="https://eupecric.github.io/ppsus/respostas.html?patient=' + patient[i] + '">'+ patient[i] +'</a>';
    }
    html_list.innerHTML = to_write;
}

function submitForm() {
    // alert("Formulario enviado com sucesso!");
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

function insertPatient(form_number) {
    patient = document.getElementById("patient-name").value;
    patients = localStorage.getItem("patients");
    if(patients==null)
        patients = patient;
    else
        patients = patients + "_" + patient;
    localStorage.setItem("patient",patient);
    // alert(patients);
    localStorage.setItem("patients",patients);
    window.location.href = "https://eupecric.github.io/ppsus/form" + form_number + "/questao1.html";
}

function writePatient() {
    var patientSpan = document.getElementById("patient-name");
    var patient = localStorage.getItem("patient");
    if(patient!=null)
        patientSpan.innerHTML = patient.toUpperCase();
    else
        patientSpan.innerHTML = "NENHUM PACIENTE SELECIONADO";
}

function verifyForm(currentQuestion, form_number, part_form) {
    var answer;
    var navQuestion;
    var questions;
    var max;

    if(form_number==1) {
        answer = [localStorage.getItem("1_1"), localStorage.getItem("2_1"), localStorage.getItem("3_1"), localStorage.getItem("4_1"), localStorage.getItem("5_1"), localStorage.getItem("6_1")];
        navQuestion = [document.getElementById("nav-q1"), document.getElementById("nav-q2"), document.getElementById("nav-q3"), document.getElementById("nav-q4"), document.getElementById("nav-q5"), document.getElementById("nav-q6")]; 
        questions = ['1','2','3','4','5','6'];
        max = 6;
    }
    else {
        if(part_form==1) {
            answer = [localStorage.getItem("1_2"), localStorage.getItem("2a_2"), localStorage.getItem("2b_2"), localStorage.getItem("3_2"), localStorage.getItem("4_2")];
            navQuestion = [document.getElementById("nav-q1"), document.getElementById("nav-q2a"), document.getElementById("nav-q2b"), document.getElementById("nav-q3"), document.getElementById("nav-q4")];
            questions = ['1','2a','2b','3','4'];
            max = 5;
        }
        else {
            answer = [localStorage.getItem("5a_2"), localStorage.getItem("5b_2"), localStorage.getItem("6_2"), localStorage.getItem("7_2"), localStorage.getItem("8_2"), localStorage.getItem("9_2")];
            navQuestion = [document.getElementById("nav-q5a"), document.getElementById("nav-q5b"), document.getElementById("nav-q6"), document.getElementById("nav-q7"), document.getElementById("nav-q8"), document.getElementById("nav-q9")];
            questions = ['5a','5b','6','7','8','9'];
            max = 6;
        }
    }

    for(i=0;i<max;i++) {
        if(questions[i] == (currentQuestion)) {
            navQuestion[i].innerHTML = "Questão " + questions[i] + '<br> <span class="glyphicon glyphicon-triangle-top" aria-hidden="true"></span>';
            if(answer[i]!=-1) {
                var label = document.getElementById("label-" + answer[i].replace(" ", "_"));
                var radio = document.getElementById("radio-" + answer[i].replace(" ", "_"));
                alert(label);
                if(label!=null) {
                    if(form_number==1)
                        label.style="background-color:#205077; font-weight:bold; color:#fff";
                    else 
                        label.style="background-color:#1f7554; font-weight:bold; color:#fff";
                }
                if(radio!=null)
                    radio.checked=true;
            }
            navQuestion[i].style="color:#fff";
            break;
        }

        if(answer[i]==-1 || answer[i]==null) {
            navQuestion[i].innerHTML = "Questão " + questions[i] + '<br> <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';
        }
        else {
            navQuestion[i].innerHTML = "Questão " + questions[i] + '<br> <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
            // navQuestion[i].style="color:#4CAF50";
            navQuestion[i].style="color:#FFF";
        }
        
        if(form_number==1) 
            navQuestion[i].className="six-col-grid active";
        else {
        if(currentQuestion<=4)
            navQuestion[i].className="five-col-grid active";
        else    
            navQuestion[i].className="six-col-grid active";
        }
    }
    
    //Escreve nome do paciente
    writePatient();

    //Escreve nome do agente de saude no footer
    footer = document.getElementById("agent-name");
    var login = localStorage.getItem("login");
    if(login!=null)
        footer.innerHTML = "<strong>PPSUS - Formulario 1<br>" + login.toUpperCase() + "<br><a href='#'>Logout</a></strong>";
    else
        footer.innerHTML = "<strong>PPSUS - Formulario 1<br>No user logged";
}

function clearSelection(form_number) {
    radio = document.querySelectorAll(".opt-question");
    for(i=0; i<radio.length; i++) {
        if(form_number==1)
            radio[i].style = "background-color:#ddd; color:initial; font-weight: normal";
        else
            radio[i].style = "background-color:#d7e8e1; color:initial; font-weight: normal";
        radio[i].checked = false;
    }
}

function checkboxClick(answer) {
    label = document.getElementById("label-" + answer);
    label.style = "background-color:#1f7554; font-weight:bold; color:#fff";
}

function radioClick(answer, form_number) {
    clearSelection(form_number);
    label = document.getElementById("label-" + answer);
    if(form_number==1) {
        label.style = "background-color:#205077; font-weight:bold; color:#fff";
    }
    else {
        label.style = "background-color:#1f7554; font-weight:bold; color:#fff";
    }
}

function goTo(question, form_number) {
    navQ = document.getElementById("nav-q" + question);
    if(navQ.className.search("active")>-1)
        window.location.href = "https://eupecric.github.io/ppsus/form" + form_number +"/questao" + question  + ".html";
}

function saveQuestion(question, answer) {
    var patient = localStorage.getItem('patient') + '_' + question;
    localStorage.setItem(patient, answer);
    localStorage.setItem(question, answer);
}

function previousQuestion(btn, currentQuestion, form_number) {
    var answer = document.querySelector('input[name="answer"]:checked');
    if(answer!=null) {
        saveQuestion(currentQuestion, answer.value);
    }
    else
        saveQuestion(currentQuestion, -1);
    alert("https://eupecric.github.io/ppsus/form" + form_number + "/questao" + btn.value  + ".html");
    window.location.href = "https://eupecric.github.io/ppsus/form" + form_number + "/questao" + btn.value  + ".html";
}

function nextQuestion(btn, currentQuestion, form_number) {
    var answer = document.querySelector('input[name="answer"]:checked');
    if(answer!=null) {
        saveQuestion(currentQuestion + "_" + form_number, answer.value);
        alert("https://eupecric.github.io/ppsus/form" + form_number + "/questao" + btn.value  + ".html");
        window.location.href = "https://eupecric.github.io/ppsus/form" + form_number + "/questao" + btn.value  + ".html";
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

function upload_img() {
    $("#img_relogio").click();
}