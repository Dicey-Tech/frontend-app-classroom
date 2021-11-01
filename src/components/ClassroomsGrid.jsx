import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col } from '@edx/paragon';

const ClassroomGrid = ({ classrooms, onRowClick }) => (
  <Row className="mt-3">
    <Col>
      <table className="table  table-hover">
        <thead className="thead-light">
          <tr>
            <th scope="col">Classroom</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((classroom) => (
            <tr key={classroom.uuid} onClick={() => onRowClick(classroom.uuid)}>
              <td>{classroom.name}</td>
              <td>{classroom.active ? 'active' : 'archived'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Col>
  </Row>
);

export default ClassroomGrid;

ClassroomGrid.propTypes = {
  classrooms: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      active: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  onRowClick: PropTypes.func.isRequired,
};
