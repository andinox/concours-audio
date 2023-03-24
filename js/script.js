$(() => {
    musique = new Music();

   

    $(".play-btn .bi").click(function (e) {
        if (audioContext == undefined) init(musique)
        stopvisal()
        visal(musique)
        if (e.target.classList.contains("bi")) {
            console.log("ddd")
            var btn = $(".play-btn .bi");
            if (btn.hasClass("bi-play")) {
                visal(musique)
                musique.play()
                btn.removeClass("bi-play")
                btn.addClass("bi-pause")
            } else {
                stopvisal()
                musique.pause()
                btn.addClass("bi-play")
                btn.removeClass("bi-pause")
            }
        }

    })




    $(".music-bar").on('input', function (e) {
        if (audioContext == undefined) init(musique)
        var pour_cent = $(this).val() / 1000
        musique.setUpdate(pour_cent)
        stopvisal()
        visal(musique)
    })


    $(".next-btn").click(() => {
        if (audioContext == undefined) init(musique)
        musique.next()
        stopvisal()
        visal(musique)
    })

    $(".back-btn").click(async() => {
        if (audioContext == undefined) init(musique)
        musique.back()
        stopvisal()
        visal(musique)
    })



    document.getElementById("cards").onmousemove = e => {
        for (const card of document.getElementsByClassName("card")) {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        };
    }



})

let animationId;
var MEDIA_ELEMENT_NODES = new WeakMap();
var analyser ;
var audioContext;

function init(music) {
    var audio = music.musiques;
    if (audioContext == undefined) audioContext = new AudioContext();
    analyser = audioContext.createAnalyser();
    for (m in audio) {
        source = audioContext.createMediaElementSource(audio[m]);
        MEDIA_ELEMENT_NODES.set(audio[m],source)
    }
}

function visal(music) {
    var audio = music.musiques[music.current];
    source = MEDIA_ELEMENT_NODES.get(audio);
    



    
    analyser.fftSize = 64;

    


    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);
    analyser.connect(audioContext.destination);


    const divs = document.querySelectorAll('.visualiser > div');

    function updateVisualizer() {
        analyser.getByteFrequencyData(dataArray);
        data = dataArray.reverse()
        for (let i = 32; i >= 0 ; i--) {
            const value = data[i];
            divs[i].style.height = `${ (value / 255 * 100)+2 }%`;
            
        }
        
        for (let e = 32; e < 64; e++) {
            const value = dataArray[63-e];
            divs[e].style.height = `${ (value / 255 * 100)+2 }%`;
            console.log(e)
        }
        document.querySelector(".cover").style.setProperty("--taille",`${Math.floor(average(dataArray)/255*20)}px`)
        animationId = requestAnimationFrame(updateVisualizer);
    }
    

    updateVisualizer();
}

function stopvisal() {
    cancelAnimationFrame(animationId)
}

function average(numbers) {
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const count = numbers.length;
    return sum / count;
  }
  
  