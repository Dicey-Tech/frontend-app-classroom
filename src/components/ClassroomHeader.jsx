import React from 'react';
import { Image } from '@edx/paragon';
import imageURL from '../assets/GenericBackgroundImage.jpg';

const ClassroomHeader = (props) => (
  <div style={{ position: 'relative' }}>
    <div>
      <Image style={{ width: '100%', height: '400px' }} src={imageURL} />
    </div>

    <div style={{
      position: 'absolute', top: '50%', left: '10%',
    }}
    >
      <h2 style={{ color: 'white' }}>{props.title}</h2>
    </div>
  </div>
);

export default ClassroomHeader;
