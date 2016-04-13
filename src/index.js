import React from 'react';
import ReactDOM from 'react-dom';
import Utils from './Utils';
import _ from 'underscore';

import Framework from './Framework';

import Views from './Dropdown';

var items = [
  {
    "filterId": "agent-2",
    "filterText": "First2 Last2 (002, agent2@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-2",
      "userName": "user2",
      "password": "123456",
      "fullName": "First2 Last2",
      "extension": "002",
      "email": "agent2@five9.com",
      "active": true,
      "features": [
        "scc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "history",
    "typeLabel": "Agent",
    "label": "First2 Last2 (002, agent2@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-4",
    "filterText": "Adam Levine (004, agent4@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-4",
      "userName": "user4",
      "password": "123456",
      "fullName": "Adam Levine",
      "extension": "004",
      "email": "agent4@five9.com",
      "active": true,
      "features": [
        "scc",
        "vcc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "Adam Levine (004, agent4@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-5",
    "filterText": "Dustin Williamson (005, agent5@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-5",
      "userName": "user5",
      "password": "123456",
      "fullName": "Dustin Williamson",
      "extension": "005",
      "email": "agent5@five9.com",
      "active": true,
      "features": [
        "scc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "Dustin Williamson (005, agent5@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-2",
    "filterText": "First2 Last2 (002, agent2@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-2",
      "userName": "user2",
      "password": "123456",
      "fullName": "First2 Last2",
      "extension": "002",
      "email": "agent2@five9.com",
      "active": true,
      "features": [
        "scc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "First2 Last2 (002, agent2@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-3",
    "filterText": "First3 Last3 (003, agent3@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-3",
      "userName": "user3",
      "password": "123456",
      "fullName": "First3 Last3",
      "extension": "003",
      "email": "agent3@five9.com",
      "active": true,
      "features": [
        "vcc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "First3 Last3 (003, agent3@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-6",
    "filterText": "Jesus Andarro (006, agent6@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-6",
      "userName": "user6",
      "password": "123456",
      "fullName": "Jesus Andarro",
      "extension": "006",
      "email": "agent6@five9.com",
      "active": true,
      "features": [
        "vcc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "Jesus Andarro (006, agent6@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-7",
    "filterText": "Kevin Watkins (007, agent7@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-7",
      "userName": "user7",
      "password": "123456",
      "fullName": "Kevin Watkins",
      "extension": "007",
      "email": "agent7@five9.com",
      "active": true,
      "features": [
        "scc",
        "vcc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "Kevin Watkins (007, agent7@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-8",
    "filterText": "Scott Bryce (008, agent8@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-8",
      "userName": "user8",
      "password": "123456",
      "fullName": "Scott Bryce",
      "extension": "008",
      "email": "agent8@five9.com",
      "active": true,
      "features": [
        "scc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "Scott Bryce (008, agent8@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "agent-9",
    "filterText": "Susan Perkins (009, agent9@five9.com)",
    "filterType": "agents",
    "filterModel": {
      "id": "agent-9",
      "userName": "user9",
      "password": "123456",
      "fullName": "Susan Perkins",
      "extension": "009",
      "email": "agent9@five9.com",
      "active": true,
      "features": [
        "vcc"
      ],
      "timeZoneID": "America/Los_Angeles",
      "loginState": "SELECT_STATION",
      "stationState": "DISCONNECTED",
      "presence": {
        "currentState": {
          "readyChannels": [

          ],
          "notReadyReasonCodeId": ""
        },
        "pendingState": {
          "readyChannels": [
            "CALL"
          ],
          "notReadyReasonCodeId": ""
        },
        "currentStateTime": 0
      },
      "agentsPresence": "LOGGED_OUT",
      "availableChannels": [
        "CALL",
        "CHAT",
        "EMAIL",
        "SOCIAL",
        "VOICE_MAIL"
      ],
      "status": "not_logged_in",
      "statusId": 1,
      "timeZone": null
    },
    "selectionType": "addressBook",
    "typeLabel": "Agent",
    "label": "Susan Perkins (009, agent9@five9.com)",
    "icon": "f9-icon fa fa-circle"
  },
  {
    "filterId": "skill-9",
    "filterText": "Account Changes",
    "filterType": "skillgroups",
    "filterModel": {
      "id": "skill-9",
      "name": "Account Changes",
      "motD": ""
    },
    "selectionType": "addressBook",
    "typeLabel": "Skill",
    "label": "Account Changes",
    "icon": ""
  },
  {
    "filterId": "skill-11",
    "filterText": "At least one skill should have a very, very, VERY long name",
    "filterType": "skillgroups",
    "filterModel": {
      "id": "skill-11",
      "name": "At least one skill should have a very, very, VERY long name",
      "motD": "For some reason, it is possible to add ridiculously long descriptions that cause all sorts of mayhem."
    },
    "selectionType": "addressBook",
    "typeLabel": "Skill",
    "label": "At least one skill should have a very, very, VERY long name",
    "icon": ""
  },
  {
    "filterId": "skill-8",
    "filterText": "Billing and Payments",
    "filterType": "skillgroups",
    "filterModel": {
      "id": "skill-8",
      "name": "Billing and Payments",
      "motD": ""
    },
    "selectionType": "addressBook",
    "typeLabel": "Skill",
    "label": "Billing and Payments",
    "icon": ""
  }
];
//items = [];
ReactDOM.render(<Views.Dropdown items={items} />, document.getElementById('container'));
