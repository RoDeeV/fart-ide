export function registerIONodes() {
    // 1. Console Log Node
    function FartLog() {
        this.addInput("Message", 0); // Type 0 is "any"
        this.addInput("Trigger", "boolean"); // Only log if this is true
    }
    FartLog.title = "Fart Log";
    FartLog.prototype.onExecute = function() {
        const msg = this.getInputData(0);
        const trigger = this.getInputData(1);
        if (msg !== undefined && trigger !== false) {
            console.log("Fart IDE Output:", msg);
        }
    };
    LiteGraph.registerNodeType("io/log", FartLog);

    // 2. Browser Alert Node
    function FartAlert() {
        this.addInput("Text", "string");
        this.addProperty("title", "Fart IDE says:");
    }
    FartAlert.title = "Alert Box";
    FartAlert.prototype.onExecute = function() {
        const text = this.getInputData(0);
        if (text) alert(`${this.properties.title}\n${text}`);
    };
    LiteGraph.registerNodeType("io/alert", FartAlert);
}