import songs from './assets/music/music.js';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_PLAYER = 'TuanWeb_Player';
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playMusic = $('.btn-toggle-play');
const playPause = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const playList = $('.playlist');
const option = $('.option')
const app = {
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  currentIndex: 0,
  arrSong: [...songs],
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_PLAYER)) ||{},
  setconfig: function(key, value){
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_PLAYER , JSON.stringify(this.config));
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  render: function () {
    const htmls = this.arrSong.map(function (arr, index) {
      return ` <div class="song ${ index === app.currentIndex ? 'active':''}" data-id=${index} >
            <div class="thumb" style="background-image: url(${arr.image})">
            </div>
            <div class="body">
              <h3 class="title">${arr.name}</h3>
              <p class="author">${arr.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>`
    });
   playList.innerHTML = htmls.join('');
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.arrSong[this.currentIndex];
      }
    });
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.arrSong.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.arrSong.length - 1;
    }
    this.loadCurrentSong();
  },
  handler: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    // di chuyển chuột lên xuống
    document.onscroll = function () {
      var heightScroll = document.documentElement.scrollTop || window.scrollY;
      const newCd = cdWidth - heightScroll;
      cd.style.width = newCd > 0 ? newCd + 'px' : 0;
      cd.style.opacity = newCd / cdWidth;
    }
    // click vào nút play
    playMusic.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      }
      else {
        audio.play();
      }

    }
    // khi play
    audio.onplay = function () {
      _this.isPlaying = true;
      playPause.classList.add('playing');
      dishRotate.play();
    };

    // khi pause
    audio.onpause = function () {
      _this.isPlaying = false;
      playPause.classList.remove('playing');
      dishRotate.pause();
    };
    // thời gian bài hát
    audio.ontimeupdate = function () {
      if (this.duration) {
        const progressPercent = Math.floor(this.currentTime / this.duration * 100);
        progress.value = progressPercent;
      }
    };
    // thay đổi thời gian bài hát
    progress.oninput = function (e) {
      const seek = e.target.value * audio.duration / 100;
      audio.currentTime = seek;
    }
    // next song
    nextBtn.onclick = function () {
      if (_this.isRandom === true) {
        _this.randomSong();
      }
      else {
        _this.nextSong();
      }
      _this.render();
      _this.scrollToView();
      audio.play();
    }// prev song
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      }
      else {

        _this.prevSong();
      }
      _this.render();
      _this.scrollToView();
      audio.play();
    }
    // random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      _this.setconfig('isRandom' ,_this.isRandom );
      randomBtn.classList.toggle('active', _this.isRandom);
    }
    // khi kết thúc bài hát
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      }
      else {
        nextBtn.click();
      }
    };
    // khi repeat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setconfig('isRepeat' ,_this.isRepeat );
      repeatBtn.classList.toggle('active', this.isRepeat);
    };
    // chạm vào bài hat
    playList.onclick = function(e){
      const songNode = e.target.closest('.song:not(.active)');
      if( songNode || e.target.closest('.option')){
          // if là song
          if(songNode){
            _this.currentIndex = Number(songNode.dataset.id);
            _this.loadCurrentSong();
            _this.render();
            audio.play();
          }
          // if opotion
          if(e.target.closest('.option')){
           
          }
      }
    };
    
    // dish around
    const dishRotate = cdThumb.animate([
      { transform: 'rotate(360deg)' }
    ], {
      duration: 10000,
      iterations: Infinity,
    }
    );
    dishRotate.pause();
  },
  randomSong: function () {
    var newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.arrSong.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  // Xử lý khi repeat

  
  scrollToView: function(){
    if(this.currentIndex === 0 || this.currentIndex === 1 || this.currentIndex === 2)
    {
      setTimeout(function(){
        $('.song.active').scrollIntoView({
          behavior: "smooth",
          block: "center",
  
        });
      },500);
    }
    else{
      setTimeout(function(){
        $('.song.active').scrollIntoView({
          behavior: "smooth",
          block: "nearest",
  
        });
      },500);
    }
    
  },
  reload: function(){
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  start: function () {
    // tạo event
    this.handler();
    // định nghĩa thuộc tính cho object
    this.defineProperties();
    // đưa thông tin bài hát hiện tại lên UI
    this.loadCurrentSong();
    // load lại trang khi khởi động
    this.reload();
    // render playlist
    this.render();
    // active isRandom , isRepeat
    randomBtn.classList.toggle('active',this.isRandom);
    repeatBtn.classList.toggle('active', this.isRepeat)
  },
};
app.start();
console.log(Math.random())

