import PropTypes from 'prop-types';
import React from 'react';
import {
  Navbar, Image, Button, useToggle,
} from '@edx/paragon';
import { AddCircle } from '@edx/paragon/icons';
import { useHistory } from 'react-router';
import AddCourseDialog from './AddCourseDialog';
import AddCourseIcon from '../assets/AddCourse.svg';

const NavigationBar = (props) => {
  const { slug } = props;
  const history = useHistory();

  const [isOpen, open, close] = useToggle(false);

  return (
    <Navbar bg="white" expand="lg" className="row justify-content-md-center navbar">
      <div className="row justify-content-md-center">
        <div className="col-md-auto">
          <Button variant="tertiary" onClick={open}>
            <Image src={AddCourseIcon} style={{ height: 24, width: 24 }} />
            &nbsp;AddCourse
          </Button>
          <AddCourseDialog isOpen={isOpen} close={close} />
        </div>
        <div className="col-md-auto align-middle">
          <Button variant="tertiary" onClick={() => history.push(`/create/${slug}/`)} iconBefore={AddCircle}>
            New Classroom
          </Button>
        </div>
      </div>
    </Navbar>
  );
};

export default NavigationBar;

NavigationBar.propTypes = {
  slug: PropTypes.string.isRequired,
};
