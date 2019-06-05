import React, {Component} from 'react';

class CaptureCanvas extends Component {
    state = {
        specificCaptureFilename: 'default',
        specificCaptureSrc: null,
        currentCapture: null,
        currentCaptureSrc: null,
        time: null,
        times: []
    }

    fetchMostRecent = () => {
        fetch('/watcher/most-recent', {method:'POST'})
            .then(res => res.json())
            .then(res => {
                this.state.currentCaptureSrc = '/watcher/capture/' + res.filename;
                this.state.currentCapture = res;
                this.state.currentCapture.taken_at = this.formatDate(this.state.currentCapture.taken_at);
            })
            .catch(() => {
            this.state.currentCaptureSrc = null;
            this.state.currentCapture = null;
        });
    }

    formatDate = (str) => {
        let meridiem = 'AM';
        let obj = new Date(str);
        let day = obj.toDateString();

        let hour = obj.getHours();
        if(hour > 12) {
            hour = hour - 12;
            meridiem = 'PM';
        }

        let minutes = obj.getMinutes();
        if(minutes < 10) minutes = '0' + minutes.toString();

        let seconds = obj.getSeconds();
        if(seconds < 10) seconds = '0' + seconds.toString();

        return `${day} ${hour}:${minutes}:${seconds} ${meridiem}`;
    }

    fetchTimes = () => {
        this.times = null;
        setTimeout(() => {
            fetch('/watcher/times', {method:'POST'})
                .then(res => res.json())
                .then(res => {
                    this.setState({times: [...res]})
                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);
    }

    setSpecificCapture = e => {
        this.setState({specificCaptureSrc: '/watcher/capture/' + e.target.value});
    }

    componentDidMount = () => {
        let self = this;

        console.log(this.state);

        // Get times for selector
        this.fetchTimes();

        // Initial request;
        this.fetchMostRecent();

        // Interval request
        setInterval(function() {
            self.fetchMostRecent();
        }, 2000);
    }

    onChange = (e) => {
        const {name, value} = e.target;

        console.log(name, value);
    }

    test = () => {
        console.log(this.state);
    }

    render() {
        return (
            <div className="mt-3">
                <h5 className="font heebo">Find a moment</h5>
                <p>{this.state.specificCaptureSrc}</p>
                <button type="button" onClick={this.test}>test</button>
                <select 
                    className="form-control"
                    name="time"
                    onChange={this.setSpecificCapture}>
                    <option defaultValue disabled value="default">Please Select a Time:</option>
                    {this.state.times.map(time => (
                        <option 
                            key={time.filename}
                            value={time.filename}>
                            {this.formatDate(time.taken_at)}
                        </option>
                    ))}
                </select>
                <hr/>
                <div className="text-right">
                    <button 
                        className="btn btn-outline-dark"
                        onClick={this.fetchTimes}>
                        Reload
                    </button>
                    <button 
                        className="btn btn-outline-dark">
                        {/* onClick={this.state.specificCaptureSrc = null}> */}
                        <i className="fa fa-circle text-danger"></i> Live
                    </button>
                </div>
                {this.state.specificCaptureSrc ? (
                        <img 
                            src={this.state.specificCaptureSrc}
                            className="img-fluid" 
                            alt="Specific Moment" />
                ) : this.state.currentCaptureSrc && this.state.currentCapture ? (
                    <div>
                        <p className="mb-0"><span className="text-muted">Taken:</span> <b>{this.state.currentCapture.taken_at}</b></p>
                        <hr/>
                        <div className="text-center">
                            <img 
                                src={this.state.currentCaptureSrc}
                                className="img-fluid" 
                                alt="Current Feed" />
                        </div>
                    </div>
                ) : (
                    <div className="text-center rounded mx-auto p-2 bg-warning text-dark">
                        <h5 className="mb-0"><i className="fa fa-exclamation-triangle"></i> No images could be found.</h5>
                    </div>
                )}
            </div>
        );
    }
}

export default CaptureCanvas;