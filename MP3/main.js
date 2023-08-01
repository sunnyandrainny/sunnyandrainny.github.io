/**render songs 
 * scroll top
 * play/pause/seek
 * cd rotate
 * next/prev
 * random
 * next/repeat when ended
 * active song
 * scroll active song into view
 * play song when click*/ 

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'F8-PLAYER'
const playlist = $('.playlist')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')

const app = {
    currentIndex : 0,
    isPlaying: false,
    isRandom : false,
    isRepeat: false,
    playedIndexes: [],
    config : JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify( this.config))
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        this.currentIndex = this.config.currentIndex
        this.playedIndexes.push(this.config.currentIndex)
      },
    songs: [
        {
            name: 'À Lôi',
            singer: 'Double2T',
            path: './assets/music/song1.mp3',
            image: './assets/image/img1.jpg'
        },
        {
            name: 'Tại vì sao',
            singer: 'MCK',
            path: './assets/music/song2.mp3',
            image: './assets/image/img2.jpg'
        },
        {
            name: 'Bật tình yêu lên',
            singer: 'Hòa Minzy, Tăng Duy Tân',
            path: './assets/music/song3.mp3',
            image: './assets/image/img3.jpg'
        }, 
        {
            name: 'Một ngày chẳng nắng',
            singer: 'Pháo Northside',
            path: './assets/music/song4.mp3',
            image: './assets/image/img4.jpg'
        },
        {
            name: 'Phía sau em',
            singer: 'Kay Trần',
            path: './assets/music/song5.mp3',
            image: './assets/image/img5.jpg'
        },
        {
            name: 'Như những phút ban đầu',
            singer: 'Hoài Lâm',
            path: './assets/music/song6.mp3',
            image: './assets/image/img6.jpg'
        },
        {
            name: 'Giữa đại lộ đông tây',
            singer: 'Uyên Linh',
            path: './assets/music/song7.mp3',
            image: './assets/image/img7.jpg'
        },
        {
            name: 'Hương',
            singer: 'văn Mai Hương',
            path: './assets/music/song8.mp3',
            image: './assets/image/img8.jpg'
        },
        {
            name: 'Hoa Cỏ Lau',
            singer: 'Phong Max',
            path: './assets/music/song9.mp3',
            image: './assets/image/img9.jpg'
        },
        {
            name: 'Ghé vào tai',
            singer: 'Umie',
            path: './assets/music/song10.mp3',
            image: './assets/image/img10.jpg'
        }
    ],
    render: function(){
        const html = this.songs.map((song, index) =>{
            return `
            <div class="song ${index === this.currentIndex ? 'active' :''}" data-index = '${index}'>
      <div class="thumb" style="background-image: url('${song.image}')">
      </div>
      <div class="body">
        <h3 class="title">${song.name}</h3>
        <p class="author">${song.singer}</p>
      </div>
      <div class="option">
        <i class="fas fa-ellipsis-h"></i>
      </div>
    </div>
            `;
        })
        playlist.innerHTML = html.join('')
    },
    defineProperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })  
    },
    handleEvents: function(){

        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration: 10000,
            iterations: Infinity
        })
        cdThumbAnimate.pause()
        const _this = this
        const cdWidth = cd.offsetWidth
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            const newCDWidth = cdWidth - scrollTop

            cd.style.width = newCDWidth>0 ?newCDWidth + 'px' :0
            cd.style.opacity = newCDWidth/cdWidth
        }

        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            }else{
                audio.play()
            }
        }

        audio.onplay = function(){
            player.classList.add('playing')
            _this.isPlaying = true
            cdThumbAnimate.play()
        }
        audio.onpause = function(){
            player.classList.remove('playing')
            _this.isPlaying = false
            cdThumbAnimate.pause()
        }
        
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = audio.currentTime / audio.duration*100
                progress.value = progressPercent
            }
            
        }

        progress.oninput = function(e){
            const seekTime = audio.duration / 100*e.target.value
            audio.currentTime = seekTime
        }
        nextBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                 _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        prevBtn.onclick = function(){
            if(_this.isRandom){
                _this.randomSong()
            }else{
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }
        randomBtn.onclick = function(){
            _this.isRandom = !_this.isRandom
            randomBtn.classList.toggle('active', _this.isRandom)
        }
        repeatBtn.onclick = function(){
            _this.isRepeat = !_this.isRepeat
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }
        audio.onended = function(){
            if(_this.isRepeat){
                audio.play()
            }else{
                nextBtn.click()
            }
        }

        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')){
                if(songNode){
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
                if(e.target.closest('.option')){

                }
            }
        }
    },
    loadCurrentSong: function(){
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
        audio.src = this.currentSong.path
    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function(){
        this.currentIndex--
        if(this.currentIndex <= 0){
            this.currentIndex = this.songs.length-1
        }
        this.loadCurrentSong()
    },
    randomSong: function(){
        let newIndex
        do{
            newIndex = Math.floor(Math.random()* this.songs.length)
        }while(newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    scrollToActiveSong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            })
        },300)
    },
start: function(){
    this.defineProperties()
    this.handleEvents()
    this.loadCurrentSong()
    this.render()
}























