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
        'valuable asset.'
    ]

    render() {
        return (
            <div>
            <div id="site-header">
            <div className="container">
            <div className="row mx-0">
            <div className="col-md-10 col-lg-8 p-1">
            <h1 className="font heebo">I'm Nick Neuman,</h1>
            <Typewriter phrases={this.phrases} prefix='a ' />
            <div className="mt-4">
            <a href="/watcher"
            className="btn btn-transparent">
            Watcher</a>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div className="container pt-3">
            <div className="row">
            <div className="col-sm-10 col-md-6 col-xl-4 mx-auto">
            <div className="bg-light p-3 rounded mt-3 text-muted">
            <h3 className="text-dark font heebo bold">About Me</h3>
            <hr/>
            <p>I am a self taught developer specialized in building applications using primarily PHP or NodeJS for server side logic. I specialize in many different technologies spanning the entire development cycle and because of this, I am capable of taking a concept and bringing it into a deployable product. To do this I frequently collaborate with multiple departments in order to bring a project to fruition.</p>
            </div>
            </div>
            
            <div className="col-sm-10 col-md-6 col-xl-8 mx-auto">
            <div className="bg-light p-3 rounded mt-3 text-muted">
            <h3 className="text-dark font heebo bold">My Work</h3>
            <hr/>
            <p className="text-dark font bold">Custom Docusign Solution</p>
            <p>This project was quite exciting. My boss came to me and requested our own custom document signing platform. At that point, we were still using <a href="https://docusign.com" target="_blank" rel="noopener">DocuSign</a>, and while it is relatively cheap considering all it provides, we needed a more efficiently streamlined experience for our users.</p>
            
            <p>This is the first time I'd had to work with manipulating PDF's programmatically and in order to begin, I had to take a step back and break the project down. First I had to break it down ask myself what needed to happen. I came up with this essentially:</p>
            
            <ul>
            <li><span>A user needed to create a digital signature</span></li>
            <li><span>That signature needed to be added to a document in a specified location.</span></li>
            </ul>
            
            <p>After some thinking and consulting my coworkers I decided to somehow convert the user's signature into an image, and then place that image on a PDF. I found a library on Github called <a href="https://github.com/szimek/signature_pad" target="_blank" rel="noopener">SignaturePad JS</a> that did some of the heavy lifting. All I had to do was configure it for our system and do some minor styling.</p>
            
            <p>Once that was done, I spent some time looking into how to take that image, and insert it into a PDF. I finally stumbled onto FPDI, a library for parsing and manipulating pdfs. With this addon I was able to complete the final step. So now whenever we have a new document needing our user's signature, all I have to do is plug some X & Y coordinates into my code and the rest is taken care of.</p>
            
            <hr/>
            <p className="text-dark font bold">Quick Note Chrome Extension</p>
            <p>I was curious about Chrome extensions one day and had a small piece of functionality that I thought would be useful, so I built a small rudimentary extension for a quick and easy method of storing some text you need for later. I have some additions and refinements I plan on making, but it is full functional.</p>
            
            <a href="https://github.com/neecholaus/note_extension" target="_blank" rel="noopener" className="mr-3">
            <button type="button" className="btn btn-primary">View Code</button>
            </a>
            <a href="https://chrome.google.com/webstore/detail/note-extension/omfeemnkdhbneldmbcoifnfeoabodmbm" target="_blank" rel="noopener">
            <button type="button" className="btn btn-primary">View in Chrome Store</button>
            </a>
            
            
            <hr/>
            <p className="text-dark font bold">CSV to JSON Converter</p>
            <p>This was a small piece of functionality I made for a coworker to that allowed him to increase his productivity. He was familiar with the terminal and wanted to use it more, so he requested a CLI. The overall process was not too difficult, but the outcome was quite helpful. Feel free to use or check it out <a href="https://github.com/neecholaus/csv-to-json-converter" target="_blank">here</a>. The overall process was not too difficult, but the outcome was quite useful.</p>
            <a href="https://github.com/neecholaus/csv-to-json-converter" target="_blank" rel="noopener">
            <button type="button" className="btn btn-primary">View Code</button>
            </a>
            </div>
            </div>
            
            </div>
            </div>
            </div>
            )
        }
    }
    
    ReactDOM.render(<Portfolio />, document.getElementById('app'));