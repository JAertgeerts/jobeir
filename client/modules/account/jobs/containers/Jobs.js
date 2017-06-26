import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router';
import { getJobs } from '../../../create/job/ducks/';
import JobsFilter from './JobsFilter';
import JobsList from '../components/JobsList';

class Jobs extends Component {
  componentDidMount() {
    const { companies, dispatch } = this.props;
    dispatch(getJobs(companies.activeCompany._id));
  }

  render() {
    const { companies, jobs } = this.props;
    const hasJobPostings = jobs.postings.length;

    return (
      <div>
        {hasJobPostings
          ? <div>
              <JobsContainer>
                <JobsFilter />
                <JobsList jobs={jobs.postings} />
              </JobsContainer>
            </div>
          : <Link to={`/create/job/about/${companies.activeCompany._id}`}>
              Create a job
            </Link>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  companies: state.companies,
  jobs: state.jobs
});

export default connect(mapStateToProps)(Jobs);

const JobsContainer = styled.div`
  max-width: 100%;
`;
