import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div>
                <div className="title-container">
                    <h4>Login</h4>
                </div>
                <form className="well form-horizontal">
                    <div className="form-group">
                        <label className="col-md-4 control-label">E-Mail</label>
                        <div className="col-md-4 inputGroupContainer">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fas fa-envelope-square"></i></div>
                                </div>
                                <input name="email" placeholder="Email" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-4 control-label">Password</label>
                        <div className="col-md-4 inputGroupContainer">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="fas fa-key"></i></div>
                                </div>
                                <input name="user_name" placeholder="Password" className="form-control" type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group pr-1 pl-1 pt-3">
                        <button className="btn btn-primary w-100">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;