const { ipcMain } = window.require('electron');
const { ipcRenderer } = window.require('electron');


window.addEventListener('DOMContentLoaded',()=>{
    const replaceText = (selector,text) =>{
        const element = document.getElementById(selector);
        console.log(element);
        if(element) element.innerHTML = text;
    }
    for(const dependecy of ["chrome","node","electron"]){
        replaceText(`${dependecy}-version`,process.versions[dependecy])
    }

});