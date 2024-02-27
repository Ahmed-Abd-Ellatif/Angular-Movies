import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-embed',
  templateUrl: './video-embed.component.html',
  styleUrls: ['./video-embed.component.scss'],
})
export class VideoEmbedComponent implements OnInit {
  @Input() site: string = 'Youtube';
  @Input() key: string | null = null;
  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  videoUrl: SafeResourceUrl = '';
  ngOnInit(): void {
    this.videoUrl = this.getSafeUrl(
      'https://www.youtube.com/embed/' + this.key
    );
  }
}
