import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    currentTab: string = 'work';

    setCurrentTab(tab) {
        this.currentTab = tab;
    }
}
