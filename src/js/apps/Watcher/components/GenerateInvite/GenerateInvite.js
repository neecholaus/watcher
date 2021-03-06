import React, {Component} from 'react';

import './GenerateInvite.scss';

class GenerateInvite extends Component {
    state = {
        token: null
    }

    fetchToken = () => {
        this.setState({token: null});

        fetch('/watcher/gen-token', {
            method: 'POST'
        })
            .then(res => res.json())
            .then(res => {
                this.setState({token:res.token});
            })
            .catch(err => {
                console.log('Token could not be generated.');
            });
    }

    copyLink = () => {
        let input = document.createElement('input');
        let link = `https://nickneuman.co/watcher/register?token=${this.state.token}`;

        document.body.appendChild(input);
        input.value = link;
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);

        console.log('Invite link has been copied.');
    }

    render() {
        let generateIcon = 'fa fa-refresh';

        return (
            <div id="container">
                <div id="content">
                <h3 className="mt-20 mb-10">Generate invite link</h3>

                {this.state.token ? (
                    <div className="bg-light p-20 mb-10 text-muted rounded">
                        <p className="m-0">https://nickneuman.co/watcher/register?token=<span className="text-success bold">{this.state.token}</span></p>
                    </div>
                ) : null}

                <button 
                    type="button"
                    className="btn btn-primary mr-10"
                    onClick={this.fetchToken}>
                    <i className={generateIcon}></i> { this.state.token ? 'New' : 'Generate' }
                </button>

                {this.state.token ? (
                    <button 
                        type="button"
                        className="btn btn-primary"
                        onClick={this.copyLink}>
                        <i className="fa fa-clipboard"></i> Copy
                    </button>
                ) : null}
                </div>
            </div>
        );
    }
}

export default GenerateInvite;