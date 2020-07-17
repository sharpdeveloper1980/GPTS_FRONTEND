import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule }   from '@angular/forms';
// Route
import { routing } from './app.route';
// Package module
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { VgCoreModule } from 'videogular2/core';
import { VgControlsModule } from 'videogular2/controls';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { VgBufferingModule } from 'videogular2/buffering';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';

//Modules
import { GptsSiteModule } from './gpts-site/gpts-site.module';
// import{StudentDashboardModule} from './student-dashboard/student-dashboard.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';


//Services
import { ApiService } from './core/api.service'
import { HeaderService } from './shared/services/header.service';
import { ConstantsService } from './shared/services/constants.service';
import { Interceptor } from './core/interceptor/interceptor';
import { HeartDirective } from './shared/heart.directive';
import { BreadcrumService } from './shared/services/breadcrum.service';





const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    HeartDirective,
    
  ],
  imports: [
    BrowserModule,
    SwiperModule,
    HttpClientModule,
    HttpModule,
    routing,
    FormsModule,
    GptsSiteModule,
    SharedModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    SlickCarouselModule,
    NgbModule,
    DragDropModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    MalihuScrollbarModule.forRoot(),
    ScrollToModule.forRoot(),
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    Interceptor,
    ApiService,
    HeaderService,
    ConstantsService,
    BreadcrumService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
