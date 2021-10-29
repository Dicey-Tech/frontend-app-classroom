import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ClassroomApiService from '../app/services/ClassroomApiService';

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

  return (
    <>
      {isLoading ? <h1>Loading</h1>
        : (
          <div className="row justify-content-center p-3">
            <table className="table  table-hover">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Classroom</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.results.map((classroom) => (
                  <tr onClick={() => classroomClick(classroom.uuid)}>
                    <td>{classroom.name}</td>
                    <td>{classroom.active ? 'active' : 'archived'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </>
  );
};

export default ManageClassroomsContainer;
