import { Component, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Chart} from '../modules/chart';
import { Reference } from '../modules/reference';
import { Signal } from '../modules/signal';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
  private value: string;
 //private aux: any;

  private width: number;
  private height: number;
  private chart_width: number;
  private chart_heigth: number;
  private panel_controls_width: number;
  private panel_controls_height: number;
  private signal: Signal;
  private derivations: string;
  private speedScale: string;
  private gainScale: string;
  private reference1: Reference;
  private reference2: Reference;
  private reference3: Reference;
  private reference4: Reference;
  private chart1: Chart;
  private chart2: Chart;
  private chart3: Chart;
  private chart4: Chart;
  private bandera: boolean;
  private grid_flag: boolean;
  private beats_flag: boolean;
  private pattern_unit: number; //Unidad patrón de referencia con la que se dibuja la grilla y las derivaciones
  private time_position: number;
  

  constructor() {
    var screen_width=screen.availWidth;
    var screen_height=screen.availHeight;
    this.width= 0.9*screen_width;
    this.height= 0.8*screen_height;
    this.chart_width=0.847*this.width;
    this.chart_heigth=this.height;
    this.panel_controls_width= 0.15*this.width;
    this.panel_controls_height= this.height;
    this.derivations='6x2';
    this.speedScale='25 mm/S';
    this.gainScale='10 mm/mV'
    this.bandera=false;
    this.signal= new Signal();
    this.grid_flag=true;
    this.beats_flag=true;
    this.pattern_unit=5; //Se utilizan 5 px por defecto como unidad patrón de graficación
    this.time_position=0; //Al comiezo se grafica desde la posición correspondiente a los 0 segundos

  }

  ngOnInit() {
    this.initSvg();
    this.drawGraph();
  }

  private initSvg(){
    d3.select('#container')
      .style('margin','0 auto')
      .style('width', '100%')
      .style('height', this.height + 'px');
    d3.select('#container2')
      .style('float','left')
      .style('width', '100%')
      .style('height', '100%');

      //Cálculo del ancho del contenedor del gráfico
      var rect = document.querySelector ('#container')
                       .getBoundingClientRect(),
               width = rect.right - rect.left;

      this.chart_width=width;

  }

  scaleChanged(selectedValue: string){
    switch(selectedValue){
      case '1/4':
          this.gainScale="2.5 mm/mV";
          this.speedScale="6.25 mm/S";
        break;
      case '1/2':
          this.gainScale="5 mm/mV";
          this.speedScale="12.5 mm/S";
        break;
      case '1':
          this.gainScale="10 mm/mV";
          this.speedScale="25 mm/S";
        break;
      case '2':
          this.gainScale="20 mm/mV";
          this.speedScale="50 mm/S";
        break;
      case '4':
          this.gainScale="40 mm/mV";
          this.speedScale="100 mm/S";
        break;
    }
    this.drawGraph();
  }

  derivationChanged(selectedValue: string){
    this.derivations=selectedValue;
    this.bandera=true;
    this.drawGraph();
  }

  speedChanged(selectedValue: string){
    this.speedScale=selectedValue;
    this.bandera=true;
    this.drawGraph();
  }

  gainChanged(selectedValue: string){
    this.gainScale=selectedValue;
    this.drawGraph();
  }

  drawGridChanged(){
    if(!this.grid_flag){
      //console.log('Grilla Activa');
      this.grid_flag=true;
    }else{
      //console.log('Grilla Inactiva');
      this.grid_flag=false;
    }
    this.drawGraph();
  }

  drawBeatsChanged(){
    if(!this.beats_flag){
      //console.log('Latidos Activos');
      this.beats_flag=true;
    }else{
      //console.log('Latidos Inactivos');
      this.beats_flag=false;
    }
    this.drawGraph();
  }

  private drawGraph(){
    let array_derivations: string[];

    switch(this.derivations){
      case 'Principales':
          array_derivations=['DI','DII','DIII'];
          this.plotGridRef('Principales',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'Aumentadas':
          array_derivations=['aVr','aVl','aVf'];
          this.plotGridRef('Aumentadas',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V1, V2 y V3':
          array_derivations=['V1','V2','V3'];
          this.plotGridRef('V1, V2 y V3',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V4, V5 y V6':
          array_derivations=['V4','V5','V6'];
          this.plotGridRef('V4, V5 y V6',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'Miembros':
          array_derivations=['DI','DII','DIII','aVr','aVl','aVf'];
          this.plotGridRef('Miembros',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'Precordiales':
          array_derivations=['V1','V2','V3','V4','V5','V6'];
          this.plotGridRef('Precordiales',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'DII, V2 y V5':
          array_derivations=['DII','V2','V5'];
          this.plotGridRef('DII, V2 y V5',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case '12x1':
          array_derivations=['DI','DII','DIII','aVr','aVl','aVf','V1','V2','V3','V4','V5','V6'];
          this.plotGridRef('12x1',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case '6x2':
          this.plotGridRef('6x2',null,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,['DI','DII','DIII','aVr','aVl','aVf'],this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,false,this.time_position);
            this.chart2.drawPath(this.signal,['V1','V2','V3','V4','V5','V6'],this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
            this.chart2.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case '3x4':
          this.plotGridRef('3x4',null,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,['DI','DII','DIII'],this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,false,this.time_position);
            this.chart2.drawPath(this.signal,['aVr','aVl','aVf'],this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,false,this.time_position);
            this.chart3.drawPath(this.signal,['V1','V2','V3'],this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,false,this.time_position);
            this.chart4.drawPath(this.signal,['V4','V5','V6'],this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
            this.chart2.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
            this.chart3.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
            this.chart4.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'DI':
          array_derivations=['DI'];
          this.plotGridRef('DI',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'DII':
          array_derivations=['DII'];
          this.plotGridRef('DII',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'DIII':
          array_derivations=['DIII'];
          this.plotGridRef('DIII',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'aVr':
          array_derivations=['aVr'];
          this.plotGridRef('aVr',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'aVl':
          array_derivations=['aVl'];
          this.plotGridRef('aVl',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'aVf':
          array_derivations=['aVf'];
          this.plotGridRef('aVf',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V1':
          array_derivations=['V1'];
          this.plotGridRef('V1',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V2':
          array_derivations=['V2'];
          this.plotGridRef('V2',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V3':
          array_derivations=['V3'];
          this.plotGridRef('V3',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V4':
          array_derivations=['V4'];
          this.plotGridRef('V4',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V5':
          array_derivations=['V5'];
          this.plotGridRef('V5',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
      case 'V6':
          array_derivations=['V6'];
          this.plotGridRef('V6',array_derivations,this.grid_flag);
          if(this.bandera){
            d3.selectAll('.ecgsig').remove(); //Limpiar los path dibujados sobre la/s grilla/s
            d3.selectAll('.heartbeats').remove(); //Limpiar los latidos dibujados sobre la/s grilla/s
            this.chart1.drawPath(this.signal,array_derivations,this.chart_width,this.chart_heigth,this.gainScale,this.speedScale,true,this.time_position);
            this.chart1.drawHeartBeats(this.signal,this.speedScale,this.beats_flag,this.time_position);
          }
        break;
    }
  }

  private plotGridRef(derivations: string, array_derivations: string[], grid_flag: boolean){

    if(derivations == '6x2'){
      d3.selectAll('.chart_grid').remove(); //Limpiar por completo el contenido
      d3.selectAll('.reference').remove();
      this.reference1= new Reference(5,100,'#EFEFF0',this.pattern_unit);
      this.reference1.createRef();
      this.reference1.drawRef(['DI','DII','DIII','aVr','aVl','aVf'], this.chart_width, this.chart_heigth, this.gainScale,this.speedScale);
      this.chart1= new Chart(45,100,'#EFEFF0',this.pattern_unit);
      this.chart1.createGrid(grid_flag);
      this.reference2= new Reference(5,100,'#EFEFF0',this.pattern_unit);
      this.reference2.createRef();
      this.reference2.drawRef(['V1','V2','V3','V4','V5','V6'], this.chart_width, this.chart_heigth, this.gainScale,this.speedScale);
      this.chart2= new Chart(45,100,'#EFEFF0',this.pattern_unit);
      this.chart2.createGrid(grid_flag);
    }else if(derivations == '3x4'){
      d3.selectAll('.chart_grid').remove(); //Limpiar por completo el contenido
      d3.selectAll('.reference').remove();
      this.reference1= new Reference(5,100,'#EFEFF0',this.pattern_unit);
      this.reference1.createRef();
      this.reference1.drawRef(['DI','DII','DIII'], this.chart_width, this.chart_heigth, this.gainScale,this.speedScale);
      this.chart1= new Chart(20,100,'#EFEFF0',this.pattern_unit);
      this.chart1.createGrid(grid_flag);
      this.reference2= new Reference(5,100,'#EFEFF0',this.pattern_unit);
      this.reference2.createRef();
      this.reference2.drawRef(['aVr','aVl','aVf'], this.chart_width, this.chart_heigth, this.gainScale,this.speedScale);
      this.chart2= new Chart(20,100,'#EFEFF0',this.pattern_unit);
      this.chart2.createGrid(grid_flag);
      this.reference3= new Reference(5,100,'#EFEFF0',this.pattern_unit);
      this.reference3.createRef();
      this.reference3.drawRef(['V1','V2','V3'], this.chart_width, this.chart_heigth, this.gainScale,this.speedScale);
      this.chart3= new Chart(20,100,'#EFEFF0',this.pattern_unit);
      this.chart3.createGrid(grid_flag);
      this.reference4= new Reference(5,100,'#EFEFF0',this.pattern_unit);
      this.reference4.createRef();
      this.reference4.drawRef(['V4','V5','V6'], this.chart_width, this.chart_heigth, this.gainScale,this.speedScale);
      this.chart4= new Chart(20,100,'#EFEFF0',this.pattern_unit);
      this.chart4.createGrid(grid_flag);
    }else{
      d3.selectAll('.chart_grid').remove(); //Limpiar por completo el contenido
      d3.selectAll('.reference').remove();
      this.reference1= new Reference(5,100,'#EFEFF0',this.pattern_unit);
      this.reference1.createRef();
      this.reference1.drawRef(array_derivations, this.chart_width, this.chart_heigth, this.gainScale,this.speedScale);
      this.chart1= new Chart(95,100,'#EFEFF0',this.pattern_unit);
      this.chart1.createGrid(grid_flag);
    }
  }
}
