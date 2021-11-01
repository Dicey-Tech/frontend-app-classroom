import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import {
  Button, Container, Row, Col, useToggle,
} from '@edx/paragon';
import ClassroomApiService from '../app/services/ClassroomApiService';
import UserService from '../app/services/UserService';
import ClassroomsGrid from '../components/ClassroomsGrid';
import CreateClassroomDialog from '../components/CreateClassroomDialog';

const fetchClassroomsData = async () => {
  const response = await ClassroomApiService.getAllClassrooms();
  return response.data;
};

const ManageClassroomsContainer = () => {
  const [classrooms, setClassrooms] = useState({ count: 0, results: [] });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const doCall = () => fetchClassroomsData();

    setIsLoading(true);
    doCall().then(result => setClassrooms(result)).finally(setIsLoading(false));
  }, []);

  const history = useHistory();
  const classroomClick = (classroomId) => {
    const classroomURL = `/${classroomId}/`;
    history.push(classroomURL);
  };

  const [isOpen, open, close] = useToggle(false);

  return (
    <>
      {isLoading ? <h1>Loading</h1>
        : (
          <Container className="pt-3 pb-3">
            {UserService.canUserCreateClassroom() && (
              <Row>
                <Col>
                  <Button onClick={open}>Create Classroom</Button>
                  <CreateClassroomDialog isOpen={isOpen} close={close} />
                </Col>
              </Row>
            )}
            <ClassroomsGrid classrooms={classrooms.results} onRowClick={classroomClick} />
          </Container>
        )}
    </>
  );
};

export default ManageClassroomsContainer;
