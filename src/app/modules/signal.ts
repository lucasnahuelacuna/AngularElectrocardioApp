import * as d3 from 'd3';

export class Signal {
    private rows: number;
    private columns: number;
    private d1_signal: any[];
    private d2_signal: any[];
    private d3_signal: any[];
    private avr_signal: any[];
    private avl_signal: any[];
    private avf_signal: any[];
    private v1_signal: any[];
    private v2_signal: any[];
    private v3_signal: any[];
    private v4_signal: any[];
    private v5_signal: any[];
    private v6_signal: any[];

    constructor(){}

    public set_derivations(data: any){
        /*Recibe como parametro un objeto que almacena la información
        del fichero json y setea los atributos de clase.*/
        this.rows= data.time.length;  //número de filas
        
        let time= data.time;
        let DI= data.DI;
        let DII= data.DII;
        let DIII= data.DIII;
        let aVr= data.aVr;
        let aVl= data.aVl;
        let aVf= data.aVf;
        let v1= data.V1;
        let v2= data.V2;
        let v3= data.V3;
        let v4= data.V4;
        let v5= data.V5;
        let v6= data.V6;

        //Se declara cada señal (atributo de clase) como una matriz de n filas x 2 columnas,
        //es decir, cada fila corresponderá a una coordenada a graficar (tiempo,amplitud).
        this.d1_signal=new Array(this.rows);
        this.d2_signal=new Array(this.rows);
        this.d3_signal=new Array(this.rows);
        this.avr_signal=new Array(this.rows);
        this.avl_signal=new Array(this.rows);
        this.avf_signal=new Array(this.rows);
        this.v1_signal=new Array(this.rows);
        this.v2_signal=new Array(this.rows);
        this.v3_signal=new Array(this.rows);
        this.v4_signal=new Array(this.rows);
        this.v5_signal=new Array(this.rows);
        this.v6_signal=new Array(this.rows);

        for(let i=0; i<this.rows; i++){
           this.d1_signal[i]=new Array(2);
           this.d2_signal[i]=new Array(2);
           this.d3_signal[i]=new Array(2);
           this.avr_signal[i]=new Array(2);
           this.avl_signal[i]=new Array(2);
           this.avf_signal[i]=new Array(2);
           this.v1_signal[i]=new Array(2);
           this.v2_signal[i]=new Array(2);
           this.v3_signal[i]=new Array(2);
           this.v4_signal[i]=new Array(2);
           this.v5_signal[i]=new Array(2);
           this.v6_signal[i]=new Array(2);
        }

        //Asignar los valores correspondientes a cada posición de las matrices
        for(let i=0; i<this.rows; i++){
           this.d1_signal[i][0]=time[i];
           this.d1_signal[i][1]=DI[i];
           this.d2_signal[i][0]=time[i];
           this.d2_signal[i][1]=DII[i];
           this.d3_signal[i][0]=time[i];
           this.d3_signal[i][1]=DIII[i];
           this.avr_signal[i][0]=time[i];
           this.avr_signal[i][1]=aVr[i];
           this.avl_signal[i][0]=time[i];
           this.avl_signal[i][1]=aVl[i];
           this.avf_signal[i][0]=time[i];
           this.avf_signal[i][1]=aVf[i];
           this.v1_signal[i][0]=time[i];
           this.v1_signal[i][1]=v1[i];
           this.v2_signal[i][0]=time[i];
           this.v2_signal[i][1]=v2[i];
           this.v3_signal[i][0]=time[i];
           this.v3_signal[i][1]=v3[i];
           this.v4_signal[i][0]=time[i];
           this.v4_signal[i][1]=v4[i];
           this.v5_signal[i][0]=time[i];
           this.v5_signal[i][1]=v5[i];
           this.v6_signal[i][0]=time[i];
           this.v6_signal[i][1]=v6[i];
        }
    }

