
export{
    transformFileToDataUrl
}
//图片转成base64
function transformFileToDataUrl(data,callback) {
    const _this=this;
    const imgCompassMaxSize = 200 * 1024;
    var file = data.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var dataURL = this.result;
        if(dataURL.length > imgCompassMaxSize){
            var image = new Image();
            image.src = dataURL;
            image.onload = function (e) {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var w = 0;
                var h = 0;
                if (this.width > this.height) {
                    h = 750;
                    var scale = this.width / this.height;
                    h = h > this.height ? this.height : h;
                    w = h * scale;
                }
                else {
                    w = 750;
                    var scale = this.width / this.height;
                    w = w > this.width ? this.width : w;
                    h = w / scale;
                }
                var anw = document.createAttribute("width");
                var anh = document.createAttribute("height");
                if (this.width > this.height) {
                    anw.value = h;
                    anh.value = w;
                }
                else {
                    anw.value = w;
                    anh.value = h;
                }
                canvas.setAttributeNode(anw);
                canvas.setAttributeNode(anh);

                if (this.width > this.height) {
                    ctx.translate(h, 0);
                    ctx.rotate(90 * Math.PI / 180)
                    ctx.drawImage(this, 0, 0, w, h);
                    ctx.restore();
                }
                else {
                    ctx.drawImage(this, 0, 0, w, h);
                }
                URL = canvas.toDataURL('image/jpeg',0.5);
                callback(URL);
            }
        }else {
            callback(dataURL); // 图片不压缩
        }
    };
    reader.readAsDataURL(file);
}
