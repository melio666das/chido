// Lógica para alternar tema oscuro (botón flotante) 
/* =========================
   🌙 MODO OSCURO
========================= */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  // cambia el icono
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

/* =========================
   🎤 BOTÓN FLOTANTE "ESCUCHAR"
========================= */
const listenBtn = document.getElementById("listenBtn");
const playerContainer = document.getElementById("playerContainer");

listenBtn.addEventListener("click", () => {
    listenBtn.classList.add("disappearing");
    
    setTimeout(() => {
        listenBtn.style.display = "none";
        playerContainer.classList.remove("hidden");
        playerContainer.classList.add("appearing");
        playerContainer.style.animation = "slideInUp 0.5s ease";
        
        setTimeout(() => {
            playerContainer.classList.remove("appearing");
        }, 500);
    }, 300);
});

document.getElementById("closePlayer").addEventListener("click", () => {
    playerContainer.classList.add("disappearing");
    
    setTimeout(() => {
        playerContainer.classList.add("hidden");
        playerContainer.classList.remove("disappearing");
        listenBtn.style.display = "flex";
        listenBtn.classList.remove("disappearing");
    }, 300);
});

/* =========================
   🎤 MOVER REPRODUCTOR
========================= */
const player = document.getElementById("playerContainer");
let isGrabbed = false;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

// Detectar si es mobile
const isMobile = () => window.innerWidth <= 768;

player.addEventListener("mousedown", (e) => {
    if (e.target.closest(".player-close-btn") || e.target.closest(".mfp-controls button")) {
        return;
    }
    
    // Solo permitir movimiento en desktop
    if (isMobile()) return;
    
    isGrabbed = true;
    player.classList.add("grabbed");
    startX = e.clientX - currentX;
    startY = e.clientY - currentY;
});

player.addEventListener("touchstart", (e) => {
    if (e.target.closest(".player-close-btn") || e.target.closest(".mfp-controls button")) {
        return;
    }
    
    // Solo permitir movimiento si NO es mobile o si está en posición alterada
    if (!isMobile() || currentX !== 0 || currentY !== 0) {
        isGrabbed = true;
        player.classList.add("grabbed");
        startX = e.touches[0].clientX - currentX;
        startY = e.touches[0].clientY - currentY;
    }
});

document.addEventListener("mousemove", (e) => {
    if (!isGrabbed || isMobile()) return;
    
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    
    player.style.position = "fixed";
    player.style.transform = `translate(${currentX}px, ${currentY}px)`;
    player.style.right = "auto";
    player.style.bottom = "auto";
    player.style.top = "0";
    player.style.left = "0";
    player.style.zIndex = "10000";
});

document.addEventListener("touchmove", (e) => {
    if (!isGrabbed) return;
    
    if (isMobile() && (currentX === 0 && currentY === 0)) {
        return; // No mover en mobile si está en posición normal
    }
    
    e.preventDefault();
    
    currentX = e.touches[0].clientX - startX;
    currentY = e.touches[0].clientY - startY;
    
    player.style.position = "fixed";
    player.style.transform = `translate(${currentX}px, ${currentY}px)`;
    player.style.right = "auto";
    player.style.bottom = "auto";
    player.style.top = "0";
    player.style.left = "0";
    player.style.zIndex = "10000";
}, { passive: false });

document.addEventListener("mouseup", () => {
    isGrabbed = false;
    player.classList.remove("grabbed");
});

document.addEventListener("touchend", () => {
    isGrabbed = false;
    player.classList.remove("grabbed");
});

/* =========================
   🎮 JUEGO (igual)
========================= */
function jugar() {
  const numero = document.getElementById("numero").value;
  const resultado = document.getElementById("resultado");

  const secreto = Math.floor(Math.random() * 10) + 1;

  if (!numero || numero < 1 || numero > 10) {
    resultado.innerHTML = "⚠️ Ingresa un número del 1 al 10";
    return;
  }

  if (parseInt(numero) === secreto) {
    resultado.innerHTML = "🎉 ¡Ganaste!";
  } else {
    resultado.innerHTML = "❌ Era " + secreto;
  }
}
let audio = document.getElementById("audio");
let current = 0;
let isPlaying = false;
let isRepeat = false;
let playlistOpen = false;

