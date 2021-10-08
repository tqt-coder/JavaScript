import {song2} from './assets/music/music.js';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const keySourse = 'Tuấn làm web';
const nameSong = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const progressInput = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const playSong = $('.btn-toggle-play');
const player = $('.player');
const cd = $('.cd');
const playList = $('.playlist');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const app = {
    currentIndex: 0,
    songs: [...song2],
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    objectProperties: function(){
        Object.defineProperty(this , 'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]}
        });
    },
    config : JSON.parse(localStorage.getItem(keySourse)) || {},
    setConfig: function(key , value){
        this.config[key] = value;
        localStorage.setItem(keySourse, JSON.stringify(this.config));
    },
    loadSong: function(){
        
        // fetch data 
        nameSong.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage =  `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },
    handlerCoding: function(){
       const  _this = this;
       var lastLength = cd.offsetWidth;
        // scroll mouse
        document.onscroll = function(){            
            var newScroll = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
            var newWidth = lastLength - newScroll;
            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = cd.offsetWidth / lastLength;   
        };
        // press button play
        playSong.onclick = function(){
            _this.isPlaying = !_this.isPlaying;
            if( _this.isPlaying){
                audio.pause();
            }
            else{
                audio.play();
            }
            
        };
        audio.onplay = function(){
            player.classList.add('playing');
            animation.play();
        }
        audio.onpause = function(){
            player.classList.remove('playing');
            animation.pause();
        }
        // click next button
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }
            else{
                _this.nextSong();
            }
            // appear UI
            _this.render();
            _this.showSongUI();
            audio.play();
        };
        // click prev button
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong();
            }
            else{
                _this.prevSong();
            }
            _this.render();
            _this.showSongUI();
            audio.play();

        };
        // progress value
        audio.ontimeupdate = function(){
            let currentPercent = Math.floor(audio.currentTime / audio.duration * 100);
            progressInput.value = currentPercent >= 0 ? currentPercent : 0;
        };
        // progress when press time
        progressInput.oninput = function(){
            const timeNow = progressInput.value * audio.duration / 100;
            audio.currentTime = timeNow;
        }
        // press random
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
            _this.setConfig('isRandom' , _this.isRandom);
        }
        // ended song
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play();
            }
            else{
                nextBtn.click();
            }
        };
        // press repeat
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active');
            _this.setConfig('isRepeat' , _this.isRepeat);

        }  
        var animation = cdThumb.animate(
            [{transform: 'rotate(360deg)'}],
            {
                duration: 10000,
                iterations: Infinity,
            }
            
        );
        animation.pause();
        // choose song from list
        playList.onclick = function(e) {
          
            const songNode = e.target.closest('.song:not(.active)');
            if( songNode || !e.target.closest('.option'));
            {
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.location);
                    _this.loadSong();
                    _this.render();
                    audio.play();
                }
                
            }
        };
         
    },
   
    nextSong: function(){
        this.currentIndex ++;
        if( this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadSong();
    },
    prevSong: function(){
        this.currentIndex --;
        if( this.currentIndex < 0){
            this.currentIndex = this.songs.length -1;
        }
        this.loadSong();
    },
    randomSong: function(){
        let newIndex;
        do{
            newIndex = Math.floor( Math.random() * this.songs.length);
        }while( newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadSong();
    },
    // song appear UI
    showSongUI: function(){
        const viewSong = $('.song.active');
        if(this.currentIndex === 0 || this.currentIndex ===1){
            setTimeout(function(){
                viewSong.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });   
                },500);
        }
        else{
            setTimeout(function(){
                viewSong.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });   
                },500);
        }
    },
  
    render: function(){
        let html = '';
       
        const arrHtml = this.songs.map(function(song, index){
            return `<div class="song ${ index === app.currentIndex ? 'active':''}" data-location=${index}>
            <div class="thumb" style="background-image: url(${song.image})">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
        });
        html += arrHtml.join('\n');
        playList.innerHTML = html;
    },
    reload: function(){
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    start:  function(){
        // render code
        this.render();
        // define property
        this.objectProperties();
        // load current Song
        this.loadSong();
        // execute
        this.handlerCoding();
        this.reload();
        // storage
        randomBtn.classList.toggle('active', this.isRandom);
        repeatBtn.classList.toggle('active', this.isRepeat);
       
        
    }
};

app.start();


