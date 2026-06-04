let index = 0;

const logElement = document.getElementById("log");
const startButton = document.getElementById("startButton");

function parseLine(text){

    const root = document.createElement("div");

    let i = 0;
    let buffer = "";

    const flush = () => {
        if(buffer){
            const span = document.createElement("span");
            span.textContent = buffer;
            root.appendChild(span);
            buffer = "";
        }
    };

    while(i < text.length){

        if(text.startsWith("__K", i)){
            flush();
            i += 3;

            let content = "";
            let mode = "decode";

            while(i < text.length){

                if(text.startsWith("__R", i)){
                    i += 3;
                    break;
                }

                if(text.startsWith("__N", i)){
                    mode = "static";
                    i += 3;
                    continue;
                }

                content += text[i];
                i++;
            }

            const span = document.createElement("span");

            if(mode === "decode"){
                span.className = "decode";
                span.dataset.original = content;
                span.dataset.progress = "0";
            }else{
                span.className = "static";
                span.dataset.len = content.length;
            }

            root.appendChild(span);
            continue;
        }

        buffer += text[i];
        i++;
    }

    flush();

    return root;
}

function makeNoise(len){
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&@!?";
    let out = "";
    for(let i = 0; i < len; i++){
        out += chars[Math.floor(Math.random()*chars.length)];
    }
    return out;
}

function update(){

    document.querySelectorAll(".decode").forEach(el => {

        const original = el.dataset.original;

        let p = parseFloat(el.dataset.progress);
        p += 0.03;

        if(p >= 1){
            el.textContent = original;
        }else{
            el.textContent = makeNoise(original.length);
        }

        el.dataset.progress = p;
    });

    document.querySelectorAll(".static").forEach(el => {
        el.textContent = makeNoise(Number(el.dataset.len));
    });
}

setInterval(update, 40);

function addNextLine(){

    if(index >= logs.length){
        startButton.textContent = "抽出完了";
        return;
    }

    const line = parseLine(logs[index]);

    logElement.appendChild(line);

    logElement.scrollTop = logElement.scrollHeight;

    index++;

    setTimeout(addNextLine, LOG_DELAY);
}

startButton.addEventListener("click", () => {

    startButton.disabled = true;
    startButton.textContent = "抽出中...";

    addNextLine();
});
