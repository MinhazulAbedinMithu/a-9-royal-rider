import React from 'react';

const Destination = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <form>
                        <div class="mb-3">
                            <label for="pickFrom" class="form-label">Pick From</label>
                            <input type="text" class="form-control" id="pickFrom"/>
                        </div>
                        <div class="mb-3">
                            <label for="pickTo" class="form-label">Pick To</label>
                            <input type="text" class="form-control" id="pickTo"/>
                        </div>
                        <input type="submit" class=" form-control btn btn-primary" value='Submit'/>
                    </form>
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-8">
                <div></div>
                </div>
            </div>
        </div>
    );
};

export default Destination;