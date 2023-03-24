class Music {
    constructor() {
        this.musiques = [
            new Audio('./musique/imagine_dragon.mp3'),
            new Audio('./musique/9 Billie Eilish - bad guy.mp3'),
            new Audio('./musique/08. - Tones and I - Dance Monkey.mp3'),
        ]
        this.covers = [
            "./img/R.jpg",
            "./img/OIP.jpg",
            "./img/0010020411_800.jpg"
        ]
        this.title = [
            "Imagine Dragons - Bad Liar",
            "Billie Eilish - bad guy",
            "Tones and I - Dance Monkey"
        ]

        this.current = 0
        this.onplay = false

        

    }


    play() {
        this.musiques[Math.abs(this.current)].play()
        this.startUpdate()
        this.onplay = true
    }


    pause() {
        this.musiques[Math.abs(this.current)].pause()
        this.onplay = false
        this.stopUpdate()

    }



    next() {
        if (this.onplay) this.pause()
        this.current = (this.current + 1) % this.musiques.length
        console.log(this.current)
        this.update()
        this.musiques[Math.abs(this.current)].currentTime = 0
        this.play()
    }

    back() {
        if (this.onplay) this.pause()
        this.current = (this.current - 1) % this.musiques.length
        console.log(this.current)
        this.update()
        this.musiques[Math.abs(this.current)].currentTime = 0
        this.play()
    }


    update() {
        this.stopUpdate()
        $(".title h1").text(this.title[Math.abs(this.current)])
        $(".cover img").attr("src", this.covers[Math.abs(this.current)])
        $(".music-bar").val(0)
    }


    startUpdate() {
        var duration = this.musiques[Math.abs(this.current)].duration
        this.update_interval = setInterval(() => {
            var currentTime = this.musiques[Math.abs(this.current)].currentTime
            var remainingTime = duration - currentTime
            if (remainingTime <= 0) {
                clearInterval(this.update)
            }
            $(".music-bar").val(((duration - remainingTime) / duration * 1000))
            $(".timer-c p").text(this.formatTime(duration - remainingTime))
            $(".timer-p p").text(this.formatTime(remainingTime))
        }, 100)
    }

    stopUpdate() {
        clearInterval(this.update_interval)
    }

    formatTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }


    setUpdate(timer) {
        this.stopUpdate()
        console.log(timer)

        var duration = this.musiques[Math.abs(this.current)].duration
        this.musiques[Math.abs(this.current)].currentTime = Math.round(duration * timer)

        var currentTime = this.musiques[Math.abs(this.current)].currentTime
        var duration = this.musiques[Math.abs(this.current)].duration
        var remainingTime = duration - currentTime
        $(".timer-c p").text(this.formatTime(duration - remainingTime))
        $(".timer-p p").text(this.formatTime(remainingTime))
        this.startUpdate()
    }





}