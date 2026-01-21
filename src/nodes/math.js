import { LiteGraph } from "litegraph.js";

export function registerMathNodes() {
    function FartMult() {
        this.addInput("A", "number");
        this.addInput("B", "number");
        this.addOutput("Result", "number");
    }

    FartMult.title = "Multiply";
    
    FartMult.prototype.onExecute = function() {
        let valA = this.getInputData(0) ?? 0;
        let valB = this.getInputData(1) ?? 1;
        this.setOutputData(0, valA * valB);
    };

    LiteGraph.registerNodeType("math/multiply", FartMult);
}