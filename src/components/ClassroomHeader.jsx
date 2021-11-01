import { PropTypes } from 'prop-types';
import React from 'react';
import { Image } from '@edx/paragon';
import imageURL from '../assets/ClassroomCover.svg';

const ClassroomHeader = (props) => (
  <div className="classroom-header">
    <div className="background-image">
      <Image src={imageURL} alt="background image" />
    </div>

    <div>
      <span className="title">{props.title}</span>
    </div>
  </div>
);

export default ClassroomHeader;

ClassroomHeader.defaultProps = {
  title: '',
};

ClassroomHeader.propTypes = {
  title: PropTypes.string,
};