    public get_derivation(derivation: string, amplitude_esc: string, temporal_esc: string, step: number, pattern_unit: number, time_position: number){
        //Recibe como parámetros:
        //   * Señal a recuperar
        //   * Escalamiento en amplitud
        //   * Escalamiento en tiempo
        //   * Devuelve la señal transformada o no
        let aux = [];

        if(derivation == 'DI'){
            let copia_d1 = [];
            for (let i = time_position; i < this.d1_signal.length; i++)
                copia_d1[i] = this.d1_signal[i].slice();
            aux= this.scale(copia_d1,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'DII'){
            let copia_d2 = [];
            for (let i = time_position; i < this.d2_signal.length; i++)
                copia_d2[i] = this.d2_signal[i].slice();
            aux= this.scale(copia_d2,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'DIII'){
            let copia_d3 = [];
            for (let i = time_position; i < this.d3_signal.length; i++)
                copia_d3[i] = this.d3_signal[i].slice();
            aux= this.scale(copia_d3,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'aVr'){
            let copia_avr = [];
            for (let i = time_position; i < this.avr_signal.length; i++)
                copia_avr[i] = this.avr_signal[i].slice();
            aux= this.scale(copia_avr,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'aVl'){
            let copia_avl = [];
            for (let i = time_position; i < this.avl_signal.length; i++)
                copia_avl[i] = this.avl_signal[i].slice();
            aux= this.scale(copia_avl,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'aVf'){
            let copia_avf = [];
            for (let i = time_position; i < this.avf_signal.length; i++)
                copia_avf[i] = this.avf_signal[i].slice();
            aux= this.scale(copia_avf,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'V1'){
            let copia_v1 = [];
            for (let i = time_position; i < this.v1_signal.length; i++)
                copia_v1[i] = this.v1_signal[i].slice();
            aux= this.scale(copia_v1,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'V2'){
            let copia_v2 = [];
            for (let i = time_position; i < this.v2_signal.length; i++)
                copia_v2[i] = this.v2_signal[i].slice();
            aux= this.scale(copia_v2,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'V3'){
            let copia_v3 = [];
            for (let i = time_position; i < this.v3_signal.length; i++)
                copia_v3[i] = this.v3_signal[i].slice();
            aux= this.scale(copia_v3,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'V4'){
            let copia_v4 = [];
            for (let i = time_position; i < this.v4_signal.length; i++)
                copia_v4[i] = this.v4_signal[i].slice();
            aux= this.scale(copia_v4,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'V5'){
            let copia_v5 = [];
            for (let i = time_position; i < this.v5_signal.length; i++)
                copia_v5[i] = this.v5_signal[i].slice();
            aux= this.scale(copia_v5,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }else if(derivation == 'V6'){
            let copia_v6 = [];
            for (let i = time_position; i < this.v6_signal.length; i++)
                copia_v6[i] = this.v6_signal[i].slice();
            aux= this.scale(copia_v6,amplitude_esc,temporal_esc,step,pattern_unit,time_position);
            return aux;
        }

    }

    private scale(signal: number[], amplitude_esc: string, temporal_esc: string, step: number, pattern_unit: number, time_position: number){
        //Se encarga de escalar la señal o no en amplitud y/0 tiempo para graficarla
        //Recibe como parámetro la señal y el factor de escala en amplitud y tiempo.

        let signal_aux=new Array(signal.length - time_position);
        for(let i=0; i<signal_aux.length; i++){
          signal_aux[i]= new Array(2);
        }

        let amp_esc: number;
        let time_esc: number;
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

        for(let i=time_position; i<signal.length; i++){                          /*<---- Corrección de desplazamiento temporal ---->*/
            signal_aux[i-time_position][0]= 25*pattern_unit*signal[i][0]*time_esc - 25*pattern_unit*signal[time_position][0]*time_esc;
            signal_aux[i-time_position][1]= -10*pattern_unit*signal[i][1]*amp_esc + step;
        }

        return signal_aux;
    }

    public peak_detection(time_position: number){
        //Este método se encarga de detectar los instantes de en lo que se produce
        //el pico R en la derivación DII. Se almacenan estos tiempos es un vector
        //que será entregado a un método de la clase Chart para la graficación.
        let maximum: number;
        let array_values: number[]=[];
        let array_indexes: number[]=[];
        let array_max_positions: number[]=[];
        let array_times: number[]=[];
        let flag: boolean= false;
        let max: number;
        let index: number;
        let time_shift: number;

        //Buscamos el máximo global de la señal
        maximum=this.d2_signal[0][1];
        for(let i=0; i<this.d2_signal.length; i++){
            if(this.d2_signal[i][1]>maximum){
                maximum=this.d2_signal[i][1];
            }
        }

        for(let i=0; i<this.d2_signal.length; i++){
            if(this.d2_signal[i][1]>=0.7*maximum){
              array_values.push(this.d2_signal[i][1]);
              array_indexes.push(i);
              flag=true;
            }
            else {
              if(flag){
                max=array_values[0];
                for(let j=0; j<array_values.length; j++){
                  if(array_values[j]>max){
                    max=array_values[j];
                    index=array_indexes[j];
                  }
                }

                flag=false;
                array_max_positions.push(index);
                array_values=[];
                array_indexes=[];
              }
            }
        }
        //console.log(array_max_positions);

        //Almacenamos los tiempos correspondientes a los picos R
        for(let i=0; i<array_max_positions.length; i++){
            array_times.push(this.d2_signal[array_max_positions[i]][0]);
        }

        //Calculamos el corrimiento de tiempo efectuado por el usuario en el canal de ritmo
        time_shift= this.d2_signal[time_position][0];

        //Aplicamos el corrimiento a los tiempos correspondientes a los picos
        for(let i=0; i<array_times.length; i++){
            array_times[i] -= time_shift;
        }

        return array_times;
    }

}