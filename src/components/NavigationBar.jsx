import React from 'react';
import {
  Navbar, Image, Button, useToggle,
} from '@edx/paragon';
import AddCourseDialog from './AddCourseDialog';
import AddCourseIcon from '../assets/AddCourse.svg';

const NavigationBar = () => {
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
      </div>
    </Navbar>
  );
};

export default NavigationBar;
