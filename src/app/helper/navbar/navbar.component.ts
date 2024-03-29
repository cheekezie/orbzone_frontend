import { UtilService } from 'src/app/Services/util.service';
import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
declare const window: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navViewPort = false;
  url = "";
  search_term = "";
  show_search = false;
  logged_In : boolean ;
  notification_count = 0;
  user:any;
  constructor(
    private router: Router,
    private util: UtilService
  ) { }

  ngOnInit(): void {
    this.url = this.router.url;
    this.checkLogin();
    this.util.prifleChange.subscribe(data=>{
      if(data){
        this.user = data;
      }
    })
  }
  checkLogin(){
    if(this.util.isLoggedIn()){
      this.user = this.util.getUserObject()
      this.logged_In = true;
      return
    }
    this.logged_In = false
  }
  //adding condition style to navbar on scroll
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 50) {
      this.navViewPort = true;
    }
    if (number > 280) {
      this.show_search = true;
    }
    if (number < 280) {
      this.show_search = false;
    }
    if (number <= 50){
      this.navViewPort = false;
    }
  }
  menu(){
    let slide = document.getElementById('menu')
    slide.classList.toggle('motion_in')
  }
  search(){
    this.util.searchRoute('search',this.search_term.trim())
  }
  upload(){
    this.router.navigate(['/user'], {
      queryParams: {
        event : 'upload'
      },
      queryParamsHandling: 'merge',
    });
  }
}

