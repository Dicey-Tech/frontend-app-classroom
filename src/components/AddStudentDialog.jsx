import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  ModalDialog, Form, Button, ActionRow, Spinner,
} from '@edx/paragon';
import { useSelector, useDispatch } from 'react-redux';

import ClassroomApiService from '../app/services/ClassroomApiService';
import { fetchStudentsForClassroom } from '../features/enrollment/enrollmentSlice';

const AddStudentDialog = ({ isOpen, close }) => {
  const emailsRef = useRef('');
  const classroomId = useSelector(store => store.classroom.classroomId);
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const addStudents = async () => {
    const studentEmails = emailsRef.current.value;
    if (studentEmails !== '') {
      try {
        setIsProcessing(true);
        await ClassroomApiService.addBulkEnrollmentToClassroom(classroomId, studentEmails);
        dispatch(fetchStudentsForClassroom(classroomId));
        emailsRef.current.value = '';
        close();
      } catch (e) {
        alert('An error occured adding students to the classroom.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <ModalDialog title="Add New Student" isOpen={isOpen} onClose={close} hasCloseButton size="lg">
      <ModalDialog.Header>
        Add Students
      </ModalDialog.Header>
      <ModalDialog.Body>
        <Form>
          <Form.Row>
            <Form.Control
              as="textarea"
              style={{ height: '10em', minWidth: '40em' }}
              placeholder="paste list of email addresses here, one per line"
              ref={emailsRef}
            />
          </Form.Row>
        </Form>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary" disabled={isProcessing}>
            Cancel
          </ModalDialog.CloseButton>
          <Button variant="primary" onClick={addStudents} disabled={isProcessing}>
            {isProcessing && (<><Spinner animation="border" size="sm" />&nbsp;</>)}Add Students
          </Button>
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

export default AddStudentDialog;

AddStudentDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};
