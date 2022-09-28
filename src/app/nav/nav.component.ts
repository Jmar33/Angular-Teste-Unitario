import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {}

  navTo(path: string) {
    this.route.navigate([`/${path}`]);
  }
}
