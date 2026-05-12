
function showSection(id){
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function saveDaily(){
    const hours = document.getElementById("studyHours").value;
    const topic = document.getElementById("todayTopic").value;
    const notes = document.getElementById("debugNotes").value;

    if(hours === "" || topic === ""){
        alert("Enter study hours and topic.");
        return;
    }

    const log = {
        hours,
        topic,
        notes,
        date: new Date().toLocaleDateString()
    };

    let logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];
    logs.push(log);

    localStorage.setItem("dailyLogs", JSON.stringify(logs));

    updateLogs();
    updateStats();

    document.getElementById("studyHours").value = "";
    document.getElementById("todayTopic").value = "";
    document.getElementById("debugNotes").value = "";
}

function updateLogs(){
    const container = document.getElementById("dailyLogs");
    container.innerHTML = "";

    let logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];

    logs.reverse().forEach(log => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <h3>${log.date}</h3>
            <p><strong>Hours:</strong> ${log.hours}</p>
            <p><strong>Topic:</strong> ${log.topic}</p>
            <p><strong>Debug Notes:</strong> ${log.notes}</p>
        `;

        container.appendChild(div);
    });
}

function updateStats(){
    let logs = JSON.parse(localStorage.getItem("dailyLogs")) || [];

    let totalHours = 0;

    logs.forEach(log => {
        totalHours += Number(log.hours);
    });

    document.getElementById("totalHours").innerText = totalHours;

    document.getElementById("completedProjects").innerText = 1;
}

updateLogs();
updateStats();
