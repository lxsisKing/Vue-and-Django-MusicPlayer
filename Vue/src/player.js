/* eslint-disable */
class Dispatcher {
    // 构造函数
    constructor() {
        this.handlers = [];
    }

    listen(handler) {
        
        this.handlers.push(handler);
    }

    emit(...args) {
        this.handlers.forEach(handler => {
            // 异步处理
            handler(...args);
        });
    }
}

class Player {
    constructor() {
        // 音频API
        // 音频上下文对象，相当于声音容器
        this.audioContext = new AudioContext()
        this.playList = []
        this.playIndex = 0
        this.indexNum = this.playIndex
        this.audio =  new Audio()
        /*
        this.emptyNode = {
            file: null,
            offset: 0,
            start: null,
            source: null,
            buffer: null
        }
        */
       this.emptyAddress = null

        this.onPlay = new Dispatcher()
        this.onPause = new Dispatcher()
        this.onChange = new Dispatcher()
        this.onReady = new Dispatcher()
    }
    // 读取音乐文件
    // async readAudioBuffer(file) {
    //     return new Promise((resolve, reject) => {
    //         const reader = new FileReader()
    //         reader.onload = async evt => {
    //             this.audioContext
    //                 // 用于异步解析 ArrayBuffer里的音乐文件。
    //                 .decodeAudioData(evt.target.result)
    //                 .then(resolve, reject)
    //         }
    //         reader.onerror = reject
    //         reader.readAsArrayBuffer(file)
    //     })
    // }
    // 添加音乐文件
    async append(musicAddress, musicName) {
        const isEmpty = this.isEmpty
        this.playList.push(
        //     {
        //     file,
        //     // 音乐播放的时间点
        //     offset: 0,
        //     // start为记录从创建音频数据开始到给start赋值的那一刻的时间
        //     start: null,
        //     source: null,
        //     buffer: await this.readAudioBuffer(file)
        // }
        {
            address: musicAddress,
            name: musicName
        }
        )

        // 添加音乐的时候。判断如果是第一次添加，则执行changeCover转换贴图
        if (isEmpty) {
            this.onReady.emit(this)
        }
        this.audio.src = this.playList["0"]["address"];
    }

    play() {
        // 播放列表为空，或者
        if (!this.playList.length) {
            return
        }
        // createBufferSource() 方法用于创建一个新的AudioBufferSourceNode接口, 
        // 该接口可以通过AudioBuffer 对象来播放音频数据。
        // 用于创建新的音频节点对象 AudioBufferSourceNode，来播放 AudioBuffer的音乐数据。
        /*
        const source = this.audioContext.createBufferSource()
        source.buffer = this.current.buffer
        source.onended = this.next.bind(this)
        source.connect(this.audioContext.destination)
        // 0代表马上开始播放
        // offset从音频的第几秒开始播放
        source.start(0, this.current.offset)
        this.current.source = source
        // currentTime代表AudioContext从创建开始到当前的时间
        this.current.start = this.audioContext.currentTime
        */

        if (this.indexNum == this.playIndex) {
            console.log(this.playList[this.playIndex])
            this.audio.play()
        } else {
            this.indexNum = this.playIndex
            this.audio.src = this.playList[this.playIndex]["address"];
            console.log(this.playList[this.playIndex])
            this.audio.play()
        }

        // 执行togglePlay()函数
        // 将isPlaying设置为true
        this.onPlay.emit(this)
    }

    pause() {
        if (!this.playList.length) {
            return
        }
        /*
        this.current.source.stop(0)
        this.current.source.disconnect(0)
        this.current.source.onended = null
        this.current.source = null
        // 获取当前播放的位置
        this.current.offset = this.position
        this.current.start = null
        */
        this.audio.pause()

        this.onPause.emit(this)
    }

    stop() {
        /*
        this.pause()
        this.current.offset = 0
        this.current.start = null
        */
       this.audio.currentTime = 0
       this.audio.pause()
    }

    // 下一首
    next() {
        this.stop()
        this.playIndex++
        if (this.playIndex >= this.playList.length) {
            this.playIndex = 0
        }
        this.play()
        this.onChange.emit(this)
    }

    // 上一首
    prev() {
        this.stop()
        this.playIndex--
        if (this.playIndex < 0) {
            this.playIndex = Math.max(this.playList.length - 1, 0)
        }
        this.play()
        this.onChange.emit(this)
    }

    // 判断列表中是否为空
    get isEmpty() {
        return this.current === this.emptyAddress
    }

    // 获取当前播放的歌曲
    get current() {
        // return a && b 如果a是true的话，返回b， 如果a是false的话，返回a
        // return a || b 如果a是true的话，返回a，如果a是false的话，返回b 。
        return this.playList[this.playIndex] || this.emptyAddress
    }

    
    get position() {
        if (!this.playList.length) {
            return 0;
        }
        // 主要作用就是在暂停的时候要取到当前播放的位置
        // 考虑到了需要减去中间暂停所花费的时间
        /*
        return (
            this.current.offset +
            (this.current.start !== null
                ? this.audioContext.currentTime - this.current.start
                : 0)
        )
        */
       return this.audio.currentTime
    }
    

    // 设置开始播放的位置
    set position(val) {
        if (!this.playList.length) {
            return
        }
        this.stop()
        this.current.offset = val
        this.current.start = null
        this.play()
    }
    
    get duration() {
        // 持续时间
        // return this.current.buffer ? this.current.buffer.duration : 0.001
        return this.audio.duration
    }

    get musicName() {
        if (typeof(this.playList[this.playIndex]) == "undefined"){
            return ""
        } else {
            return  this.playList[this.playIndex]["name"]
        }

    }
    
}

export const player = new Player()