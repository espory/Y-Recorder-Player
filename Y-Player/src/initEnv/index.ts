import { HOST } from "common"

export const recoverStorage = ({localStorage_record,sessionStorage_record})=>{
    for(const k in localStorage_record){
        localStorage.setItem(k,localStorage_record[k])
    }
    for(const k in sessionStorage_record){
        sessionStorage.setItem(k,sessionStorage_record[k])
    }
}

export const cacheFiles = async (files:string[])=>{
    (window as any).yrecord_files = {};
    await Promise.all(files.map(async (file)=>{
        const res = await fetch(`${HOST}/${file}`);
        const blob =  await res.blob();
        (window as any).yrecord_files[file.split('.')[0]] =  new File([blob],file,{type:blob.type})
    }))

    console.log((window as any).yrecord_files)
}
// export { mockHover } from './mockHover'
