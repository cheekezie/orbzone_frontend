import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/Services/util.service';
import { ApiService } from './../../Services/api.service';
declare const window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  active_tab = "Home";
  search_term = ""
  show_search = true;
  initialLoader = true;
  shimmer = false;
  tabs = [
    "Home",
    "Discover",
    "Illustrations",
    "New"
  ];
  params = {
    name: '',
    start: '',
    end: ''
  }
  gallery = [];
  constructor(
    private imageService: ApiService,
    private util: UtilService,
    private api: ApiService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.publicImages();
  }
  //toggling baner search area on window scroll
  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number < 350) {
      this.show_search = true;
    }else{
      this.show_search = false;
    }
  }
  async publicImages(){
      this.shimmer = true;
      this.api.searchImage(this.params).subscribe((res:any)=>{
        this.gallery = res.data.images.data;
        this.shimmer = false
      })
  }
  changeTab(item){
    this.active_tab = item;
  }
  keypress(){
    if(this.search_term.trim().length > 2){
      setTimeout(() => {
        this.search()
      }, 5000);
    }
  }
  enter(){
    this.search()
  }
  search(){
    this.util.searchRoute('/search',this.search_term.trim())
  }
  open(item: Object): void {
    this.util.open(item)
  }
  addCollection(item:Object){
    this.util.addCollection(item)
  }
  share(item:Object){
    this.util.share(item);
  }
}
