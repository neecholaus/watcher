import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    phrases: string[] = [
        'problem solver',
        'critical thinker',
        'valuable asset',
        'Full Stack Developer'
    ];

    currentPhrase = this.phrases[0];

    currentLetters: string = '';

    currentSplitLetters: string[] = this.currentPhrase.split('');

    index = 0;

    ngOnInit() {
        let self = this;

        let endCount = 0;

        let next = false;

        setInterval(() => {
            // If letters in split array
            if (self.currentSplitLetters.length >= 1) {
                // Add letter
                self.currentLetters += self.currentSplitLetters.splice(0, 1);
            } else {
                endCount++;

                if (endCount > 30) {
                    endCount = 0;

                    // If at end of phrases
                    if (self.index >= self.phrases.length - 1) {
                        // Restart phrases
                        self.index = 0;
                    } else {
                        // Go to next
                        self.index++
                    }

                    self.currentPhrase = self.phrases[self.index];
                    self.currentLetters = '';
                    self.currentSplitLetters = self.currentPhrase.split('');
                }
            }
        }, 50);
    }
}
