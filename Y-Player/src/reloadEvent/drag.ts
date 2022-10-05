export function sendDragEvents(el:HTMLElement|null, contentWindow:Window, types:string[]):void{
    if(el){
        types.forEach(type=>{
            const event = new DragEvent(type, {
                'view': contentWindow,
                'bubbles': true,
                'cancelable': true
            })
            el.dispatchEvent(event);
        })
    }
}

export function sendDropEvents(el:HTMLElement|null, contentWindow:Window, types:string[],tag:string[]):void{
    if(el){
        console.log(el)
        const dataTransfer = new DataTransfer();
        const files = (window.parent as any).yrecord_files;
        for (const t of tag) {
            console.log(t)
            const file = files[t];
            console.log(file)
            if(file){
                dataTransfer.items.add(file);
            }
        }
        // debugger;
        console.log(dataTransfer.files)
        const event = new DragEvent("drop",{'view': contentWindow,'bubbles': true,'cancelable': true, dataTransfer});
        el.dispatchEvent(event);
    }
}