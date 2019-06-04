import React, {Component} from 'react';

class UploadImage extends Component {
    render() {
        const takenAt = new Date();

        return (
            <div>
                <h5 className="mt-2 mb-4">Upload Image</h5>
                <form 
                    action="/watcher/upload" 
                    method="POST" 
                    encType="multipart/form-data">
                    <input 
                        type="hidden"
                        name="taken_at" 
                        value={takenAt} />
                    <div className="p-2 mt-2 mb-2">
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
        );
    }
}

export default UploadImage;