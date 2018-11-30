import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Output() tabChange = new EventEmitter<string>();
    currentTab = 'about';

    phrases: string[] = [
        'full stack developer.',
        'problem solver.',
        'critical thinker.',
        'valuable asset.'
    ];

    currentPhrase = this.phrases[0];

    displayed: string = '';

    letterBank: string[] = this.currentPhrase.split('');

    index = 0;

    phraseHighlight: string = 'transparent';

    resetPhrase() {
        this.currentPhrase = this.phrases[this.index];
        this.displayed = '';
        this.letterBank = this.currentPhrase.split('');
        this.phraseHighlight = 'transparent';
    }

    setTab(tab) {
        this.currentTab = tab;
        this.tabChange.emit(tab);
    }

    ngOnInit() {
        let self = this;

        let endCount = 0;

        let next = false;

        setInterval(() => {
            // If letters in split array
            if (self.letterBank.length >= 1) {
                // Add letter
                self.displayed += self.letterBank.splice(0, 1);
            } else {
                endCount += 50;

                // Add highlight effect after 3.5 seconds
                if (endCount > 3500) {
                    self.phraseHighlight = '#42f4a4';
                }

                // Wait 4 seconds
                // Then change phrases
                if (endCount > 4000) {
                    endCount = 0;

                    // If at end of phrases
                    if (self.index >= self.phrases.length - 1) {
                        // Restart phrases
                        self.index = 0;
                    } else {
                        // Go to next
                        self.index++
                    }

                    self.resetPhrase();
                }
            }
        }, 50);
    }
}
