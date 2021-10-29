import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { getAuthenticatedUser } from '@edx/frontend-platform/auth';
import {
  Button, Container, Row, Col,
} from '@edx/paragon';
import ClassroomApiService from '../app/services/ClassroomApiService';
import UserService from '../app/services/UserService';

const fetchClassroomsData = async () => {
  const response = await ClassroomApiService.getAllClassrooms();
  return response.data;
};

const ManageClassroomsContainer = () => {
  const [classrooms, setClassrooms] = useState({ count: 0, results: [] });
  const [isLoading, setIsLoading] = useState(false);
  console.log(getAuthenticatedUser(), 'authenticated use');

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

  const onCreateClassroomClick = () => {
    history.push('/create/');
  };

  return (
    <>
      {isLoading ? <h1>Loading</h1>
        : (
          <Container className="pt-3 pb-3">
            {!UserService.isOpenEdxAdmin() && (
            <Row>
              <Col>
                <Button onClick={onCreateClassroomClick}>Create Classroom</Button>
              </Col>
            </Row>
            )}
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
                    {classrooms.results.map((classroom) => (
                      <tr key={classroom.uuid} onClick={() => classroomClick(classroom.uuid)}>
                        <td>{classroom.name}</td>
                        <td>{classroom.active ? 'active' : 'archived'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Container>
        )}
    </>
  );
};

export default ManageClassroomsContainer;
