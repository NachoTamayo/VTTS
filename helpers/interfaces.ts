export interface TestPssSystemProps {
  /* Properties */
  id: number;
  srType: number;
  srNumber: number;
  assigned: number;
  status: number;
  dateTest: string;
  comments: string;
  dateModification: string;
  releaseNote: string;
  windchillComment: string;
  app: number;
  releaseVersion: number;
  stage: number;
  /* Relations */
  appRelation: VttsSystem;
  srTypeRelation: SrType;
  srNumberRelation: ServiceRequest;
  stageRelation: Stage;
  statusRelation: Status;
  assignedRelation: VttsUser;
  testAttachedInfo: AttachedInfo[];
  releaseVersionRelation: ReleaseVersion;
  systemVersionRelation: SystemVersion;
  /* Functions */
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onOpen: () => void;
  handleRefresh: () => void;
}

export interface VttsSystem {
  id: number;
  app: string;
  description: string;
  explorerVersion: string;
  jreVersion: string;
}

export interface VttsUser {
  id: number;
  assigned: string;
  userName: string;
  password: string;
  email: string;
  mailSign: string;
  dateModification?: string;
  userModification?: string;
  userMessage?: string;
  profile?: string;
  srFilter1?: string;
  srFilter2?: string;
}

export interface SrType {
  id: number;
  srType: string;
  description: string;
}

export interface Stage {
  id: number;
  stage: string;
}

export interface ServiceRequest {
  id: number;
  srNumber: string;
  srType: SrType;
  description: string;
  externalLink: string;
  trelloLink?: string;
  dataTestPath: string;
  lastTesterRelation: VttsUser;
  statusSR: string;
}

export interface TestPssSystem {
  id: number;
  dataTestPath: string;
  description: string;
  externalLink: string;
  appRelation: VttsSystem;
  lastTesterRelation: VttsUser;
  srTypeRelation: SrType;
  stageRelation: Stage;
  statusRelation: Status;
  assignedRelation: VttsUser;
  testAttachedInfo: AttachedInfo;
}

export interface SystemVersion {
  id: number;
  app: number;
  deliveryDate: string;
  version: string;
}

export interface ReleaseVersion {
  id: number;
  appRelation: VttsSystem;
  deliveryDate: string;
  version: string;
  stageRelation: Stage;
  systemVersion: SystemVersion;
}
export interface Status {
  id: number;
  idStatus: string;
  descStatus: string;
  isFailed: string;
  displayOrder: number;
}

export interface AttachedInfo {
  idTestPssSystem: TestPssSystem;
  fileName: string;
  id: number;
}

export interface ViewModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onView?: (id: number) => void;
  id: number;
}

export interface EditModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onEdit?: (id: number) => void;
  handleRefresh?: () => void;
  id: number;
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
  id: number;
  filename: string;
  path: string;
}

export interface ModalViewContentProps {
  /* Properties */
  id: number;
  srType: number;
  srNumber: number;
  assigned: number;
  status: number;
  dateTest: string;
  comments: string;
  dateModification: string;
  releaseNote: string;
  windchillComment: string;
  app: number;
  releaseVersion: number;
  stage: number;
  /* Relations */
  appRelation: VttsSystem;
  srTypeRelation: SrType;
  srNumberRelation: ServiceRequest;
  stageRelation: Stage;
  statusRelation: Status;
  assignedRelation: VttsUser;
  testAttachedInfo: AttachedInfo[];
  releaseVersionRelation: ReleaseVersion;
  systemVersionRelation: SystemVersion;
}

export interface ModalEditContentProps {
  /* Properties */
  id: number;
  srType: number;
  srNumber: number;
  assigned: number;
  status: number;
  dateTest: string;
  comments: string;
  dateModification: string;
  releaseNote: string;
  windchillComment: string;
  app: number;
  releaseVersion: number;
  stage: number;
  /* Relations */
  appRelation: VttsSystem;
  srTypeRelation: SrType;
  srNumberRelation: ServiceRequest;
  stageRelation: Stage;
  statusRelation: Status;
  assignedRelation: VttsUser;
  testAttachedInfo: AttachedInfo[];
  releaseVersionRelation: ReleaseVersion;
  systemVersionRelation: SystemVersion;
}

export interface InfoAlertProps {
  message?: string;
  onOpen?: () => void;
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  isOpen?: boolean;
}
