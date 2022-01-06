|Build Status| |Codecov|

frontend-app-classroom
======================

This is a micro-frontend application responsible for the display and management of classrooms.


-----------------

Project Structure
-----------------

The source for this project is organized into nested submodules according to the ADR `Feature-based Application Organization <https://github.com/edx/frontend-template-application/blob/master/docs/decisions/0002-feature-based-application-organization.rst>`_.

Develpment
-------------------

Pre-requisites
^^^^^^^^^^^^^^

- `Tutor dev <https://github.com/overhangio/tutor>`_ must be running
- The `discovery service <https://github.com/overhangio/tutor-discovery>`_ must be running
- The `learning hub service <https://github.com/Dicey-Tech/dt-classroom-plugin>`_ must be running
- Setup an enterprise with an enterprise admin

Configuration and Deployment
----------------------------

This MFE is configured via node environment variables supplied at build time (see .env file). 

List of variables specific to this MFE that must be defined:
- `CLASSROOM_BASE_URL`

.. image:: https://raw.githubusercontent.com/Dicey-Tech/frontend-app-classroom/master/docs/screenshots/classroom.png
     :alt: Classroom MFE Screenshot

.. |Build Status| image:: https://api.travis-ci.com/Dicey-Tech/frontend-app-classroom.svg?branch=master
   :target: https://travis-ci.com/Dicey-Tech/frontend-app-classroom
.. |Codecov| image:: https://codecov.io/gh/Dicey-Tech/frontend-app-classroom/branch/master/graph/badge.svg
   :target: https://codecov.io/gh/Dicey-Tech/frontend-app-classroom