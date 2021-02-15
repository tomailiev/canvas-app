import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fabric } from 'fabric'
import { Canvas, IEvent, Object, StaticCanvas } from 'fabric/fabric-impl';
import { IPage } from '../../shared/interfaces/page';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements AfterViewInit {
  canvas: Canvas | StaticCanvas;
  object: Object;
  objectValue: string;
  color: string;
  @Input() page: IPage;
  @Input() isStatic: boolean;
  @Output() done = new EventEmitter<boolean>();

  constructor() { }

  ngAfterViewInit(): void {
    const id = `fabric-canvas-${this.page.number}`;
    this.canvas = this.isStatic ? new fabric.StaticCanvas(id) : new fabric.Canvas(id);
    this.canvas.setWidth(500);
    this.canvas.setHeight(700);
    this.canvas.loadFromJSON(this.page.annotations, this.canvas.renderAll.bind(this.canvas))
    if (!this.isStatic) {
      this.canvas.setBackgroundColor('rgba(100,100,100,0.3)', this.canvas.renderAll.bind(this.canvas));
    }
    this.canvas.on('mouse:down', (options: IEvent) => {
      if (this.isStatic) {
        return;
      }
      if (options.target) {
        return;
      }
      if (!this.objectValue || !this.color) {
        return;
      }
      const objects = {
        square: fabric.Rect,
        circle: fabric.Circle,
        text: fabric.IText
      }

      const objectOptions = {
        square: {
          left: options.e.layerX,
          top: options.e.layerY,
          fill: this.color,
          width: 20,
          height: 20,
          stroke: this.color !== 'transparent' ? this.color : 'black',
          strokeWidth: 0.2
        },
        circle: {
          left: options.e.layerX,
          top: options.e.layerY,
          fill: this.color,
          radius: 20,
          stroke: this.color !== 'transparent' ? this.color : 'black',
          strokeWidth: 0.2
        },
        text: {
          fontSize: 20,
          border: this.color,
          left: options.e.layerX,
          top: options.e.layerY,
          fill: this.color !== 'transparent' ? this.color : 'black',
        }
      }
      
      this.object = this.objectValue === 'text'
        ? new objects[this.objectValue]('edit me', objectOptions[this.objectValue])
        : new objects[this.objectValue](objectOptions[this.objectValue]);
      this.canvas.add(this.object);

    })
  }


  emitDone(): void {
    this.done.emit(true);
  }

  cancelCanvas(): void {
    this.emitDone();
  }

  saveCancas(): void {
    this.canvas.setBackgroundColor('', this.canvas.renderAll.bind(this.canvas));
    this.page.annotations = this.canvas.toJSON();
    this.emitDone();
  }

  changeObject(value: string): void {
    this.objectValue = value;
  }

  changeColor(value: string) {
    this.color = value;
  }

}
