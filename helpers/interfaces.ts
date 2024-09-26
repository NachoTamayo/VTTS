import { SystemVersion } from "@prisma/client";

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
  /* Functions */
  onView: (id: number) => void;
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
  app: VttsSystem;
  releaseVersion: ReleaseVersion;
  stage: string;
  testDeadline: string;
}

export interface ServiceRequest {
  id: number;
  srNumber: string;
  srType: SrType;
  description: string;
  externalLink: string;
  trelloLink?: string;
  dataTestPath: string;
  lastTester: VttsUser;
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

export interface ReleaseVersion {
  id: number;
  app: number;
  deliveryDate: string;
  version: string;
  stage: string;
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
}