//     render: function(){
//         const html = this.songs.map((song, index) => {
//             return `
//             <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
//             <div class="thumb" style="background-image: url('${song.image}')"></div>
//             <div class="body">
//                 <h3 class="title">${song.name}</h3>
//                 <p class="author">${song.singer}</p>
//             </div>
//             <div class="option">
//                 <i class="fas fa-ellipsis-h"></i>
//             </div>
//         </div>
//             `
//         })
//         playlist.innerHTML = html.join('')
//     },
//     defineProperties: function(){
//         Object.defineProperty(this, 'currentSong', {
//             get: function(){
//                 return this.songs[this.currentIndex]
//             }
//         })
//     },
//     handleEvents : function(){
//         const _this = this
//         // xử lý cd quay/dừng
//         const cdThumbAnimate = cdThumb.animate([
//             {transform: 'rotate(360deg)'}
//         ],{
//             duration: 10000,
//             iterations: Infinity
//         })
//         cdThumbAnimate.pause()
//         // xử lý phóng to/thu nhỏ cd
//         const cdWidth = cd.offsetWidth
//         document.onscroll = function(){
//             const scrollTop = window.scrollY || document.documentElement.scrollTop
//             const newCDWidth = cdWidth - scrollTop

//             cd.style.width = newCDWidth > 0 ?newCDWidth + 'px' :0
//             cd.style.opacity = newCDWidth/cdWidth
//         }

//         // xử lý khi click play
//         playBtn.onclick = function(){
//             if(_this.isPlaying){
//                 audio.pause()
//             }else{
//                 audio.play()
//             }
//         }
//         // khi song được play
//         audio.onplay = function(){
//             _this.isPlaying = true
//             player.classList.add('playing')
//             cdThumbAnimate.play()
//         }
//         // khi song bị pause
//         audio.onpause = function(){
//             _this.isPlaying = false
//             player.classList.remove('playing')
//             cdThumbAnimate.pause()
//         }
//         // khi tiến trình bài hát thay đổi
//         audio.ontimeupdate = function(){
//             if(audio.duration){
//                 const progressPercent = Math.floor(audio.currentTime/audio.duration*100)
//                 progress.value = progressPercent
//             }
//         }
//         // xử lý khi tua song
//         progress.oninput = function(e){
//             const seekTime = audio.duration/ 100*e.target.value
//             audio.currentTime = seekTime
//         }
//         // khi next song
//         nextBtn.onclick = function () {
//             if (_this.isRandom) {
//               _this.playRandomSong();
//             } else {
//               _this.nextSong();
//             }
//             audio.play();
//             _this.render()
//             _this.scrollToActiveSong()
//           };
//         // khi pre song
//         prevBtn.onclick = function () {
//             if (_this.isRandom) {
//               _this.playRandomSong();
//             } else {
//               _this.prevSong();
//             }
//             audio.play();
//             _this.render()
//             _this.scrollToActiveSong()
//           };
//         // xử lý bật/ tắt random song
//         randomBtn.onclick = function (e) {
//             _this.isRandom = !_this.isRandom;
//             _this.setConfig('isRandom', _this.isRandom)
//             randomBtn.classList.toggle("active", _this.isRandom);
//           };
//         // xử lý phát lại một song

//         repeatBtn.onclick = function(e){
//             _this.isRepeat = !_this.isRepeat
//             _this.setConfig('isRepeat', _this.isRepeat)
//             repeatBtn.classList.toggle('active', _this.isRepeat)
//         }
//         //   xử lý next song khi audio onended
//         audio.onended = function(){
//             if(_this.isRepeat){
//                 audio.play()
//             }else{
//             nextBtn.click()
//             }
//         }
//         // lắng nghe hành vi click vào playlist 
//         playlist.onclick = function (e) {
//             const songNode = e.target.closest(".song:not(.active)");
      
//             if (songNode || e.target.closest(".option")) {
//               // Xử lý khi click vào song
//               // Handle when clicking on the song
//               if (songNode) {
//                 _this.currentIndex = Number(songNode.dataset.index);
//                 _this.loadCurrentSong();
//                 _this.render();
//                 audio.play();
//               }
      
//               // Xử lý khi click vào song option
//               // Handle when clicking on the song option
//               if (e.target.closest(".option")) {
//               }
//             }
//           };
//         },
//     scrollToActiveSong: function(){
//         setTimeout(() => {
//             $('.song.active').scrollIntoView({
//                 behavior: 'smooth',
//                 block: 'end'
//             })
//         },300)
//     },

//     loadCurrentSong: function(){
//         heading.textContent = this.currentSong.name
//         cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
//         audio.src = this.currentSong.path
//     },
//     loadConfig: function(){
//         this.isRandom = this.config.isRandom
//         this.isRepeat = this.config.isRepeat
//     },
//     nextSong: function(){
//         this.currentIndex++
//         if(this.currentIndex >= this.songs.length){
//             this.currentIndex = 0
//         }
//         this.loadCurrentSong()
//     },
//     prevSong: function(){
//         this.currentIndex--
//         if(this.currentIndex< 0){
//             this.currentIndex = this.songs.length-1
//         }
//         this.loadCurrentSong()
//     },
//     playRandomSong: function () {
//         let newIndex
        
//         do {
//           newIndex = Math.floor(Math.random() * this.songs.length)
//         } while (this.playedIndexes.includes(newIndex))
//         this.playedIndexes.push(newIndex)
//         if (this.playedIndexes.length === this.songs.length) {
//           this.playedIndexes = []
//         }
//         this.currentIndex = newIndex
//         this.loadCurrentSong()
//       },
//     start: function(){
//         // gán cấu hình từ config vào ứng dụng
//         this.loadConfig()
//         // định nghĩa các thuộc tính cho object
//         this.defineProperties()
//         // lắng nghe/ xử lý các sự kiện (DOM events)
//         this.handleEvents()
//         // tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
//         this.loadCurrentSong()
//         // render playlist
//         this.render()
//         // hiển thị trạng thái ban đầu của button repeat và random
//         randomBtn.classList.toggle("active", this.isRandom);
//         repeatBtn.classList.toggle('active', this.isRepeat)
//     }
    
}

app.start()


