import { song2 } from "../music/music.js";
var app = function () {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const contentMusic = $('.content');
    const heading = $('.heading');
    const cd = $('.cd');
    const cdThumb = $('.cd-thumb');
    const playMusic = $('.controls__playing');
    var isCurrent = 0;
    const audio = $('.audio__music');
    const titleSong = $('.heading__song');
    const progress = $('#progress');
    const nextBtn = $('.controls__next');
    const prevBtn = $('.controls__prev');
    const randomBtn = $('.controls__random');
    const repeatBtn = $('.controls__repeat');
    const key = 'MY_SONG';
    var isRandom = false;
    var isRepeat = false;
    const config = JSON.parse(localStorage.getItem(key)) || {};

    function setConfig(keyCurrent, value) {
        config[keyCurrent] = value;
        localStorage.setItem(key,JSON.stringify(config));
    }
    function render() {
        var arrHtml = song2.map(function (content, index) {
            return ` <div class="category category-${index}" data-id=${index}>
                <img src="${content.image}" 
                alt="Singer" class="category__img">
                <div class="wrap">
                    <h3 class="category__song">${content.name}</h3>
                    <p class="category__singer">${content.singer}</p>
                </div>
            </div>`
        });
        var html = arrHtml.join('\n');
        contentMusic.innerHTML = html;
    }

    function currentSong(index) {
        titleSong.innerText = song2[index].name;
        audio.src = song2[index].path;
        cdThumb.style.backgroundImage = `url('${song2[index].image}')`;
        var categoryCurrent = $('.category-' + index);
        categoryCurrent.classList.add('active');
        var categoryActive = $('.content .active');
        setTimeout(function () {
            if (index === 0 || index === 1) {
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
    }
    var isPlaying = false;
    const pauseBtn = $('.controls__pause');
    function handlerCode() {
        var currentHeight = cd.offsetWidth;
        document.onscroll = function () {
            var moveHeight = document.documentElement.scrollTop || window.scrollY;
            cd.style.width = (currentHeight - moveHeight) > 0 ? (currentHeight - moveHeight) + 'px' : 0;
            cd.style.opacity = (currentHeight - moveHeight) / currentHeight;
        }
        playMusic.onclick = function () {
            if (!isPlaying) {
                audio.play();

            }
        }
        pauseBtn.onclick = function () {
            if (isPlaying) {
                audio.pause();

            }
        }
        audio.onplay = function () {
            isPlaying = true;
            heading.classList.add('player');
            rotateDish.play();
        }
        audio.onpause = function () {
            isPlaying = false;
            heading.classList.remove('player');
            rotateDish.pause();
        }
        const rotateDish = cdThumb.animate(
            [{ transform: 'rotate(360deg)' }],
            {
                duration: 10000,
                iterations: Infinity,
            }
        )
        rotateDish.pause();
        // run progress
        audio.ontimeupdate = function () {
            var timeNow = audio.currentTime;
            var timeEnd = audio.duration;
            var timePercent = Math.floor(timeNow / timeEnd * 100);
            progress.value = timePercent ? timePercent : 0;
        }
        // change progress bar
        progress.oninput = function () {
            var timeCurrent = progress.value * audio.duration / 100;
            audio.currentTime = timeCurrent ? timeCurrent : 0;
        }
        // click random button
        randomBtn.onclick = function () {
            isRandom = !isRandom;
            randomBtn.classList.toggle('active', isRandom);
            setConfig('isRandom' , isRandom);
        }
        // next button
        nextBtn.onclick = function () {

            render();
            if (isRandom) {
                handlerRandom();
            }
            else {
                handlerNext();
            }

            audio.play();

        }
        prevBtn.onclick = function () {
            render();
            if (isRandom) {
                handlerRandom();
            }
            else {
                handlerprev();
            }
            audio.play();
        }
        function handlerRandom() {
            var randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * song2.length);
            } while (randomIndex === isCurrent);
            isCurrent = randomIndex;
            currentSong(isCurrent);
        }
        function handlerNext() {
            isCurrent++;
            if (isCurrent >= song2.length) {
                isCurrent = 0;
            }
            currentSong(isCurrent);
        }
        function handlerprev() {
            isCurrent--;
            if (isCurrent < 0) {
                isCurrent = song2.length - 1;
            }
            currentSong(isCurrent);
        }
        repeatBtn.onclick = function () {
            isRepeat = !isRepeat;
            repeatBtn.classList.toggle('active', isRepeat);
            setConfig('isRepeat' , isRepeat);

        }
        audio.onended = function () {
            if (isRepeat) {
                audio.play();
            } else {

                nextBtn.click();
            }
        }
    }
    function reLoad(){
        isRandom = config.isRandom;
        isRepeat = config.isRepeat;
    }
    function changeSong() {
        contentMusic.onclick = function (e) {
            var categoryChange = e.target.closest('.category:not(.active)');
            if (categoryChange) {
                isCurrent = Number(categoryChange.dataset.id);
                render()
                currentSong(isCurrent);
                audio.play();
            }
        }

    }


    function start() {
        render();
        reLoad();
        handlerCode();
        currentSong(isCurrent);
        changeSong();
        repeatBtn.classList.toggle('active', isRepeat);
        randomBtn.classList.toggle('active', isRandom);
    }
    start();
}
app();

/**
 * - Chú ý thứ nhất ở hàm songChange thì chọn thẻ category mà không active
 * kiểm tra nếu đúng thì từ đối tượng category không active ấy lấy ra dataset
 * - Chú ý thứ hai ở localStorage thì đầu tiên tạo đối tượng lấy getItem và chuyển về JSON.parse nếu không tồn tại
 * thì gán cho đối tượng một object rỗng. Gán giá trị object[key] = value và lưu localStorage.setItem( key, object);
 * 
 * có thể xóa localStorage bằng localStorage.clear();
 */
