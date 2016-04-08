var EnglishKeys = {};
EnglishKeys.navigationMap = {
    //Main Navigation
    Home: {keys: 'h', description: 'Go to Home', category: 'category-main'},
    Call: {keys: 'c', description: 'Go to Call (Voice)', category: 'category-main'},
    Voicemail: {keys: 'v', description: 'Go to Voicemail', category: 'category-main'},
    Chat: {keys: 't', description: 'Go to Chat', category: 'category-main'},
    Email: {keys: 'e', description: 'Go to Email', category: 'category-main'},
    Social: {keys: 's', description: 'Go to Social', category: 'category-main'},
    CRM: {keys: 'r', description: 'Go to Contacts (Contact Manager)', category: 'category-main'},
    History: {keys: 'a', description: 'Go to Activity', category: 'category-main'},
    InternalMessages: {keys: 'i', description: 'Go to Internal Messages', category: 'category-main'},
    Reminders:  {keys: 'b', description: 'Go to Reminders', category: 'category-main'},
    Settings: {keys: 'shift + ctrl + alt > k', description: 'Open Settings', category: 'category-main'},
    Help: {keys: 'ctrl + alt > /', description: 'Application Help', category: 'category-main'},
    KeyboardHelp: {keys: 'shift > /', description: 'Keyboard Help', title: 'Agent Keyboard Shortcuts', category: 'category-main'},

    //quick actions
    InternalMessage: {keys: 'ctrl + alt > i', description: 'New IM (Instant Message)', category: 'category-quick'},
    Reminder:  {keys: 'ctrl + alt > b', description: 'New Reminder', category: 'category-quick'},
    ComposeEmail: {keys: 'ctrl + alt > e', description: 'New Email (compose)', category: 'category-quick'},
    //ComposeSocial: {keys: 'ctrl + alt > s', description: 'New Social Post (compose)', category: 'category-quick'},
    ContactTabs: {keys: 'ctrl + alt > g', description: 'Switch between Contact Tabs', category: 'category-quick'},

    // state management
    SetReady: {keys: 'ctrl + alt > r', description: 'Set Ready', category: 'category-state'},
    SetReadyFor: {keys: 'shift + ctrl + alt > r', description: 'Set Ready For...', category: 'category-state'},
    AgentStateDropdown: {keys: 'ctrl + alt > o', description: 'Open State Dropdown', category: 'category-state'},
    Logout: {keys: 'shift + ctrl + alt > l', description: 'Log Out', category: 'category-state'},

    // apply to all channels
    EndInteraction: {keys: 'ctrl + alt > w', description: 'End', category: ['category-call','category-voicemail','category-text']},
    OpenDisposition: {keys: 'ctrl + alt > d', description: 'Open', category: ['category-call','category-voicemail','category-text']},
    TransferInteraction: {keys: 'ctrl + alt > t', description: 'Transfer', category: ['category-call','category-voicemail','category-text']},
    Conference: {keys: 'ctrl + alt > a', description: 'Conference', category: ['category-call','category-voicemail','category-text']},
    // apply to all channels
  };

  EnglishKeys.callControlsMap = {
    Hold: {keys: 'ctrl + alt > f', description: 'Toggle Hold', category: 'category-call'},
    Hold2: {keys: 'ctrl + alt > l', description: 'Toggle Hold', category: 'category-call'},
    //DialPad: {keys: 'alt > i', description: 'Show Dialpad', category: 'category-call'},
    Park: {keys: 'ctrl + alt > k', description: 'Toggle Park', category: 'category-call'},
    Mute: {keys: 'ctrl + alt > space', description: 'Toggle Mute', category: 'category-call'},
    Record: {keys: 'ctrl + alt > u', description: 'Toggle Recording', category: 'category-call'},
    SelectAudio: {keys: 'ctrl + shift + alt > p', description: 'Open Audio selection', category: 'category-call'},
    AddDNC: {keys: 'shift + ctrl + alt > d', description: 'Add number to DNC', category: 'category-call'}
  };

  EnglishKeys.voicemailControlsMap = {
    ReturnCallSendReply: {keys: 'ctrl + alt > enter', description: 'Return Call/Send Reply', category: 'category-voicemail'},
    Delete: {keys: 'ctrl + alt > x', description: 'Delete Voicemail', category: 'category-voicemail'},
    PreviousVoicemailFile: {keys: 'ctrl + alt > comma', description: 'Previous Voicemail File', category: 'category-voicemail'},
    NextVoicemailFile: {keys: 'ctrl + alt > period', description: 'Next Voicemail File', category: 'category-voicemail'},
    PlayAudioVoicemail: {keys: 'ctrl + alt > p', description: 'Play Audio file on Call/Play Voicemail', category: 'category-voicemail'},
  };

  EnglishKeys.textControlsMap = {
    //EndChat:{keys:'ctrl + alt > w',description:'End Chat', category: 'category-text'},
    NextBestAction: {keys:'ctrl + alt > n',description:'Open Next Best Action', category: 'category-text'},
    Assistance: {keys:'ctrl + alt > h',description:'Open Assistance', category: 'category-text'}
  };

EnglishKeys.categories = [
  {id:'category-main',name:'Main Navigation'},
  {id:'category-quick',name:'Quick Actions'},
  {id:'category-state',name:'State Management'},
  {id:'category-call',name:'Call Channel Functions'},
  {id:'category-voicemail',name:'Voicemail Channel Functions'},
  {id:'category-text',name:'Text Channel Functions'}
];

export default EnglishKeys;
