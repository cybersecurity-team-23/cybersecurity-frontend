import {AfterViewInit, Component, Input} from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";
import { Image } from "../../../images/image.model";

@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css'],
  animations: [
    trigger('imageSlide', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('450ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('450ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class ImageCarouselComponent implements AfterViewInit{
  @Input() images!: string[];

  currentImage!: string | undefined;
  currentIndex = 0;

  ngAfterViewInit() {
    this.currentImage = this.images.length > 0 ? this.images[0] : undefined;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.currentImage = this.images[this.currentIndex];
  }
}
