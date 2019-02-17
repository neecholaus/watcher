<template>
    <div>
        <h5 class="font heebo">
            {{ prefix }}
            <span id="phrase" :style="`background-color:${highlight}`">
                {{ currentLetters }}
                <span id="cursor"></span>
            </span>
        </h5>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                highlight: 'transparent',
                currentLetters: '',
                phrases: [
                    'full stack developer.',
                    'problem solver.',
                    'critical thinker.',
                    'valuable asset.'
                ]
            }
        },
        props: {
            prefix: {
                type: String,
                required: false,
                default: 'test'
            }
        },
        mounted: function() {
            let currentPhrase = this.phrases[0];
            let currentSplitLetters = currentPhrase.split('');
            let index = 0;
            let self = this;
            let endCount = 0;
            let next = false;
            setInterval(() => {
                // If letters in split array
                if (currentSplitLetters.length >= 1) {
                    // Add letter
                    self.currentLetters += currentSplitLetters.splice(0, 1);
                    self.highlight = 'transparent';
                } else {
                    endCount++;

                    if(endCount > 20) self.highlight = 'rgba(255,255,255,0.3)';

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
                        self.currentLetters = '';
                        currentSplitLetters = currentPhrase.split('');
                    }
                }
            }, 50);
        },
        methods: {

        }
    }
</script>

<style scoped>
    #phrase {
        position: relative;
    }
    #cursor {
        animation: ease-in-out 1s blink infinite;
        border-radius: 4px;
        padding: 2px;
        position: absolute;
        top: 0;
        height: 80%;
        right: 0;
    }

    @keyframes blink {
        0% {
            background: rgba(255,255,255,0);
        }
        50% {
            background: rgba(255,255,255,1);
        }
        100% {
            background: rgba(255,255,255,1)
        }
    }
</style>