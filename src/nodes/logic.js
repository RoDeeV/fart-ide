import { LiteGraph } from "litegraph.js";

export function registerIONodes() {
    
    // 1. The "Hello World" Source (String Node)
    function FartString() {
        this.addOutput("Value", "string");
        this.addProperty("text", "hello world");
        // Create a text box on the node itself
        this.addWidget("text", "Text", this.properties.text, (v) => {
            this.properties.text = v;
        });
    }
    FartString.title = "String";
    FartString.prototype.onExecute = function() {
        this.setOutputData(0, this.properties.text);
    };

    // 2. The "Console.log" Sink (Log Node)
    function FartLog() {
        this.addInput("In", 0); // Type 0 accepts anything
    }
    FartLog.title = "Log to Console";
    FartLog.prototype.onExecute = function() {
        const data = this.getInputData(0);
        if (data !== undefined) {
            console.log("Fart IDE Output:", data);
        }
    };

function FartTriggerLog() {
    this.addInput("Msg", 0);
    this.addInput("Action", LiteGraph.ACTION); // The execution pulse
}

FartTriggerLog.prototype.onAction = function(action, param) {
    const data = this.getInputData(0);
    console.log("Fart IDE Triggered:", data);
};

LiteGraph.registerNodeType("io/trigger_log", FartTriggerLog);


    LiteGraph.registerNodeType("io/string", FartString);
    LiteGraph.registerNodeType("io/log", FartLog);
}