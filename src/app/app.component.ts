import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationCancel,
  NavigationEnd,
} from '@angular/router';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { filter } from 'rxjs/operators';
import { Auth } from './classes/auth';
declare let $, mobile_menu_visible, $toggle, jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    Location,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
})
export class AppComponent implements OnInit {
  location: any;
  routerSubscription: any;

  constructor(private router: Router) {}

  ngOnInit() {
    this.recallJsFuntions();
  }

  recallJsFuntions() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        (function ($) {
          'use strict';
          /*--
                    Commons Variables
                -----------------------------------*/
          var $body = $('body');
          var $layer = $('<div class="close-layer"></div>');

          /*--
                    Off Canvas Function
                -----------------------------------*/

          $('.close-layer').remove();
          setTimeout(function () {
            $toggle.removeClass('toggled');
          }, 400);
          $('html').removeClass('nav-open');
          $layer.removeClass('visible');
        })(jQuery);
      }
    });
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationEnd || event instanceof NavigationCancel
        )
      )
      .subscribe((event) => {
        // $.getScript('assets/js/material-dashboard');
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }
}
