import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

class ProjectClassification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: "",
            alreadyClassified: false
        }

        this.onStarClick = this.onStarClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const obj = {
            projectID: this.props.project,
            userID: this.props.auth.user.id
        };
        axios.post('/api/projects/getProjectUserStats', obj).then(response => {
            this.setState({
                alreadyClassified: response.data.alreadyClassified
            });
        })
            .catch(error => console.log(error));
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            rating: this.state.rating,
            userID: this.props.auth.user.id
        };
        axios.post('/api/projects/ratingProject/' + this.props.project, obj)
            .catch(err => console.log(err))
        window.location.reload();
    }

    render() {
        const { rating } = this.state;
        return (
            <div>
                {(() => {
                    if (this.props.auth.user.role === "Voluntário" && this.state.alreadyClassified === false) {
                        return (
                            <div>
                                <h5 style={{ color: "#D4AF37" }}><b>Classificar Projeto:</b></h5>
                                <StarRatingComponent
                                    starCount={10}
                                    value={rating}
                                    onStarClick={this.onStarClick.bind(this)}
                                />
                                <button className="waves-effect waves-light btn"
                                    type="submit" onClick={this.onSubmit} style={{ backgroundColor: "#D4AF37", marginLeft: "5%", color: "black", fontWeight: "bold", borderRadius: 10 }}>Submeter</button>
                            </div>
                        )
                    }
                })()}
            </div>
        );
    }
}

ProjectClassification.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(ProjectClassification);