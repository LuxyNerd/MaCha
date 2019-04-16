import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPT } from '../../actions/projectTaskActions';
import classnames from 'classnames';

class AddPT extends Component {
  constructor() {
    super();
    this.state = {
      summary: '',
      acceptanceCriteria: '',
      status: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    //after onChange should get the onSubmit content in const below
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value }); //e for event, so a array of targets
  }
  onSubmit(e) {
    e.preventDefault();
    const newProjectTask = {
      summary: this.state.summary,
      acceptanceCriteria: this.state.acceptanceCriteria,
      status: this.state.status
    };

    this.props.addPT(newProjectTask, this.props.history);
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="addPT">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/" className="btn btn-light">
                Back to Board
              </Link>
              <h4 className="display-4 text-center">
                Add /Update Project Task
              </h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', {
                      // makes the box red
                      'is-invalid': errors.summary
                    })}
                    name="summary" //should be the same like in server
                    value={this.state.summary}
                    placeholder="Project Task summary"
                    onChange={this.onChange}
                  />
                  {/* gives feedback, which is defined in backend @NotBlank */}
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddPT.propTypes = {
  addPT: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPT }
)(AddPT);
