//© Zero - Código livre não comercial

let experienceStarted = false
let heartGenerationActive = true // Controla se novos corações devem ser gerados
const colors = [
  "#ff1493",
  "#ff3fa6",
  "#ff69b4",
  "#e75480",
  "#ff4f81",
  "#d72660",
  "#ff2d7a",
  "#ff5fa2",
  "#ff0080",
  "#ff85c0",
]

function isMobile() {
  return window.innerWidth <= 600
}

function randomBetween(a, b) {
  return a + Math.random() * (b - a)
}

function createHeart() {
  const heart = document.createElement("div")
  heart.className = "heart"
  const mobile = isMobile()
  const minSize = mobile ? 20 : 20
  const maxSize = mobile ? 48 : 80
  const size = randomBetween(minSize, maxSize)
  heart.style.width = `${size}px`
  heart.style.height = `${size * 0.9}px`
  heart.style.left = `${randomBetween(-10, 100)}vw`
  heart.style.bottom = `-60px`
  heart.style.opacity = randomBetween(0.3, 0.9)
  heart.style.zIndex = Math.floor(randomBetween(1, 3))
  heart.style.animationDuration = `${randomBetween(4, 10)}s`
  heart.style.animationDelay = `${randomBetween(0, 5)}s`

  const color = colors[Math.floor(Math.random() * colors.length)]
  const heartShape = document.createElement("div")
  heartShape.className = "heart-shape"
  heartShape.style.background = color
  heartShape.style.filter = `blur(${randomBetween(0, 3)}px)`

  heart.appendChild(heartShape)

  const wind = randomBetween(-180, 180)
  const sway1 = randomBetween(-90, 90)
  const sway2 = randomBetween(-120, 120)
  const sway3 = randomBetween(-90, 90)
  const sway4 = randomBetween(-150, 150)
  const rotate1 = randomBetween(-25, 25)
  const rotate2 = randomBetween(-45, 45)

  const animName = `floatUp_${Math.random().toString(36).substr(2, 8)}`
  const keyframes = `
    @keyframes ${animName} {
      0% {
        transform: translateX(0px) translateY(0) scale(${randomBetween(0.8, 1.2)}) rotate(${rotate1}deg);
        opacity: ${heart.style.opacity};
      }
      15% {
        transform: translateX(${sway1}px) translateY(-15vh) scale(${randomBetween(0.8, 1.2)}) rotate(${rotate2}deg);
      }
      30% {
        transform: translateX(${sway2}px) translateY(-30vh) scale(${randomBetween(0.8, 1.2)}) rotate(${rotate1}deg);
      }
      50% {
        transform: translateX(${sway3}px) translateY(-50vh) scale(${randomBetween(0.8, 1.2)}) rotate(${rotate2}deg);
      }
      70% {
        transform: translateX(${sway4}px) translateY(-70vh) scale(${randomBetween(0.8, 1.2)}) rotate(${rotate1}deg);
      }
      85% {
        transform: translateX(${wind}px) translateY(-95vh) scale(${randomBetween(0.8, 1.2)}) rotate(${rotate2}deg);
        opacity: ${heart.style.opacity};
      }
      100% {
        transform: translateX(${wind * 1.2}px) translateY(-110vh) scale(${randomBetween(0.8, 1.2)}) rotate(${rotate2}deg);
        opacity: 0;
      }
    }
  `
  const styleSheet = document.createElement("style")
  styleSheet.innerText = keyframes
  document.head.appendChild(styleSheet)

  heart.style.animationName = animName

  heart.addEventListener("animationend", () => {
    heart.remove()
    styleSheet.remove()
    if (experienceStarted && heartGenerationActive) createHeart()
  })

  heart.addEventListener("mouseenter", () => {
    heart.style.transition = "transform 0.2s cubic-bezier(.68,-0.55,.27,1.55), filter 0.2s"
    heart.style.transform += " scale(1.5)"
    heart.style.filter = "brightness(1.3) drop-shadow(0 0 12px #fff3)"
  })

  heart.addEventListener("mouseleave", () => {
    heart.style.transition = "transform 0.2s, filter 0.2s"
    heart.style.transform = heart.style.transform.replace(/scale$$1\.5$$/, "")
    heart.style.filter = ""
  })

  heart.addEventListener("click", (e) => {
    e.stopPropagation()
    explodeHeart(heart)
  })

  document.getElementById("hearts-container").appendChild(heart)
}

function explodeHeart(heart) {
  heart.style.transition = "transform 0.3s, opacity 0.3s"
  heart.style.transform += " scale(2) rotate(40deg)"
  heart.style.opacity = 0
  setTimeout(() => {
    heart.remove()
    if (experienceStarted && heartGenerationActive) createHeart()
  }, 300)
}

