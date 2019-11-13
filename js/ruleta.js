let resultados = [];

class Ruleta{
    constructor(strC, opt){ 
        this.options = opt;

        // Initialize Variables
        this.strCanvas = strC;
        this.inicioAngulo = 0;
        this.tiemoutGirar = null;
        this.optRuleta;
        this.GirarAngleStart = 10;
        this.GirarTime = 0;
        this.GirarTimeTotal = 0;
        this.arc = Math.PI / (this.options.length / 2);        
    }
    //
    byte2Hex(n) {
        var nybHexString = "0123456789ABCDEF";
        return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
    }

    RGB2Color(r,g,b) {
        return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
    }
    
    getColor2RGB(item, maxitem) {
        var fase = 0;
        var centrar = 128;
        var width = 127;
        var frecuencia = Math.PI*2/maxitem;
      
      // R G B.
        var red   = Math.sin(frecuencia*item+2+fase) * width + centrar;
        var green = Math.sin(frecuencia*item+0+fase) * width + centrar;
        var blue  = Math.sin(frecuencia*item+4+fase) * width + centrar;
      
        return this.RGB2Color(red,green,blue);
      }
      
      // Dibujamos la ruleta.
    Dibujar() {
        // Obtenemos el canvas desde el Id Canvas.
       
        var canvas = document.getElementById(this.strCanvas);
        var text = "0";
      
        if (canvas.getContext) {
          var outsideRadius = 130;
          var textRadius = 100;
          var insideRadius = 75;
          this.optRuleta = canvas.getContext("2d");
          this.optRuleta.clearRect(0,0,260,260);
          this.optRuleta.strokeStyle = "black";
          //  this.optRuleta.strokeStyle = "rgb(253, 237, 236)";////Bode de la ruleta
          this.optRuleta.lineWidth = 8;
          this.optRuleta.font = '26px Verdana, Arial';
          for(var i = 0; i < this.options.length; i++) {
      
            var angle = this.inicioAngulo + i * this.arc;
            this.optRuleta.fillStyle = this.getColor2RGB(i, this.options.length);
            this.optRuleta.beginPath();
            this.optRuleta.arc(190, 190, outsideRadius, angle, angle + this.arc, false);
            this.optRuleta.arc(190, 190, insideRadius, angle + this.arc, angle, true);
            this.optRuleta.stroke();
            this.optRuleta.fill();
            this.optRuleta.save();
            this.optRuleta.shadowOffsetX = -1;
            this.optRuleta.shadowOffsetY = -1;
            this.optRuleta.shadowBlur = 0;
            this.optRuleta.shadowColor = "rgb(220,110,220)";
            this.optRuleta.fillStyle = "black";
            this.optRuleta.translate(190 + Math.cos(angle + this.arc / 2) * textRadius,  190 + Math.sin(angle + this.arc / 2) * textRadius);
            this.optRuleta.rotate(angle + this.arc / 2 + Math.PI / 2);
            text = this.options[i];
            this.optRuleta.fillText(text, this.optRuleta.measureText(text).width, 0);
            this.optRuleta.restore();
      
      
          }
      
         
          //console.info(text);
          
          // Flecha, color y "movimiento".
          this.optRuleta.fillStyle = "black";
          this.optRuleta.beginPath();
          this.optRuleta.moveTo(190 - 8, 190 - (outsideRadius + 8));
          this.optRuleta.lineTo(190 + 8, 190 - (outsideRadius + 8));
          this.optRuleta.lineTo(190 + 8, 190 - (outsideRadius - 8));
          this.optRuleta.lineTo(190 + 9, 190 - (outsideRadius - 8));
          this.optRuleta.lineTo(190 + 0, 190 - (outsideRadius - 15));
          this.optRuleta.lineTo(190 - 9, 190 - (outsideRadius - 8));
          this.optRuleta.lineTo(190 - 8, 190 - (outsideRadius - 8));
          this.optRuleta.lineTo(190 - 8, 190 - (outsideRadius + 8));
          this.optRuleta.fill();
          // this.options.forEach(o => {
          //   console.info(o)
          // });
        }
    
    }
      
    Girar(valorTiempo) {
        this.GirarAngleStart = Math.random() * 10 + 10;
        this.GirarTime = 0;
        this.GirarTimeTotal = Math.random() * 3 + 4 * valorTiempo;
        console.log(this.GirarTimeTotal);
        this.rotarRuleta()
        
    }
      
      // Función que realiza el giro de la ruleta.
    rotarRuleta() {
        this.GirarTime =  this.GirarTime + 30;
        if(this.GirarTime >= this.GirarTimeTotal) {
            this.detenerRotacionRuleta();
            return;          
        }
        var GirarAngle = this.GirarAngleStart - this.mathOperations(this.GirarTime, 0, this.GirarAngleStart, this.GirarTimeTotal);
        this.inicioAngulo += (GirarAngle * Math.PI / 180);
        this.Dibujar();
        this.tiemoutGirar = setTimeout(this.strCanvas + '.rotarRuleta()', 30);
    }

      // Detener la ruleta.
    detenerRotacionRuleta() {
        clearTimeout(this.tiemoutGirar);
        var degrees = this.inicioAngulo * 180 / Math.PI + 90;
        var arcd = this.arc * 180 / Math.PI;
        var index = Math.floor((360 - degrees % 360) / arcd);
        this.optRuleta.save();
        this.optRuleta.font = 'bold 155px Verdana, Arial';


        var text = this.options[index]
        this.optRuleta.fillText(text, 190 - this.optRuleta.measureText(text).width / 2, 240 + 10);
        resultados.push(text);
        
    }
  
    mathOperations(GirarTime, b, GirarAngleStart, GirarTimeTotal) {
        var ts = (GirarTime/=GirarTimeTotal)*GirarTime;
        var tc = ts*GirarTime;
        return b+GirarAngleStart*(tc + -3*ts + 3*GirarTime);
    }
    
    Resultado(){
        return this.text;
    }

}