const playlist = [
    {
    title: "musica 1",
    artist: "no sirve",
    src: "musica/musica.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
    {
    title: "coqueta",
    artist: "Fuerza Regida y Grupo Frontera",
    src: "musica/coqueta.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "Chicago",
    artist: "Michael",
    src: "musica/chicago.mp3",
    cover: "https://picsum.photos/seed/2/200/200"
  },
  {
    title: "Morena",
    artist: "Los Felinos",
    src: "musica/morena.mp3",
    cover: "https://picsum.photos/seed/3/200/200"
  },
  {
    title: "Happy",
    artist: "Turles",
    src: "musica/happy.mp3",
    cover: "https://picsum.photos/seed/4/200/200"
  },
  {
    title: "Tu Falta De Querer",
    artist: "Mon Laferte",
    src: "musica/falta.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "Si Tú Me Quisieras",
    artist: "Mon Laferte",
    src: "musica/tu.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "Viento",
    artist: "Caifanes",
    src: "musica/viento.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "Afuera",
    artist: "Caifanes",
    src: "musica/afuera.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "La Célula Que Explota",
    artist: "Caifanes",
    src: "musica/celula.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "Los Dioses Ocultos",
    artist: "Caifanes",
    src: "musica/dioses.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "No Dejes Que...",
    artist: "Caifanes",
    src: "musica/dejes.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "Tu Falta De Querer",
    artist: "Mon Laferte",
    src: "musica/falta.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },{
    title: "Frances Limon",
    artist: "Enanitos Verdes",
    src: "musica/frances.mp3",
    cover: "https://picsum.photos/seed/1/200/200"
  },
  {
    title: "Amiga Mia",
    artist: "Michel Del Buenon",
    src: "musica/amiga-mia.mp3",
    cover: "https://picsum.photos/seed/5/200/200"
  },
];

/* =========================
   LOAD TRACK
========================= */
function loadTrack(){
    const t = playlist[current];

    audio.src = t.src;
    audio.load();

    document.getElementById("title").textContent = t.title;
    document.getElementById("artist").textContent = t.artist;

    document.getElementById("cover").style.backgroundImage = `url(${t.cover})`;

    playMusic();
}

/* =========================
   PLAY / PAUSE
========================= */
function toggleMusic(){
    if(audio.paused){
        playMusic();
    }else{
        audio.pause();
        isPlaying = false;
        updateUI();
    }
}

function playMusic(){
    audio.play();
    isPlaying = true;
    updateUI();
}

/* =========================
   NEXT / PREV
========================= */
function nextTrack(){
    current = (current + 1) % playlist.length;
    loadTrack();
}

function prevTrack(){
    current = (current - 1 + playlist.length) % playlist.length;
    loadTrack();
}

/* =========================
   REPEAT
========================= */
function toggleRepeat(){
    isRepeat = !isRepeat;
    document.getElementById("repeat").style.opacity = isRepeat ? "1" : "0.4";
}

/* =========================
   LISTA
========================= */
function toggleList(){
    playlistOpen = !playlistOpen;

    const panel = document.getElementById("playlistPanel");

    if(!playlistOpen){
        panel.classList.add("hidden");
        return;
    }

    panel.classList.remove("hidden");
    panel.innerHTML = "";

    playlist.forEach((t,i)=>{
        const btn = document.createElement("button");
        btn.textContent = `${t.title} - ${t.artist}`;

        if(i === current){
            btn.style.background = "#b26bff";
        }

        btn.onclick = () => {
            current = i;
            loadTrack();
        };

        panel.appendChild(btn);
    });
}

/* =========================
   PROGRESO
========================= */
setInterval(()=>{
    if(!audio.duration) return;

    document.getElementById("fill").style.width =
        (audio.currentTime / audio.duration) * 100 + "%";

    document.getElementById("cur").textContent = format(audio.currentTime);
    document.getElementById("dur").textContent = format(audio.duration);

},500);

function format(s){
    let m = Math.floor(s/60);
    let sec = Math.floor(s%60);
    return `${m}:${sec<10?"0":""}${sec}`;
}

/* =========================
   BARRA CLICK (ADELANTAR)
========================= */
document.getElementById("bar").addEventListener("click",(e)=>{
    const percent = e.offsetX / e.currentTarget.offsetWidth;
    audio.currentTime = percent * audio.duration;
});

/* =========================
   BOTONES
========================= */
document.getElementById("play").onclick = toggleMusic;
document.getElementById("next").onclick = nextTrack;
document.getElementById("prev").onclick = prevTrack;
document.getElementById("repeat").onclick = toggleRepeat;
document.getElementById("list").onclick = toggleList;

/* =========================
   AUTO NEXT / REPEAT
========================= */
audio.addEventListener("ended",()=>{
    if(isRepeat){
        playMusic();
    }else{
        nextTrack();
    }
});

/* =========================
   UI UPDATE (SPOTIFY PRO FIX)
========================= */
function updateUI(){

    const playBtn = document.getElementById("play");
    const cover = document.getElementById("cover");

    playBtn.textContent = isPlaying ? "⏸" : "▶";

    if(isPlaying){
        cover.classList.add("rotating");
    }else{
        cover.classList.remove("rotating");
    }

    document.getElementById("title").textContent = playlist[current].title;
    document.getElementById("artist").textContent = playlist[current].artist;
}

/* =========================
   INIT
========================= */
loadTrack();

// Asegura que haya una sección activa al cargar la página
if (!document.querySelector('.seccion.activa')) {
    const primeraSeccion = document.querySelector('.seccion');
    if (primeraSeccion) {
        primeraSeccion.classList.add('activa');
    }
}

/* =========================
   SECCIONES
========================= */
function mostrarSeccion(seccion){
    document.querySelectorAll(".seccion").forEach(sec=>{
        sec.classList.remove("activa");
    });
    const target = document.getElementById(seccion);
    if (target) {
        target.classList.add("activa");
    }
}
