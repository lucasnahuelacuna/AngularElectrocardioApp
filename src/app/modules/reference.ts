import * as d3 from 'd3';

export class Reference {
    private ref_width: number;
    private ref_height: number;
    private ref_svg: any;
    private background_color: string;
    private pattern_unit: number;

    constructor(width: number, height: number, color: string, pattern_unit: number){
        this.ref_width= width;
        this.ref_height= height;
        this.ref_svg= d3.select('#container2').append('svg');
        this.background_color= color;
        this.pattern_unit=pattern_unit;
    }

    public createRef(){
        this.initSVG();
    }

    private initSVG(){
        this.ref_svg.attr('width', this.ref_width + '%')
                    .attr('height', this.ref_height + '%')
                    .attr('class','reference')
                    .style('background-color',this.background_color)
                    .attr('g');
    }

    public drawRef(refs: string[], container_width: number, container_height:number, amplitude_esc: string, temporal_esc: string){
        let w= container_width * (this.ref_width/100);    //Ancho
        let h= container_height * (this.ref_height/100);  //Alto
        let c= refs.length;   //Número de canales verticales
        let amp_esc: number;
        let time_esc: number;
        let pulse_width: number;

        if(amplitude_esc == "2.5 mm/mV")
            amp_esc=0.25;
        else if(amplitude_esc == "5 mm/mV")
            amp_esc=0.5;
        else if(amplitude_esc == "10 mm/mV")
            amp_esc=1;
        else if(amplitude_esc == "20 mm/mV")
            amp_esc=2;
        else
            amp_esc=4;

        if(temporal_esc == "6.25 mm/S")
            time_esc=0.25;
        else if(temporal_esc == "12.5 mm/S")
            time_esc=0.5;
        else if(temporal_esc == "25 mm/S")
            time_esc=1;
        else if(temporal_esc == "50 mm/S")
            time_esc=2;
        else
            time_esc=4;


        //Cálculo de los ceros de referencia de las derivaciones
        let zeros: number[]=[];
        for(let i=0; i<c; i++){
          let c_n=( (i+1)*2 - 1 ) * ( h/(2*c) );  //C(N) = ( N*2 - 1 ) * ( A/(2*C) )
          zeros.push(c_n);
        }

        //Cálculo del ancho del pulso de referencia (100 mSeg)
        pulse_width= (25*this.pattern_unit/10)*time_esc;
        let array_widths= [0, w/2 - pulse_width/2, w/2 - pulse_width/2,
                              w/2 + pulse_width/2, w/2 + pulse_width/2, w];

        let points;
        let offset: number=10;
        let y: number; //Posición verical de cada texto
        let text_height=0;
        let rect_height=0;

        for(let i=0; i<c; i++){
            //Cálculo de las alturas del pulso de referencia
            let array_heights: number[]=[0,0,-10*this.pattern_unit*amp_esc,
                                        -10*this.pattern_unit*amp_esc,0,0]; //Alturas del pulso de referencia
            for(let k=0; k<array_heights.length; k++){
                array_heights[k] += zeros[i];   //Actualización de las alturas
            }

            points='';
            for(let j=0; j<array_widths.length; j++){
                points += array_widths[j] + ',' + array_heights[j] + ' ';
            }

            this.ref_svg.append('polyline')
                .attr('points',points)
                .attr('fill','none')
                .attr('stroke','#044799') //34495e
                .attr('stroke-width',1);

            //Cálculo de la posición vertical de los textos
            y= offset + ( ((i+1)*2 - 2) * (h/(2*c)) ); // Y(N)= offset + ((N*2 -2)*(A/(2*C)))

            this.ref_svg.append('text')
                .attr('x', 0)
                .attr('y', y)
                .attr('font-family','Verdana')
                .attr('font-size',12)
                .attr('fill','black')
                .text(refs[i]);
        }
    }
}