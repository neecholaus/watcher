import React, {Component} from 'react';

import './Typewriter.scss';

class Typewriter extends Component {
    state = {
        highlight: 'transparent',
        currentLetters: ''
    }

    phrases = this.props.phrases

    componentDidMount = () => {
        let currentPhrase = this.phrases[0];
        let currentSplitLetters = currentPhrase.split('');
        let index = 0;
        let self = this;
        let endCount = 0;

        setInterval(() => {
            // If letters in split array
            if (currentSplitLetters.length >= 1) {
                // Add letter
                let newLetters = self.state.currentLetters += currentSplitLetters.splice(0, 1);
                self.setState({currentLetters: newLetters});
                self.setState({highlight: 'transparent'});
            } else {
                endCount++;

                if(endCount > 20) self.setState({highlight: 'rgba(255,255,255,0.3)'});

                if (endCount > 30) {
                    endCount = 0;
                    // If at end of phrases
                    if (index >= self.phrases.length - 1) {
                        // Restart phrases
                        index = 0;
                    } else {
                        // Go to next
                        index++;
                    }

                    currentPhrase = self.phrases[index];
                    self.setState({currentLetters: ''});
                     
                    currentSplitLetters = currentPhrase.split('');
                }
            }
        }, 50);
    }

    render() {
        const {prefix} = this.props;

        const styles = {
            backgroundColor: this.state.highlight
        };

        return (
            <div className="typewriter">
                <h5 className="font heebo">
                    { prefix }
                    <span id="phrase" style={styles}>
                        { this.state.currentLetters }
                        <span className="cursor"></span>
                    </span>
                </h5>
            </div>
        )
    }
}

export default Typewriter;