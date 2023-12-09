import { AfterViewInit, Component, Input, ElementRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from "@angular/animations";
import {delay} from "rxjs";

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
export class ImageCarouselComponent implements AfterViewInit {
  @Input() images!: string[];

  currentImage!: string | undefined;
  currentIndex = 0;
  isLoading = false;

  ngAfterViewInit() {
    this.loadImage(this.currentIndex);
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.loadImage(this.currentIndex);
  }

  prevImage() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.loadImage(this.currentIndex);
  }

  private loadImage(index: number): void {
    this.currentImage = undefined;
    this.isLoading = true;

    const img = new Image();

    img.src = this.images[index];

    img.addEventListener('load', () => {
      // Once the image is loaded, set it as the current image and stop loading
      this.currentImage = this.images[index];
      this.isLoading = false;
    });

    // Add an event listener for the 'error' event (in case the image fails to load)
    img.addEventListener('error', () => {
      console.error(`Failed to load image: ${this.images[index]}`);
      this.isLoading = false;
    });
  }
}
