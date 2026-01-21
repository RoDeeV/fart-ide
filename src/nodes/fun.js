import { LiteGraph } from "litegraph.js";

export function registerFunNodes() {
    // --- 1. THE SOUND PLAYER ---
    function FartSoundNode() {
        this.addInput("Play", LiteGraph.ACTION);
        this.properties = { 
            url: "https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Fart+Sound+1&filename=mt/MTY4NDMzMDUxNjgzNDcw_7Y_2fU9_2b_2fWv0.mp3",
            volume: 0.5 
        };
        this.audio = new Audio(this.properties.url);
        
        this.addWidget("text", "URL", this.properties.url, (v) => { 
            this.properties.url = v; 
            this.audio.src = v; 
        });
    }
    FartSoundNode.title = "Sound Player";
    FartSoundNode.prototype.onAction = function() {
        this.audio.volume = this.properties.volume;
        this.audio.currentTime = 0;
        this.audio.play();
    };
    LiteGraph.registerNodeType("audio/fart_sound", FartSoundNode);

    // --- 2. THE AUTO-CLOCK (The "Fart Machine") ---
    function FartClockNode() {
        this.addOutput("Tick", LiteGraph.EVENT);
        this.properties = { interval: 2000 }; // 2 seconds
        this.last_time = 0;
        
        this.addWidget("number", "Interval (ms)", this.properties.interval, (v) => {
            this.properties.interval = v;
        });
    }
    FartClockNode.title = "Clock / Timer";
    FartClockNode.prototype.onExecute = function() {
        let now = Date.now();
        if (now - this.last_time > this.properties.interval) {
            this.triggerSlot(0);
            this.last_time = now;
        }
    };
    LiteGraph.registerNodeType("logic/clock", FartClockNode);
}