function startHearts() {
  const heartsContainer = document.getElementById("hearts-container")
  heartsContainer.classList.add("visible")

  const maxHearts = isMobile() ? 90 : 360
  let currentHearts = isMobile() ? 20 : 60
  const particlesPerInterval = isMobile() ? 4 : 14

  for (let i = 0; i < currentHearts; i++) {
    createHeart()
  }

  const interval = setInterval(
    () => {
      if (currentHearts < maxHearts && experienceStarted && heartGenerationActive) {
        createHeart()
        currentHearts++
      } else if (currentHearts >= maxHearts || !heartGenerationActive) {
        clearInterval(interval)
      }
    },
    isMobile() ? 60 : 30,
  )
}

function stopHeartGeneration() {
  heartGenerationActive = false
}

function startExperience() {
  experienceStarted = true

  const startScreen = document.getElementById("start-screen")
  startScreen.classList.add("hidden")

  // Iniciar música com fade in
  playBackgroundMusicWithFade()

  setTimeout(() => {
    startHearts()
  }, 300)

  setTimeout(() => {
    stopHeartGeneration()
  }, 10000)

  setTimeout(() => {
    loadAndAnimateTree()
  }, 15000)
}

function getURLParam(name) {
  const url = new URL(window.location.href)
  return url.searchParams.get(name)
}

function loadAndAnimateTree() {
  const container = document.getElementById("tree-container")
  container.classList.add("visible")

  fetch("Img/treelove.svg")
    .then((res) => res.text())
    .then((svgText) => {
      container.innerHTML = svgText
      const svg = container.querySelector("svg")
      if (!svg) return

      const allPaths = Array.from(svg.querySelectorAll("path"))
      allPaths.forEach((path) => {
        path.style.stroke = "#222"
        path.style.strokeWidth = "2.5"
        path.style.fillOpacity = "0"
        const length = path.getTotalLength()
        path.style.strokeDasharray = length
        path.style.strokeDashoffset = length
        path.style.transition = "none"
      })

      setTimeout(() => {
        allPaths.forEach((path, i) => {
          path.style.transition = `stroke-dashoffset 1.2s cubic-bezier(.77,0,.18,1) ${i * 0.08}s, fill-opacity 0.5s ${0.9 + i * 0.08}s`
          path.style.strokeDashoffset = 0
          setTimeout(
            () => {
              path.style.fillOpacity = "1"
              path.style.stroke = ""
              path.style.strokeWidth = ""
            },
            1200 + i * 80,
          )
        })

        const totalDuration = 1200 + (allPaths.length - 1) * 80 + 500
        setTimeout(() => {
          svg.classList.add("move-and-scale")
          setTimeout(() => {
            showDedicationText()
            startFloatingObjects()
          }, 1200)
        }, totalDuration)
      }, 50)

      const heartPaths = allPaths.filter((el) => {
        const style = el.getAttribute("style") || ""
        return style.includes("#FC6F58") || style.includes("#C1321F")
      })
      heartPaths.forEach((path) => {
        path.classList.add("animated-heart")
      })
    })
}

function showDedicationText() {
  let text = getURLParam("text")
  if (!text) {
    text = `No fundo, eu só queria um sentimento recíproco, um passo simples que fosse de amizade até amor.
Entretanto, contigo encontrei algo que nem toda reciprocidade do mundo ousaria alcançar:
uma riqueza rara, como achar um rubi perdido em meio à imensidão.

Pois encontrei um coração que teme a Deus, que ora por mim, que fala com o céu sobre minhas causas.
E, afinal, existe algo mais prazeroso do que saber que alguém se ajoelha e lembra de mim diante d’Ele?
Essa convicção aquece a minha alma.

Só Deus sabe o quanto isso se tornou vital.
Minha gratidão é tamanha que se torna impossível traduzi-la em palavras.
Fran, talvez eu não tenha deixado claro o suficiente…

Mas seria pedir demais querer você pelo resto da vida?

Ok, ok, ok, já sei: acabei saindo da margem da linha.
Mas é que você me dá essa vontade insana de querer ver os próximos capítulos.

Assim, você desperta em mim a mais paradoxal e violenta vontade de escrever poesias de amor.
Acordo e penso: mais um dia, mais uma chance de esperar sua mensagem,
e me apaixonar outra vez — só porque você é você.

É mania de poeta inventar razões para poetizar,
rabiscando versos em cadernos, esperando o nome certo para dedicar.

E, inocentemente, percebi:
você é a maior loucura que ousei desejar na minha vida.

Eu era eu… até você chegar.
E, desde então, já não sei mais.

Você é a razão da minha loucura, e a saudade diária do seu sorriso é absurda.

Na real, você é um belo de um absurdo.
É a junção de todos os fatores que altera qualquer que seja o produto.

E, se nossas histórias se entrelaçarem como versos num mesmo poema, quero que saiba:
não é só a loucura que me prende a você, mas também a paz escondida no seu olhar.
Porque amor não é apenas fogo, é também abrigo.
E, no meio da tempestade que você desperta em mim, descobri que é ao seu lado que eu gostaria de aprender a calma,
de viver os dias simples, de transformar o sempre em eternidade.`
  } else {
    text = decodeURIComponent(text).replace(/\\n/g, "\n")
  }
  const container = document.getElementById("dedication-text")
  container.classList.add("typing")

  // CONFIG: ajuste esses valores para alterar a velocidade
  const TYPING_SPEED = 10   // ms por caractere (menor = mais rápido)
  const NEWLINE_DELAY = 150 // ms extra após '\n'

  let i = 0
  function type() {
    if (i <= text.length) {
      container.textContent = text.slice(0, i)
      i++
      setTimeout(type, text[i - 2] === "\n" ? NEWLINE_DELAY : TYPING_SPEED)
    }
  }
  type()
}

