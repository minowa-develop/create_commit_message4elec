export type INPUT_TAG_ID = "documents"|"tools"|"subject"|"scope"|"refs"|"message"|"commit_message"|"import_file";
export type TD_TAG_ID = "repositories";
export type SELECT_TAG_ID = "types";
export type RADIO_TAG_ID = "tools"|"documents";
export type TABLE_TAG_ID = "history_area"|"favorite_area"
export type EVENT_ID = "createMessage"|"copy"|"initialize"|"exportData"|"import_file"|"favoriteRegist";
export type Id = INPUT_TAG_ID|EVENT_ID|SELECT_TAG_ID|TD_TAG_ID|TABLE_TAG_ID|RADIO_TAG_ID
export type NAME = "repository"|"type"