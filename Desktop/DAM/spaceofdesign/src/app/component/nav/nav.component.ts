import { Component, HostListener, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TranslateModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  animations: [
    trigger('animateList', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-500px)'}),
        animate("2s 10ms cubic-bezier(.17,.67,.88,.1)")
      ])
    ])
  ]
})
export class NavComponent implements OnInit{

  public isNavbarVisible: boolean = false;
  private lastScrollTop: number = 0;
  private scrollThreshold: number = 50;
  isToggle: boolean = false;

  constructor(private translate: TranslateService, private service: ClientService) {
    translate.setDefaultLang(this.service.language);
  }

  ngOnInit(): void {
    this.isNavbarVisible = true;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (Math.abs(currentScrollTop - this.lastScrollTop) > this.scrollThreshold) {
      this.isNavbarVisible = currentScrollTop < this.lastScrollTop || currentScrollTop < this.scrollThreshold;
      this.lastScrollTop = currentScrollTop;
    }
  }

  isHide(): void {
    this.isNavbarVisible = true;
  }

  changeToggle() {
    this.isToggle = !this.isToggle;
  }

  closeCollapse() {
    this.isNavbarVisible = false;
    setTimeout(() => {
      this.isNavbarVisible = true;
    },1000);
  }

}
