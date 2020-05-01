let util = {
    generateRandomNumber : function(min , max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } ,

    assets : {
        "image" : {
            // "tankImage" : {
            //     url  : "./images/tank.png" ,
            // }
        } ,
    
        "sound" : {
            // "tankDestroySound" : {
            //     url : "./sounds/tankExplosion.mp3" ,
            // }
        } ,
    
        "font" : {
            "atari1Font" : {
                url  : "./fonts/AtariClassicChunky-PxXP.ttf" , 
            } ,
    
            "atari2Font" : {
                url : "./fonts/AtariClassic-gry3.ttf" ,
            }
        }
    } ,

    createImage : function(data) {
        let img = document.createElement("IMG");
        img.src = data.url;
        return new Promise(function(resolve , reject) {
            img.onload = function() {
                resolve({
                    label : data.label ,
                    name  : data.name  ,
                    dom   : img
                });
            };
            img.onerror = function() {
                reject({
                    label : data.label ,
                    name  : data.name  ,
                    dom   : null
                });
            };
        });
    } ,

    createAudio : function(data) {
        let sound = document.createElement("audio");
        sound.src = data.url;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        return new Promise(function(resolve , reject) {
            sound.onloadeddata = function() {
                resolve({
                    label : data.label ,
                    name  : data.name  ,
                    dom   : sound
                });
            };
            sound.onerror = function() {
                reject({
                    label : data.label ,
                    name  : data.name  ,
                    dom   : null
                });
            };
        }); 
    } ,

    createFont : function(data) {
        let fontFace = new FontFace(data.name , `url(${ data.url })`);
        return fontFace.load().then((fontFace) => {
            return {
                label : data.label ,
                name  : data.name  ,
                dom   : fontFace
            };
        } , () => {
            throw {
                label : data.label ,
                name  : data.name  ,
                dom   : null
            };
        });
    } ,

    loadAssets : function(assets) {
        let allPromises = [];
        Object.keys(util.assets).forEach((label) => {
            if(label === "image") {
                let items = util.assets[label];
                Object.keys(items).forEach((imgName) => {
                    allPromises.push(util.createImage({label : "image" , name : imgName , url : items[imgName].url}));
                });
            }
        
            if(label === "sound") {
                let items = util.assets[label];
                Object.keys(items).forEach((soundName) => {
                    allPromises.push(util.createAudio({label : "sound" , name : soundName , url : items[soundName].url}));
                });
            }
        
            if(label === "font") {
                let items = util.assets[label];
                Object.keys(items).forEach((fontName) => {
                    allPromises.push(util.createFont({label : "font" , name : fontName , url : items[fontName].url}));
                });
            }
        });
        return Promise.all(allPromises);
    } ,

    toTime : function(duration) {
        var milliseconds = parseInt((duration % 1000) / 100),
            seconds      = Math.floor((duration / 1000) % 60),
            minutes      = Math.floor((duration / (1000 * 60)) % 60),
            hours        = Math.floor((duration / (1000 * 60 * 60)) % 24);
        hours   = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    } ,
};



export default util;