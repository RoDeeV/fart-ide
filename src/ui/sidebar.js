import { LiteGraph } from "litegraph.js";

export function initSidebarSearch() {
    const searchInput = document.getElementById("node-search-input");
    const nodeList = document.getElementById("node-list");

    if (!searchInput || !nodeList) {
        console.error("Sidebar elements not found! Check your IDs in index.html");
        return;
    }

    const refreshList = (filter = "") => {
        nodeList.innerHTML = "";
        
        // Get all registered node types from LiteGraph
        const types = Object.keys(LiteGraph.registered_node_types);

        const grouped = {};

types.forEach(type => {
    if (type.startsWith("graph/")) return;
    const [category, name] = type.split("/");
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push({ type, name });
});

Object.entries(grouped).forEach(([category, nodes]) => {
    // Category header
    const header = document.createElement("div");
    header.textContent = category.toUpperCase();
    header.style.cssText = `
        margin-top: 10px;
        font-size: 11px;
        color: #a5d6a7;
        border-bottom: 1px solid #333;
    `;
    nodeList.appendChild(header);

    nodes.forEach(({ type, name }) => {
        const elt = document.createElement("div");
        elt.className = "node-item";
        elt.textContent = name;

        elt.onclick = () => {
            const node = LiteGraph.createNode(type);
             const center = canvas.convertEventToCanvasOffset({
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2
});
node.pos = center;

            graph.add(node);
        };

        elt.draggable = true;
        elt.ondragstart = e => e.dataTransfer.setData("text", type);
        nodeList.appendChild(elt);
    });
});

    };

    // Listen for typing in the search bar
    searchInput.oninput = (e) => refreshList(e.target.value);

    // Initial load of the list
    refreshList();
}