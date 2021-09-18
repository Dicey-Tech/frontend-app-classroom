import React from 'react';
import {
  ModalDialog, Form, Button, ActionRow,
} from '@edx/paragon';

const AddStudentDialog = ({ isOpen, close }) => (
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
          />
        </Form.Row>
      </Form>
    </ModalDialog.Body>
    <ModalDialog.Footer>
      <ActionRow>
        <ModalDialog.CloseButton variant="tertiary">
          Cancel
        </ModalDialog.CloseButton>
        <Button variant="primary">
          Add Students
        </Button>
      </ActionRow>
    </ModalDialog.Footer>
  </ModalDialog>
);

export default AddStudentDialog;
