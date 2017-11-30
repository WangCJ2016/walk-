import { Component, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';

/**
 * Generated class for the RoundRangeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'round-range',
  templateUrl: 'round-range.html'
})
export class RoundRangeComponent {
  @ViewChild('cav') cav: ElementRef
  @Input() raduis: number = 6
  @Input() width: number = 50
  @Input() process: any = 50
  @Input() color: string = '#29b4ff'

  constructor(private render: Renderer2) {
    
  }
  ngOnChanges() {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.ngAfterViewInit()
  }
  ngAfterViewInit() {
    const width = this.width
    const process = this.process
    const color = this.color
    const raduis = this.raduis
    this.render.setProperty(this.cav.nativeElement, 'width', width)
    this.render.setProperty(this.cav.nativeElement, 'height', width)
    const context = this.cav.nativeElement.getContext('2d')
    context.clearRect(0, 0, width, width);
    
    console.log(process)
    if(process==0){

      context.beginPath();    
      context.moveTo(width/2, width/2);      
      context.arc(width/2, width/2, width/2, 0, Math.PI*2, false);    
      context.closePath();    
      context.fillStyle = '#ccc';    
      context.fill(); 

      context.beginPath();    
      context.moveTo(width/2, width/2);    
      context.arc(width/2, width/2, width/2 - raduis, 0, Math.PI * 2, true);       
      context.fillStyle = 'rgba(255,255,255,1)';    
      context.fill(); 
  
      return
    }else{

    context.beginPath();    
    context.moveTo(width/2, width/2);      
    context.arc(width/2, width/2, width/2, -Math.PI / 2, Math.PI * 2 * process / 100 - Math.PI / 2, false);    
    context.closePath();    
    context.fillStyle = color;    
    context.fill();   

    context.beginPath();    
    context.moveTo(width/2, width/2);    
    context.arc(width/2, width/2, width/2 - raduis, 0, Math.PI * 2, true);    
    context.closePath();    
    context.fillStyle = 'rgba(255,255,255,1)';    
    context.fill(); 
    
    context.beginPath();    
    context.moveTo(width/2, width/2);      
    context.arc(width/2, width/2, width/2,  Math.PI * 2 * process / 100 - Math.PI / 2, -Math.PI / 2, false);    
    context.closePath();    
    context.fillStyle = '#ccc';    
    context.fill(); 

    context.beginPath();    
    context.moveTo(width/2, width/2);      
    context.arc(width/2, width/2, width/2- raduis,  Math.PI * 2 * process / 100 - Math.PI / 2, -Math.PI / 2, false);    
    context.closePath();    
    context.fillStyle = 'rgba(255,255,255,1)'; 
    context.fill(); 
  }
}
}
