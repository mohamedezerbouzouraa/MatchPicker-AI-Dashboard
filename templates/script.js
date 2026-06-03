const matches = [
    { title: "France vs Argentina", time: "Dec 18, 16:00", img: "images/fa.jpg", video: "https://www.youtube.com/embed/4CFcTsGSUYk" },
    { title: "Man City vs Real Madrid", time: "May 17, 20:00", img: "images/rm.avif", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Club Africain vs TP Mazembe", time: "Feb 02, 14:00", img: "images/ct.jpg", video: "https://www.youtube.com/embed/EwugWWeRX_Q" },
    { title: "Arsenal vs Bayern", time: "May 17, 16:00", img: "images/ba.jpg", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "PSG vs Barcelona", time: "Dec 18, 16:00", img: "images/pf.webp", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Esperance vs Al Ahly", time: "Nov 09, 20:00", img: "images/ea.jpg", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Liverpool vs Milan", time: "May 17, 16:00", img: "images/ml.jpg", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Chelsea vs Inter", time: "May 17, 20:00", img: "images/ci.webp", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Brazil vs Germany", time: "July 12, 19:00", img: "images/bg.jpg", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Tunisia vs Morocco", time: "Aug 14, 20:00", img: "images/tm.jpg", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Portugal vs Spain", time: "June 16, 18:00", img: "images/ps.avif", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Real Madrid vs Bayern", time: "May 17, 20:00", img: "images/rb2.jpg", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Barcelona vs Juventus", time: "May 25, 21:00", img: "images/bj.webp", video: "https://www.youtube.com/embed/VIDEO_ID" },
    { title: "Tottenham vs Man United", time: "Dec 01, 15:00", img: "images/zzz.avif", video: "https://www.youtube.com/embed/VIDEO_ID" }
];

const container = document.getElementById("matches");
function displayMatches() {
    if(!container) return;
    container.innerHTML = ""; 
    matches.forEach(m => {
        const div = document.createElement("div");
        div.className = "match-card";
        div.innerHTML = `
            <img src="${m.img}" alt="${m.title}" onerror="this.src='https://via.placeholder.com/150'">
            <h4>${m.title}</h4>
            <p>${m.time}</p>
        `;
        div.onclick = () => openModal(m);
        container.appendChild(div);
    });
}

function openModal(match) {
    const modal = document.getElementById("modal");
    document.getElementById("modalTitle").innerText = match.title;
    document.getElementById("videoFrame").src = match.video;
    modal.style.display = "flex"; 
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("videoFrame").src = ""; 
}

async function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const userText = input.value.trim();
    
    if (!userText) return;

    input.value = "";
    chat.innerHTML += `
        <div style="margin: 10px 0; text-align: right;">
            <span style="background: #8b5cf6; padding: 10px 15px; border-radius: 15px 15px 0 15px; color: white; display: inline-block;">
                <b>You:</b> ${userText}
            </span>
        </div>`;
    
    chat.scrollTop = chat.scrollHeight;

    try {
        const response = await fetch("http://localhost:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userText }) 
        });

        const data = await response.json();

        chat.innerHTML += `
            <div style="margin: 10px 0; text-align: left;">
                <span style="background: rgba(255,255,255,0.05); border: 1px solid rgba(139, 92, 246, 0.3); padding: 10px 15px; border-radius: 15px 15px 15px 0; color: #fff; display: inline-block;">
                    <b style="color: #8b5cf6;">AI:</b> ${data.reply}
                </span>
            </div>`;
    } catch (error) {
        chat.innerHTML += `<p style="color: #ff4d4d; font-size: 14px;"><b>System:</b> Connection to server failed. Make sure server.py is running!</p>`;
    }
    
    chat.scrollTop = chat.scrollHeight;
}

// Support for "Enter" key
document.getElementById("userInput")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

window.onload = displayMatches;
