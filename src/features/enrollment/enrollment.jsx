import {
  Card, useToggle, AvatarButton, IconButton,
} from '@edx/paragon';
import React from 'react';
import { useSelector } from 'react-redux';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AddStudentDialog from '../../components/AddStudentDialog';

const Enrollment = () => {
  const enrollmentStudents = useSelector(state => state.enrollment.students);
  const [isOpen, open, close] = useToggle(false);

  return (
    <Card>
      <Card.Header>
        <div className="d-flex justify-content-between">
          <h2>Your Students</h2>
          <IconButton icon={faUserPlus} onClick={open} />
          <AddStudentDialog isOpen={isOpen} close={close} />
        </div>
      </Card.Header>
      <Card.Body>
        <ul style={{ listStyleType: 'none' }}>
          {enrollmentStudents.map((element) => (
            <li key={element.studentId}>
              <AvatarButton size="md" src={element.imageUrl}>
                {element.email}
              </AvatarButton>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Enrollment;
