import {
  AfterContentChecked,
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  OnInit,
  QueryList, Renderer, Renderer2,
  ViewChildren
} from '@angular/core';
import {MatIcon} from '@angular/material';

@Component({
  selector: 'app-iconbar',
  templateUrl: './iconbar.component.html',
  styleUrls: ['./iconbar.component.css']
})
export class IconbarComponent implements OnInit, AfterContentInit {
  @ContentChildren(MatIcon, {read: ElementRef}) icons: QueryList<ElementRef>;

  // @ViewChildren(MatIcon) icons: QueryList<CustomComponent>;

  constructor(private renderer: Renderer2) {
    // $event.target.classList.add('active');
  }

  // constructor(elementRef: ElementRef, renderer: Renderer) {
  //
  //   // Listen to click events in the component
  //   renderer.listen(elementRef.nativeElement, 'click', (event) => {
  //     // Do something with 'event'
  //   })
  // );


  ngOnInit() {
    // console.log(this.icons);
  }

  ngAfterContentInit() {
    this.icons.forEach(elementRef => {
      elementRef.se
      this.renderer.listen(elementRef.nativeElement, 'click', (event) => {
        console.log(event);
      });
    });
  }

  // markSelected(icon: ElementRef): void {
  //   if(patientDDL.nativeElement.classList.contains('open')) {
  //     this.doSomething();
  //   }
  //   renderer.addClass(hostElement.nativeElement, 'custom-theme');
  //
  //   console.log(event);
  // }
  // onClick(event: MouseEvent): void {
  //   if (event.target.)
  //   console.log(event);
  // }

}
