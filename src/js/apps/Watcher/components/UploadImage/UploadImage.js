import React, {Component} from 'react';

import './UploadImage.scss';

class UploadImage extends Component {
    render() {
        const takenAt = new Date();

        return (
            <div id="container">
                <div id="content">
                    <h3 className="mt-20 mb-20">Upload Image</h3>
                    <form 
                        action="/watcher/upload" 
                        method="POST" 
                        encType="multipart/form-data">
                        <input 
                            type="hidden"
                            name="taken_at" 
                            value={takenAt} />
                        <div className="p-20 mt-20 mb-20 bg-light">
                            <input 
                                type="file" 
                                name="file" />
                        </div>
                        <button 
                            type="submit"
                            className="btn btn-primary">
                            <i className="fa fa-upload"></i> Upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UploadImage;