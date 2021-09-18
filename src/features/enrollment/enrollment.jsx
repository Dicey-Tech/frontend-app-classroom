import {
  Card, Button, useToggle, AvatarButton,
} from '@edx/paragon';
import React from 'react';
import { useSelector } from 'react-redux';
import AddStudentDialog from '../../components/AddStudentDialog';
import AvatarImage from '../../assets/StudentAvatar.png';

const Enrollment = () => {
  const enrollmentStudents = useSelector(state => state.enrollment.students);
  // const status = useSelector(state => state.enrollment.status);
  // const classroomId = useSelector(state => state.classroom.classroomId);

  // const classroomId = useSelector(state => state.classroom.classroomId)
  // const dispatch = useDispatch();
  /* I don't think I need useEffect as the data is loaded by the classroom and update via
      a button when adding students    useSelector has set up the dependencies so
      component shoul respond to those ?? */
  /*
  useEffect(() => {
    if (status === 'initial') {
      // dispatch(fetchStudentsForClassroom(classroomId))
    }
  }, [classroomId, enrollmentStudents, status, dispatch]);
  */

  const [isOpen, open, close] = useToggle(false);

  return (
    <Card>
      <Card.Header>
        <span>
          <h2>Your Students</h2>
          <Button onClick={open}>+</Button>
          <AddStudentDialog isOpen={isOpen} close={close} />
        </span>
      </Card.Header>
      <Card.Body>
        <ul style={{ listStyleType: 'none' }}>
          {enrollmentStudents.map((element) => (
            <li key={element.studentId}>
              <AvatarButton size="md" src={AvatarImage}>
                {element.firstName}&nbsp;{element.lastName}
              </AvatarButton>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default Enrollment;
