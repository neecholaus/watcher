import React, {Component} from 'react';

import './UploadImage.scss';

class UploadImage extends Component {
    render() {
        const takenAt = new Date();

        return (
            <div className="container">
                <div className="block">
                    <h3 className="mt-20 mb-20">Upload Image</h3>
                    <form
                        action="/watcher/upload"
                        method="POST"
                        encType="multipart/form-data">
                        <input
                            type="hidden"
                            name="taken_at"
                            value={takenAt} />
                        <div className="p-20 mt-20 mb-20 bg-dark border-darkest">
                            <input
                                type="file"
                                name="file" />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-utility">
                            <i className="fa fa-upload"></i> Upload
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default UploadImage;