function showSignature() {
  const dedication = document.getElementById("dedication-text")
  let signature = dedication.querySelector("#signature")
  if (!signature) {
    signature = document.createElement("div")
    signature.id = "signature"
    signature.className = "signature"
    dedication.appendChild(signature)
  }
  const firma = getURLParam("firma")
  signature.textContent = firma ? decodeURIComponent(firma) : "Com amor, Zero"
  signature.classList.add("visible")
}

function startFloatingObjects() {
  const container = document.getElementById("floating-objects")
  let count = 0
  function spawn() {
    const el = document.createElement("div")
    el.className = "floating-petal"
    el.style.left = `${Math.random() * 90 + 2}%`
    el.style.top = `${100 + Math.random() * 10}%`
    el.style.opacity = 0.7 + Math.random() * 0.3
    container.appendChild(el)

    const duration = 6000 + Math.random() * 4000
    const drift = (Math.random() - 0.5) * 60
    setTimeout(() => {
      el.style.transition = `transform ${duration}ms linear, opacity 1.2s`
      el.style.transform = `translate(${drift}px, -110vh) scale(${0.8 + Math.random() * 0.6}) rotate(${Math.random() * 360}deg)`
      el.style.opacity = 0.2
    }, 30)

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el)
    }, duration + 2000)

    if (count++ < 32) setTimeout(spawn, 350 + Math.random() * 500)
    else setTimeout(spawn, 1200 + Math.random() * 1200)
  }
  spawn()
}

function playBackgroundMusicWithFade() {
  const audio = document.getElementById("bg-music")
  if (!audio) return

  let musicaParam = getURLParam("musica")
  if (musicaParam) {
    musicaParam = decodeURIComponent(musicaParam).replace(/[^\w\d .-]/g, "")
    audio.src = "Music/" + musicaParam
  }

  const youtubeParam = getURLParam("youtube")
  if (youtubeParam) {
    let helpMsg = document.getElementById("yt-help-msg")
    if (!helpMsg) {
      helpMsg = document.createElement("div")
      helpMsg.id = "yt-help-msg"
      helpMsg.style.position = "fixed"
      helpMsg.style.right = "18px"
      helpMsg.style.bottom = "180px"
      helpMsg.style.background = "rgba(255,255,255,0.95)"
      helpMsg.style.color = "#e60026"
      helpMsg.style.padding = "10px 16px"
      helpMsg.style.borderRadius = "12px"
      helpMsg.style.boxShadow = "0 2px 8px #e6002633"
      helpMsg.style.fontSize = "1.05em"
      helpMsg.style.zIndex = 100
      helpMsg.innerHTML =
        "Para usar música do YouTube, baixe o áudio (por exemplo, usando y2mate, 4K Video Downloader, etc.), coloque na pasta <b>Music</b> e use a URL assim:<br><br><code>?musica=nome.mp3</code>"
      document.body.appendChild(helpMsg)
      setTimeout(() => {
        if (helpMsg) helpMsg.remove()
      }, 15000)
    }
  }

  let btn = document.getElementById("music-btn")
  if (!btn) {
    btn = document.createElement("button")
    btn.id = "music-btn"
    btn.textContent = "🔊 Música"
    document.body.appendChild(btn)
  }

  audio.volume = 0
  audio.loop = true

  audio
    .play()
    .then(() => {
      let vol = 0
      const fadeIn = setInterval(() => {
        if (vol < 0.7) {
          vol += 0.05
          audio.volume = Math.min(vol, 0.7)
        } else {
          clearInterval(fadeIn)
        }
      }, 100)
      btn.textContent = "🔊 Música"
    })
    .catch(() => {
      btn.textContent = "▶️ Música"
    })

  btn.onclick = () => {
    if (audio.paused) {
      audio.play()
      let vol = audio.volume
      const fadeIn = setInterval(() => {
        if (vol < 0.7) {
          vol += 0.05
          audio.volume = Math.min(vol, 0.7)
        } else {
          clearInterval(fadeIn)
        }
      }, 100)
      btn.textContent = "🔊 Música"
    } else {
      let vol = audio.volume
      const fadeOut = setInterval(() => {
        if (vol > 0) {
          vol -= 0.05
          audio.volume = Math.max(vol, 0)
        } else {
          clearInterval(fadeOut)
          audio.pause()
        }
      }, 100)
      btn.textContent = "🔈 Música"
    }
  }
}

// Event listener para o botão inicial
document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn")
  if (startBtn) {
    startBtn.addEventListener("click", startExperience)
  }
})
