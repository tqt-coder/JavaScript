import { song2 } from '../music/music.js';
const app = document.querySelector('.app');
const content = app.querySelector('.content');
const headingSong = app.querySelector('.heading__song');
const audio = app.querySelector('.audio__music');
const cdThumb = app.querySelector('.cd-thumb');
const playing = app.querySelector('.controls__playing');
const heading = app.querySelector('.heading');
const pauseBtn = app.querySelector('.controls__pause');
const progress = app.querySelector('#progress');
const nextBtn = app.querySelector('.controls__next');
const prevBtn = app.querySelector('.controls__prev');
const randomBtn = app.querySelector('.controls__random');
const repeatBtn = app.querySelector('.controls__repeat');
const key = 'MY_MUSIC_TUAN_WEB';
const myMusic = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(key)) || {},
    setConfig: function (currentKey, value) {
        this.config[currentKey] = value;
        localStorage.setItem(key, JSON.stringify(this.config));
    },
    
    handlerNext: function () {
        this.currentIndex++;
        if (this.currentIndex >= song2.length) {
            this.currentIndex = 0;
        }
        this.currentSong(this.currentIndex);
    },
    handlerPrev: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = song2.length - 1;
        }
        this.currentSong(this.currentIndex);
    },
    handlerRandom: function () {
        var randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * song2.length);
        } while (randomIndex === this.currentIndex);
        this.currentIndex = randomIndex;
        this.currentSong(this.currentIndex);
    },
    songActive: function () {
        const categoryActive = app.querySelector('.category-' + this.currentIndex);
        categoryActive.classList.add('active');
        setTimeout(function () {
            if (this.currentIndex === 0 || this.currentIndex === 1) {
                categoryActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                })
            }
            else {
                categoryActive.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                })
            }

        }, 500);

    },
    handler: function () {
        const _this = this;
        content.onclick = function (e) {
            var song = e.target.closest('.category:not(.active)');
            if (song) {
                _this.currentIndex = Number(song.dataset.index);
                _this.currentSong(_this.currentIndex);
                _this.render();
                audio.play();
            }
        };
        var cd = app.querySelector('.cd');
        var cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            var currentWidth = window.scrollY || document.documentElement.scrollTop;
            cd.style.width = (cdWidth - currentWidth) > 0 ? (cdWidth - currentWidth) + 'px' : 0;
            cd.style.opacity = (cdWidth - currentWidth) / cdWidth;
        };
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
            _this.setConfig('isRandom', _this.isRandom);
        };
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
            _this.setConfig('isRepeat', _this.isRepeat);
        };
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            }
            else {
                nextBtn.click();
            }
        };
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.handlerRandom();
            }
            else {
                _this.handlerNext();
            }
            _this.render();
            audio.play();
        };
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.handlerRandom();
            }
            else {
                _this.handlerPrev();
            }
            _this.render();
            audio.play();
        }
        playing.onclick = function () {
            if (!_this.isPlaying) {
                audio.play();
            }
        }
        pauseBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            }
        };
        audio.onplay = function () {
            _this.isPlaying = true;
            heading.classList.add('player');
            rotateDisk.play();

        }
        audio.onpause = function () {
            _this.isPlaying = false;
            heading.classList.remove('player');
            rotateDisk.pause();

        };
        const rotateDisk = cdThumb.animate(
            [{ transform: 'rotate(360deg)' }],
            {
                duration: 10000,
                iterations: Infinity
            }
        );
        rotateDisk.pause();
        audio.ontimeupdate = function () {
            var timePercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress.value = timePercent ? timePercent : 0;
        }
        progress.oninput = function () {
            var timeSong = progress.value * audio.duration / 100;
            audio.currentTime = timeSong ? timeSong : 0;
        }

    },
    reload: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;

    },
    currentSong: function (index) {
        headingSong.innerHTML = song2[index].name;
        cdThumb.style.backgroundImage = `url('${song2[index].image}')`;
        audio.src = `${song2[index].path}`;
    },
    render: function () {
        const arrHtml = [...song2].map(function (song, index) {
            return `<div class="category category-${index}" data-index="${index}">
            <img src="${song.image}" 
            alt="Singer" class="category__img">
            <div class="wrap">
                <h3 class="category__song">${song.name}</h3>
                <p class="category__singer">${song.singer}</p>
            </div>
        </div>`
        });
        const html = arrHtml.join('\n');
        content.innerHTML = html;
        this.songActive(this.index);

    },
    start: function () {
        this.render();
        this.reload();
        this.currentSong(this.currentIndex);
        this.handler();
        repeatBtn.classList.toggle('active', this.isRepeat);
        randomBtn.classList.toggle('active', this.isRandom);

    }
}
myMusic.start();
