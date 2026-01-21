import { LGraph, LGraphCanvas, LiteGraph } from "litegraph.js";
import { initSidebarSearch } from "./ui/sidebar.js";
// Import your node registration functions here
import { registerFunNodes } from "./nodes/fun.js";
import { registerMathNodes } from "./nodes/math.js";
import { registerIONodes } from "./nodes/io.js";
import { registerIONodes as registerLogicNodes } from "./nodes/logic.js";


// 1. Setup Global State
const graph = new LGraph();
const canvas = new LGraphCanvas("#main-canvas", graph);

// Expose to window so HTML buttons and Console can see them
window.graph = graph;
window.canvas = canvas;
window.LiteGraph = LiteGraph;

// 2. Initialize UI & Nodes
// registerFunNodes(); // Call your node registrations
registerFunNodes();
registerMathNodes();
registerIONodes();
registerLogicNodes();

initSidebarSearch();

initSidebarSearch();

// 3. Robust Resize Logic
function resizeCanvas() {
    const container = document.getElementById("canvas-container");
    if (!container) return;

    const canvasEl = document.getElementById("main-canvas");
    canvasEl.width = container.clientWidth;
    canvasEl.height = container.clientHeight;

    canvas.resize();
}

let projectName = "Untitled Project";
window.projectName = projectName;


// Watch for window changes
window.addEventListener("resize", resizeCanvas);

// 4. Global Action Handlers for Header Buttons
window.saveProject = () => {
    const data = {
    type: "FART_PROJECT",
    version: 1,
    name: projectName,
    graph: graph.serialize()
};


    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/fart" }
    );

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${projectName || "project"}.fart`;

    link.click();
};


window.loadProject = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".fart")) {
        alert("Not a FART project 😤");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (data.type !== "FART_PROJECT") {
                throw new Error("Invalid project format");
            }

            graph.clear();
            graph.configure(data.graph);
        } catch (err) {
            alert("Corrupted or invalid .fart file 💀");
            console.error(err);
        }
    };

    reader.readAsText(file);
};


window.clearCanvas = () => {
    if(confirm("Wipe all nodes?")) graph.clear();
};

// 5. Initial Start
graph.start();
setTimeout(resizeCanvas, 100); // Kickstart the layout

const projectNameInput = document.getElementById("project-name");

projectNameInput.addEventListener("input", () => {
    projectName = projectNameInput.value || "Untitled Project";
});

// Default Demo Nodes
const node_const = LiteGraph.createNode("basic/const");
node_const.pos = [100, 100];
graph.add(node_const);

// Add this to the bottom of main.js
const canvasElement = document.getElementById("main-canvas");

canvasElement.ondragover = (e) => e.preventDefault();

canvasElement.ondrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("text");
    if (type) {
        const node = LiteGraph.createNode(type);
        if (node) {
            // Calculate mouse position relative to canvas
            const canvasRect = canvasElement.getBoundingClientRect();
            const x = e.clientX - canvasRect.left;
            const y = e.clientY - canvasRect.top;
            
            // Adjust for canvas internal offset/zoom
            const pos = canvas.convertEventToCanvasOffset(e);
            node.pos = pos;
            
            graph.add(node);
        }
    }
};

canvas.onContextMenu = function (event) {
    LiteGraph.ContextMenu(
        Object.keys(LiteGraph.registered_node_types),
        {
            event,
            callback: (type) => {
                const node = LiteGraph.createNode(type);
                node.pos = canvas.convertEventToCanvasOffset(event);
                graph.add(node);
            }
        }
    );
};

window.addEventListener("keydown", (e) => {
    // Don't trigger shortcuts while typing
    if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA"
    ) return;

    if (e.ctrlKey && e.key.toLowerCase() === "q") {
        e.preventDefault();
        document.getElementById("node-search-input").focus();
        const search = document.getElementById("node-search-input");
search.focus();
search.select();

    }

});


canvasElement.ondrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        if (file.name.endsWith(".fart")) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const data = JSON.parse(ev.target.result);
                graph.clear();
                graph.configure(data.graph);
            };
            reader.readAsText(file);
        }
        return;
    }

    // existing node-drop logic below
};
