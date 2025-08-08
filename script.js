let step = 1;
let floor = 0;
let hospital = "";
let surface = "";

function showQuestion() {
    const questionDiv = document.getElementById("question");
    const inputDiv = document.getElementById("inputArea");
    const resultDiv = document.getElementById("result");
    const image = document.getElementById("resultImage");

    resultDiv.innerHTML = "";
    image.style.display = "none";

    if (step === 1) {
        questionDiv.innerText = "1️⃣ How many floors is the building?";
        inputDiv.innerHTML = `
            <input type="number" id="floorInput" min="1" placeholder="e.g., 10">
            <button onclick="nextStep()">Next</button>
        `;
    } else if (step === 2) {
        questionDiv.innerText = "2️⃣ Is there a hospital nearby?";
        inputDiv.innerHTML = `
            <select id="hospitalInput">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <button onclick="nextStep()">Next</button>
        `;
    } else if (step === 3) {
        questionDiv.innerText = "3️⃣ What surface will you land on?";
        inputDiv.innerHTML = `
            <select id="surfaceInput">
                <option value="concrete">Concrete</option>
                <option value="grass">Grass</option>
                <option value="water">Water</option>
                <option value="mattress">Mattress</option>
                <option value="trampoline">Trampoline</option>
                <option value="banana peels">Banana Peels 🍌</option>
            </select>
            <button onclick="nextStep()">Check Fate</button>
        `;
    }
}

function nextStep() {
    if (step === 1) {
        const val = document.getElementById("floorInput").value;
        if (!val || val <= 0) return alert("Enter a valid floor number!");
        floor = parseInt(val);
        step++;
        showQuestion();
    } else if (step === 2) {
        hospital = document.getElementById("hospitalInput").value;
        step++;
        showQuestion();
    } else if (step === 3) {
        surface = document.getElementById("surfaceInput").value;
        showResult();
    }
}

function showResult() {
    const questionDiv = document.getElementById("question");
    const inputDiv = document.getElementById("inputArea");
    const resultDiv = document.getElementById("result");
    const image = document.getElementById("resultImage");

    questionDiv.innerText = "☠️ Your Fate:";
    inputDiv.innerHTML = "";

    let msg = "";
    let animation = "";
    let imageUrl = "";
    let death = false;

    if (floor >= 20 && surface === "concrete") {
        msg = "Flattened like a dosa on a tawa. RIP 💀";
        animation = "animate__fadeInDown";
        imageUrl = "doshaa.png.jpg";
        death = true;
    } else if (floor >= 5 && surface === "grass") {
        msg = "Almost survived... until the cow stepped on you 🐄";
        animation = "animate__bounceIn";
        imageUrl = "cow.png.jpg";
        death = true;
    } else if (floor <= 5 && surface === "mattress") {
        msg = "You bounced like a baby. Now go hug your pillow. 🛏️";
        animation = "animate__bounceIn";
        imageUrl = "bed.jpg";
    } else if (surface === "trampoline") {
        msg = "BOING! You bounced into someone’s wedding. Embarrassing but alive. 🎉";
        animation = "animate__bounce";
        imageUrl = "marriage.png.jpg";
    } else if (surface === "banana peels") {
        msg = "You slipped mid-air. Cartoon physics failed. 💫🍌";
        animation = "animate__rotateIn";
        imageUrl = "banana.png.jpg";
        death = true;
    } else if (surface === "water") {
        msg = "Splash! You lived but lost your pants. 🌊👖" ;
        animation ="animate__fadeInUpBig";
        imageUrl =  "water.png.jpg";
        death = floor > 10;
    } else {
        msg = "You lived… but with 48 broken bones and a ₹7 lakh hospital bill. 😬";
        animation = "animate__shakeX";
        imageUrl = "legbroke.png.jpg";
         
    }

    if (death && hospital === "no") {
        msg += " And guess what? No hospital nearby. Yikes. 😨";
    } else if (death && hospital === "yes") {
        msg += " Luckily a hospital nearby! Oh wait… you're still dead. 🏥💀";
    }

    resultDiv.innerText = msg;
    resultDiv.className = `animate__animated ${animation}`;

    image.src = imageUrl;
    image.style.display = "block";
    image.className = `result-img animate__animated ${animation}`;
}

showQuestion();
