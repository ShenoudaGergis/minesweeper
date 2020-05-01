Sound.prototype.play = function() {
    this.sound.play();
    this.sound.currentTime = 0;
};

Sound.prototype.pause = function() {
    this.sound.pause();
};

Sound.prototype.stop = function() {
    this.pause();
    this.sound.currentTime = 0;
};

Sound.prototype.clone = function() {
    let domCopy = this.sound.cloneNode(true);
    return new Sound(domCopy);
};

export default function Sound(audio) {
    this.sound = audio;
}