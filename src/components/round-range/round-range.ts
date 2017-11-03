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
  @Input() width: number
  @Input() process: number
  @Input() color: string

  constructor(private render: Renderer2) {
    
  }
  ngAfterViewInit() {
    const width = this.width
    const process = this.process
    const color = this.color
    this.render.setProperty(this.cav.nativeElement, 'width', width)
    this.render.setProperty(this.cav.nativeElement, 'height', width)
    const context = this.cav.nativeElement.getContext('2d')
    context.clearRect(0, 0, width, width);
    
    

    context.beginPath();    
    context.moveTo(width/2, width/2);      
    context.arc(width/2, width/2, width/2, -Math.PI / 2, Math.PI * 2 * process / 100 - Math.PI / 2, false);    
    context.closePath();    
    context.fillStyle = color;    
    context.fill();   

    context.beginPath();    
    context.moveTo(width/2, width/2);    
    context.arc(width/2, width/2, width/2 - 6, 0, Math.PI * 2, true);    
    context.closePath();    
    context.fillStyle = 'rgba(255,255,255,1)';    
    context.fill();    
  }
}
