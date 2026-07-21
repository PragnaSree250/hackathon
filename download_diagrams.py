import urllib.request
import urllib.parse
import os

arch_dot = """
digraph G {
    rankdir=TB;
    node [shape=box, style="filled,rounded", fontname="Helvetica", fillcolor="#3182ce", fontcolor=white, width=2.5];
    edge [fontname="Helvetica", fontsize=10, color="#4a5568"];
    
    Citizen [shape=ellipse, fillcolor="#2d3748"];
    Gov [label="Gov Official", shape=ellipse, fillcolor="#2d3748"];
    
    CitUI [label="Citizen Dashboard\n(React)"];
    GovUI [label="Gov Command Center\n(React)"];
    
    API [label="FastAPI Gateway\n(Python)", fillcolor="#38a169"];
    Mule [label="Mule Engine", fillcolor="#38a169"];
    Ledger [label="Cross-Agency Ledger", fillcolor="#38a169"];
    
    AI [label="Multimodal AI", fillcolor="#805ad5"];
    Bank [label="Banking Network", fillcolor="#dd6b20"];
    
    Citizen -> CitUI [label="Uploads Media"];
    Gov -> GovUI [label="Submits Scammer Info"];
    
    CitUI -> API [label="JSON Payload"];
    GovUI -> API [label="Intercept Request"];
    
    API -> AI [label="Media Bytes"];
    AI -> API [label="Threat Score"];
    API -> CitUI [label="Alert Result"];
    
    API -> Mule [label="Validates Request"];
    Mule -> Bank [label="Freeze Directive"];
    Mule -> Ledger [label="Updates Case"];
}
"""

flow_dot = """
digraph G {
    rankdir=TB;
    node [shape=box, style="filled,rounded", fontname="Helvetica", fillcolor="#3182ce", fontcolor=white];
    edge [fontname="Helvetica", fontsize=10];
    
    Start [shape=ellipse, fillcolor="#2d3748", label="Start: Citizen Encounters Threat"];
    Upload [label="Citizen Uploads Media"];
    Analyze [label="Multimodal AI Analyzes File"];
    
    IsThreat [shape=diamond, fillcolor="#dd6b20", label="Is it a Deepfake/Scam?"];
    
    Safe [label="Return 'Safe' to Citizen"];
    EndSafe [shape=ellipse, fillcolor="#2d3748", label="End: No Action Needed"];
    
    Flag [label="Flag Threat & Extract Bank/UPI"];
    Update [label="Update Cross-Agency Ledger"];
    Gov [label="Gov Official Reviews Alert"];
    
    IsFreeze [shape=diamond, fillcolor="#dd6b20", label="Is Freeze Justified?"];
    
    Freeze [fillcolor="#e53e3e", label="Submit Direct Intercept Request"];
    Bank [fillcolor="#e53e3e", label="Banking Network Freezes Account"];
    EndFreeze [shape=ellipse, fillcolor="#2d3748", label="End: Threat Neutralized"];
    
    Start -> Upload -> Analyze -> IsThreat;
    
    IsThreat -> Safe [label="No"];
    Safe -> EndSafe;
    
    IsThreat -> Flag [label="Yes"];
    Flag -> Update -> Gov -> IsFreeze;
    
    IsFreeze -> EndSafe [label="No"];
    IsFreeze -> Freeze [label="Yes"];
    Freeze -> Bank -> EndFreeze;
}
"""

def download_graph(dot_script, filename):
    url = "https://quickchart.io/graphviz?graph=" + urllib.parse.quote(dot_script.strip())
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        with open(filename, 'wb') as out_file:
            out_file.write(response.read())
            print(f"Successfully saved {filename}")

if __name__ == "__main__":
    download_graph(arch_dot, "architecture.png")
    download_graph(flow_dot, "flowchart.png")
