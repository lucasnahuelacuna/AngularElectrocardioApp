import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as d3 from 'd3';
import { Signal } from '../modules/signal';

@Component({
  selector: 'app-rhythm-channel',
  templateUrl: './rhythm-channel.component.html',
  styleUrls: ['./rhythm-channel.component.css']
})
export class RhythmChannelComponent implements OnInit {
  private width: number;
  private height: number;
  private data_signal: Signal;
  private velocityScale: string;
  private ref_unit: number;
  private derivation_aux: string;
  private grid_width: number;
  private scale: number;
  private left_edge: number;  //Borde izquierdo del rectángulo indicador
  private right_edge: number; //Borde derecho del rectángulo indicador
  private rect_width: number; //Ancho del rectángulo indicador
  private time: number;
  private total_time: number;
  private channel_svg: any;
  @Input() signal: Signal;    //Almaceno información proveniente de GraphicComponent
  @Input() speedScale: string; //Almaceno información proveniente de GraphicComponent
  @Input() pattern_unit: number; //Almaceno información proveniente de GraphicComponent
  @Input() derivation: string; //Almaceno información proveniente de GraphicComponent
  @Output() private position = new EventEmitter<number>();

  constructor() {
    var screen_width=0.9*screen.availWidth;
    var screen_height=0.1*screen.availHeight;
    this.height=screen_height;
    this.ref_unit=5; //Tomamos 5 px como unidad de medida inicial.
    this.scale=1;
    this.grid_width=0.95*this.width;
    this.left_edge=0;
  }

  ngOnInit() {

    //Cálculo del ancho del contenedor de la gráfica
    var rect = document.querySelector ('#container')
                       .getBoundingClientRect(),
               width = rect.right - rect.left;

    this.width=width;

    d3.select('#container_rhythm')
      .style('margin','0 auto')
      .style('float','left')
      //.style('width', this.width + 'px')
      .style('width', 100 + '%')
      .style('height', this.height + 'px');

    this.channel_svg= d3.selectAll('#container_rhythm').append('svg');
    this.channel_svg.attr('width', '100%')
                    .attr('height', '100%')
                    .attr('class','channel_rhythm')
                    .style('background-color','#EFEFF0')
                    .attr('g');

    this.channel_svg.append('rect')
                    .attr('x', 1.5)
                    .attr('y', 3)
                    .attr('width',this.width - 3.5)
                    .attr('height',this.height - 5)
                    .attr('stroke','#66AD0D')
                    .attr('stroke-width',1.5)
                    .attr('fill','none');
  }

  derivationChanged(){
    this.derivation_aux=this.derivation;
    if(this.derivation_aux == '6x2'){
      this.grid_width=0.45*this.width;
    }else if(this.derivation_aux == '3x4'){
      this.grid_width=0.20*this.width;
    }else{
      this.grid_width=0.95*this.width;
    }
    this.drawRhythm();
  }

  signalChanged(){
    this.data_signal=this.signal;
  }

  speedChanged(){
    this.velocityScale=this.speedScale;
    if(this.velocityScale == "6.25 mm/S")
        this.scale=0.25;
    else if(this.velocityScale == "12.5 mm/S")
        this.scale=0.5;
    else if(this.velocityScale == "25 mm/S")
        this.scale=1;
    else if(this.velocityScale == "50 mm/S")
        this.scale=2;
    else
        this.scale=4;

    this.drawRhythm();
  }

  patternUnitChanged(){
    this.ref_unit=this.pattern_unit;
    this.drawRhythm();
  }

