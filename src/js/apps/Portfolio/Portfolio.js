import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import Typewriter from './components/Typewriter/Typewriter';

import '../../../scss/Global.scss';
import './Portfolio.scss';

class Portfolio extends Component {
    phrases = [
        'full stack developer.',
        'problem solver.',
        'critical thinker.',
        'valuable asset.',
        'horrible designer.'
    ]

    render() {
        return (
            <div>
                <div id="header-con">
                    <div id="header">
                        <h1 className="font heebo mb-0">I'm Nick Neuman,</h1>
                        <Typewriter phrases={this.phrases} prefix='a ' />
                        <a href="/watcher"
                            className="btn btn-primary">
                            Watcher</a>
                    </div>
                </div>
                <div id="warning-banner">
                        <p>I am currently writing some new content, this does not reflect all of my experience.</p>
                    </div>
                <div id="body-con">
                    <div id="body">
                        <div className="section">
                            <h2 className="text-dark font heebo">About Me</h2>
                            <p>I am a self taught developer specialized in building applications using primarily PHP or NodeJS for server side logic. I specialize in many different technologies spanning the entire development cycle and because of this, I am capable of taking a concept and bringing it into a deployable product. To do this I frequently collaborate with multiple departments in order to bring a project to fruition.</p>
                            <p>
                                <a href="https://github.com/neecholaus" target="_blank">Github</a>
                                <span class="pl-10"></span>
                                <a href="https://www.linkedin.com/in/nick-neuman-339569121/" target="_blank">LinkedIn</a>
                            </p>
                        </div>
                        <div className="section">
                            <h2 className="font heebo">My Work</h2>
                            <hr/>
                            <h3 className="mb-0">Custom Docusign Solution</h3>
                            <p className="mt-0">This project was quite exciting. My boss came to me and requested our own custom document signing platform. At that point, we were still using <a href="https://docusign.com" target="_blank" rel="noopener">DocuSign</a>, and while it is relatively cheap considering all it provides, we needed a more efficiently streamlined experience for our users.</p>
                            <p>This is the first time I'd had to work with manipulating PDF's programmatically and in order to begin, I had to take a step back and break the project down. First I had to break it down ask myself what needed to happen. I came up with this essentially:</p>            
                            <ul>
                                <li>A user needed to create a digital signature</li>
                                <li>That signature needed to be added to a document in a specified location.</li>
                            </ul>
                            <p>After some thinking and consulting my coworkers I decided to somehow convert the user's signature into an image, and then place that image on a PDF. I found a library on Github called <a href="https://github.com/szimek/signature_pad" target="_blank" rel="noopener">SignaturePad JS</a> that did some of the heavy lifting. All I had to do was configure it for our system and do some minor styling.</p>
                            <p>Once that was done, I spent some time looking into how to take that image, and insert it into a PDF. I finally stumbled onto FPDI, a library for parsing and manipulating pdfs. With this addon I was able to complete the final step. So now whenever we have a new document needing our user's signature, all I have to do is plug some X & Y coordinates into my code and the rest is taken care of.</p>            
                            <hr/>
                            <h3 className="mb-0">Quick Note Chrome Extension</h3>
                            <p className="mt-0">I was curious about Chrome extensions one day and had a small piece of functionality that I thought would be useful, so I built a small rudimentary extension for a quick and easy method of storing some text you need for later. I have some additions and refinements I plan on making, but it is full functional.</p>
                            <p>
                                <a href="https://github.com/neecholaus/note_extension" target="_blank" rel="noopener" className="mr-3">
                                    <button type="button" className="btn btn-primary mr-10">View Code</button>
                                </a>
                                <a href="https://chrome.google.com/webstore/detail/note-extension/omfeemnkdhbneldmbcoifnfeoabodmbm" target="_blank" rel="noopener">
                                    <button type="button" className="btn btn-primary">View in Chrome Store</button>
                                </a>
                            </p>
                            <hr/>
                            <h3 className="mb-0">CSV to JSON Converter</h3>
                            <p className="mt-0">This was a small piece of functionality I made for a coworker to that allowed him to increase his productivity. He was familiar with the terminal and wanted to use it more, so he requested a CLI. The overall process was not too difficult, but the outcome was quite helpful. Feel free to use or check it out <a href="https://github.com/neecholaus/csv-to-json-converter" target="_blank">here</a>.</p>
                            <p>
                                <a href="https://github.com/neecholaus/csv-to-json-converter" target="_blank" rel="noopener">
                                    <button type="button" className="btn btn-primary">View Code</button>
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
    }
    
    ReactDOM.render(<Portfolio />, document.getElementById('app'));