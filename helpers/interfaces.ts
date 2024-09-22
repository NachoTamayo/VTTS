export interface ServiceRequestProps {
  _id: string;
  serviceRequest: SRNumber;
  RELEASE_VERSION: string;
  SR_TYPE: string;
  RELEASE_NOTE: string;
  DATE_TEST: string;
  testStatus: Status;
  ASSIGNED: string;
  STAGE: string;
  COMMENTS: string;
  APP: string;
  DATE_MODIFICATION: string;
  attached: AttachedInfo[];
  onView: (primKey: ServiceRequestPrimaryKey) => void;
  onOpen: () => void;
  handleRefresh: () => void;
}

export interface Status {
  _id: string;
  ID_STATUS: string;
  DESC_STATUS: string;
  IS_FAILED: string;
  DISPLAY_ORDER: number;
}

export interface SRNumber {
  _id: string;
  SR_NUMBER: string;
  SR_TYPE: string;
  DESCRIPTION: string;
  EXTERNAL_LINK: string;
  TRELLO_LINK?: string;
  DATA_TEST_PATH: string;
  LAST_TESTER: string;
  STATUS_SR: string;
}

export interface AttachedInfo {
  APP: string;
  FILE_NAME: string;
  RELEASE_VERSION: string;
  SR_NUMBER: string;
  STAGE: string;
  _id: string;
}

export interface ServiceRequestPrimaryKey {
  APP: string;
  RELEASE_VERSION: string;
  SR_NUMBER: string;
  STAGE: string;
}

export interface ViewModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onView?: (primKey: ServiceRequestPrimaryKey) => void;
  primKey: ServiceRequestPrimaryKey;
}

export interface ViewModal {
  title: string;
  sr_number: string;
  sr_type: string;
  description: string;
  comments: string;
  assigned: string;
  status: string;
  attached: AttachedFile;
  trellolink: string;
  externalLink: string;
  dateTest: string;
}

export interface AttachedFile {
  _id: string;
  filename: string;
  path: string;
}

export interface ModalViewContentProps {
  _id: string;
  serviceRequest: SRNumber;
  RELEASE_VERSION: string;
  SR_TYPE: string;
  RELEASE_NOTE: string;
  DATE_TEST: string;
  testStatus: Status;
  ASSIGNED: string;
  STAGE: string;
  COMMENTS: string;
  APP: string;
  DATE_MODIFICATION: string;
  attached: AttachedInfo;
}