  drawRhythm(){
    d3.selectAll('.rhythm').remove(); //Limpiar el path antes de volver a dibujar
    d3.selectAll('.rectrhythm').remove(); //Limpiar el recuadro antes de volver a dibujar
    d3.selectAll('.textrhythm').remove(); //Limpiar los textos antes de volver a dibujar
    let lineGenerator=d3.line();
    let signal_aux: any=this.data_signal.get_derivation("DII","2.5 mm/mV","6.25 mm/S",this.height/2,this.ref_unit,0);
    let pathData: string=lineGenerator(signal_aux);
    let signal_length= signal_aux.length;

    //Cálculo del ancho del rectángulo indicador de la porción visualizada de las derivaciones sobre la/s grilla/s
    this.total_time= signal_aux[signal_length-1][0]/(25*this.ref_unit*0.25); //Recalculo el tiempo total de la señal (en segundos)
    this.time= this.grid_width/(25*this.ref_unit*this.scale); //Cálculo de la porción de tiempo visualizada en la grilla

    if(this.grid_width >= (25*this.ref_unit*this.scale*this.total_time)){
      this.rect_width= 25*this.ref_unit*0.25*this.total_time; //Cuando la señal de despliega en su totalidad dentro de la grilla
    }else{
      this.rect_width= 25*this.ref_unit*0.25*this.time; //Cuando la se desplieda un fragmento de la señal sobre la grilla
    }

    //Corrección de la posición de left_edge cuando hay un cambio de escala
    this.right_edge= this.left_edge + this.rect_width;
    if(this.right_edge > 25*this.ref_unit*0.25*this.total_time){
      this.left_edge= (25*this.ref_unit*0.25*this.total_time) - this.rect_width;
      this.right_edge= 25*this.ref_unit*0.25*this.total_time;

      //Cálculo del instante de tiempo donde la señal comienza a graficarse en la grilla
      let time= this.left_edge/(25*this.ref_unit*0.25);

      //Ahora se procede a determinar la posición del vector de tiempo desde donde se debe empezar a graficar
      let time_position: number=0;
      let signal_aux=this.data_signal.get_derivation("DII","2.5 mm/mV","6.25 mm/S",this.height/2,this.ref_unit,0);
      for(let i=0; i<signal_aux.length; i++){
        if((signal_aux[i][0]/(25*this.ref_unit*0.25))>= time){
          time_position=i;
          break;
        }
      }
      this.position.emit(time_position);
    }

    //Cálculo de los extremos del rango de tiempo visualizado en la grilla
    let ti= this.left_edge/(25*this.ref_unit*0.25);
    let tf= this.right_edge/(25*this.ref_unit*0.25);

    //Rango de tiempo visualizado en la grilla
    let time_displayed= this.format_time(ti) + " - " + this.format_time(tf);

    this.channel_svg.append('rect')
            .attr('class','rectrhythm')
            .attr('x',this.left_edge)
            .attr('y',0)
            .attr('width',this.rect_width)
            .attr('height',this.height)
            .style('fill','#044799')
            .style('fill-opacity',0.2);

    this.channel_svg.append('path')
            .attr('class','rhythm')
            .attr('stroke','#044799')
            .attr('fill','none')
            .attr('stroke-width',1)
            .attr('stroke-linejoin','round')
            .attr('d', pathData);

    this.channel_svg.append('text')
            .attr('class','textrhythm')
            .attr('x',5)
            .attr('y',15)
            .attr('font-family','Verdana')
            .attr('font-size',10)
            .attr('fill','black')
            .text('DII');

    this.channel_svg.append('text')
            .attr('class','textrhythm')
            .attr('x',this.width - 130)
            .attr('y',15)
            .attr('font-family','Verdana')
            .attr('font-size',10)
            .attr('fill','black')
            .text(time_displayed);
  }

  private format_time(time){
    /*Formatea el tiempo en segundos expresado en decimal al formato hh:mm:ss:ms*/
    //let hours= Math.floor(time / 3600);
    let minutes= Math.floor(time % 3600 / 60);
    let seconds= Math.floor(time % 3600 % 60);
    let miliseconds= (time % 3600 % 60) - Math.trunc(seconds);
    let ms= Math.ceil(miliseconds*1000) + "";
    //let hh= hours + "";
    let mm= minutes + "";
    let ss= seconds + "";

    //if(hours<10){
    //  hh= "0" + hh;
    //}
    if(minutes<10){
      mm= "0" + mm;
    }
    if(seconds<10){
      ss= "0" + ss;
    }
    if(miliseconds == 0){
      ms= "00" + ms;
    }

    //return "" + hh + ":" + mm + ":" + ss + ":" + ms;
    return "" + mm + ":" + ss + ":" + ms;
  }

  shift_left(){
    this.left_edge -= 15;
    if(this.left_edge < 0){
      this.left_edge= 0;
    }
    //Cálculo del instante de tiempo donde la señal comienza a graficarse en la grilla
    let time= this.left_edge/(25*this.ref_unit*0.25);
    //Ahora se procede a determinar la posición del vector de tiempo desde donde se debe empezar a graficar
    let time_position: number=0;
    let signal_aux=this.data_signal.get_derivation("DII","2.5 mm/mV","6.25 mm/S",this.height/2,this.ref_unit,0);
    for(let i=0; i<signal_aux.length; i++){
      if((signal_aux[i][0]/(25*this.ref_unit*0.25))>= time){
        time_position=i;
        break;
      }
    }
    this.position.emit(time_position);
    this.drawRhythm();
  }

  shift_right(){
    this.left_edge += 15;
    if(this.left_edge > (25*this.ref_unit*0.25*this.total_time) - this.rect_width){
      this.left_edge= (25*this.ref_unit*0.25*this.total_time) - this.rect_width;
    }
    //Cálculo del instante de tiempo donde la señal comienza a graficarse en la grilla
    let time= this.left_edge/(25*this.ref_unit*0.25);
    //Ahora se procede a determinar la posición del vector de tiempo desde donde se debe empezar a graficar
    let time_position: number=0;
    let signal_aux=this.data_signal.get_derivation("DII","2.5 mm/mV","6.25 mm/S",this.height/2,this.ref_unit,0);
    for(let i=0; i<signal_aux.length; i++){
      if((signal_aux[i][0]/(25*this.ref_unit*0.25))>= time){
        time_position=i;
        break;
      }
    }
    this.position.emit(time_position);
    this.drawRhythm();
  }

}
