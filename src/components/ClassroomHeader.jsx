import React from 'react';
import { Image } from '@edx/paragon';
import imageURL from '../assets/ClassroomCover.svg';

const ClassroomHeader = (props) => (
  <div className="classroom-header">
    <div className="background-image">
      <Image src={imageURL} alt="background image" />
    </div>

    <div className="title">
      <h2>{props.title}</h2>
    </div>
  </div>
);

export default ClassroomHeader;
