import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/**
 *
 * Creating a project
 *
 */
export type CreateProjectInput = {
  dateDue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  membersUserIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  name: Scalars['String']['input'];
};

/**
 *
 * Creating a project task
 *
 */
export type CreateProjectTaskInput = {
  assignedMembersUserIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  dateDue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
};

/**
 *
 * Creating a user
 *
 */
export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  permissions?: InputMaybe<Array<UserPermission>>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type FileUpload = {
  __typename?: 'FileUpload';
  category: Scalars['String']['output'];
  dateCreated?: Maybe<Scalars['String']['output']>;
  fileExtension?: Maybe<Scalars['String']['output']>;
  fileName: Scalars['String']['output'];
  fileSize: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  isEncrypted: Scalars['Boolean']['output'];
  storageKey: Scalars['String']['output'];
};

export type FileUploadFolder = {
  __typename?: 'FileUploadFolder';
  dateCreated?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  files: Array<FileUpload>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

/**
 *
 * Result of login
 *
 */
export type LoginResult = {
  __typename?: 'LoginResult';
  jwtToken?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  dateCreated?: Maybe<Scalars['String']['output']>;
  deliveredTo: Array<User>;
  id: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  project?: Maybe<Project>;
  projectTask?: Maybe<ProjectTask>;
  readBy: Array<User>;
  receiver?: Maybe<User>;
  sender?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**
   *
   *         Changes a user's password
   *         Args:
   *             oldPassword : the current password
   *             newPassword : the new password to set
   *
   */
  changePassword: Scalars['Boolean']['output'];
  /**
   *
   *         Creates a new project, done by a user with the relevant permission
   *         Args:
   *             args : The projects details
   *
   */
  createProject: Project;
  /**
   *
   *         Creates a folder for files related to a project, done by its creator or member
   *         Args:
   *             projectId : ID of the project
   *             name : Name of the folder
   *             description : Description of the folder
   *
   */
  createProjectFolder: Project;
  /**
   *
   *         Creates a resource link for a particular project
   *         Args:
   *             projectId : ID of the project
   *             name : Name of the resource link
   *             url : Locator for the resource link
   *             description : Description of the resource link
   *
   */
  createProjectResourceLink: Project;
  /**
   *
   *         Creates a task for a project
   *         Args:
   *             args : Details about the task
   *
   */
  createProjectTask: ProjectTask;
  /**
   *
   *         Creates a file folder for a particular project task
   *         Args:
   *             taskId : ID of the project task
   *             name : Name of the folder
   *             description : Description of the folder
   *
   */
  createProjectTaskFolder: ProjectTask;
  /**
   *
   *         Creates a resource link for a project task
   *         Args:
   *             taskId : ID of the project task
   *             name : Name of the resource link
   *             url : Locator for the resource
   *             description : description of the resource link
   *
   */
  createProjectTaskResourceLink: ProjectTask;
  /**
   *
   *         Creates a new user, done by an administrator
   *         Args:
   *             args : User details
   *
   */
  createUser: User;
  /**
   *
   *         Marks messages as deleted by the acting user
   *         Args:
   *             messageIds : IDs of the messages to mark as deleted
   *
   */
  deleteMessages: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a user's notifications
   *         Args:
   *             notificationIds : IDs of the notifications to delete
   *
   */
  deleteNotifications: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a project entirely, done by its creator
   *         Args:
   *             projectId : ID of the project to delete
   *
   */
  deleteProject: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a file related to a project, done by its creator or member
   *         Args:
   *             projectId : ID of the project
   *             folderId : ID of the folder of the file
   *             fileUploadId : ID of the file to delete
   *
   */
  deleteProjectFile: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a folder related to a project, done by its creator or member
   *         Args:
   *             projectId : ID of the project
   *             folderId : ID of the folder to delete
   *
   */
  deleteProjectFolder: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a resource link for a certain project
   *         Args:
   *             projectId : ID of the related project
   *             linkId : ID of the resource link
   *
   */
  deleteProjectResourceLink: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a project task entirely
   *         Args:
   *             taskId : ID of the project task
   *
   */
  deleteProjectTask: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a file linked to a project task
   *         Args:
   *             taskId : ID of the project task
   *             folderId : ID of the folder of the file
   *             fileUploadId : ID of the file to delete
   *
   */
  deleteProjectTaskFile: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a folder for a project task
   *         Args:
   *             taskId : ID of the project task
   *             folderId : ID of the folder to delete
   *
   */
  deleteProjectTaskFolder: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a projects task's resource link
   *         Args:
   *             taskId : ID of the project task
   *             linkId : ID of the resource link
   *
   */
  deleteProjectTaskResourceLink: Scalars['Boolean']['output'];
  /**
   *
   *         Deletes a user account, done by an administrator
   *         Args:
   *             userId : ID of the user to delete
   *
   */
  deleteUser: Scalars['Boolean']['output'];
  /**
   *
   *         Logs in a user into the system
   *         Args:
   *             email : the user's email address
   *             password : The user's password
   *
   */
  login: LoginResult;
  /**
   *
   *         Marks messages as delivered to the acting user
   *         Args:
   *             messageIds : IDs of the messages to mark as delivered
   *
   */
  markMessagesAsDelivered: Scalars['Boolean']['output'];
  /**
   *
   *         Marks messages as read by the acting user
   *         Args:
   *             messageIds : IDs of the messages to mark as read
   *
   */
  markMessagesAsRead: Scalars['Boolean']['output'];
  /**
   *
   *         Marks a user's notifications a read
   *         Args:
   *             notificationIds : IDs of the notifications to mark as read
   *
   */
  markNotificationsAsRead: Scalars['Boolean']['output'];
  /**
   *
   *         Resets a user's password, in case of forgotten password
   *         Args:
   *             email : The user account email address
   *             resetToken : If they've already received a reset token
   *             password : The new password to change to, if reset token already received
   *
   */
  resetPassword: Scalars['String']['output'];
  /**
   *
   *         Sends a message, to a project board or individual user
   *         Args:
   *             message : The message text
   *             receiverUserId : ID of the receiver, if individual
   *             projectId : ID of the project, if group message
   *
   */
  sendMessage: Message;
  /**
   *
   *         Sets the members of a particular project, done by its creator
   *         Args:
   *             projectId : ID of the project
   *             userIds : IDs of the users to set as members
   *
   */
  setProjectMembers: Project;
  /**
   *
   *         Updates a projects status, done by its creator or member
   *         Args:
   *             projectsId : ID of the project
   *             status : The status to set
   *
   */
  setProjectStatus: Project;
  /**
   *
   *         Assigns members to a project task
   *         Args:
   *             taskId : ID of the task
   *             userIds : IDs of the users to assign
   *
   */
  setProjectTaskAssignedMembers: ProjectTask;
  /**
   *
   *         Updates the status of a project task
   *         Args:
   *             taskId : ID of the project task
   *             status : The status of the task
   *
   */
  setProjectTaskStatus: ProjectTask;
  /**
   *
   *         Sets permissions for a particular user account, done by an administrator
   *         Args:
   *             userId : ID of the user to suspend
   *             permissions : The permissions to set
   *
   */
  setUserPermissions: User;
  /**
   *
   *         Suspends a user from their account, done by an administrator
   *         Args:
   *             userId : ID of the user to suspend
   *
   */
  suspendUser: User;
  /**
   *
   *         Unsuspends a user from their account, done by an administrator
   *         Args:
   *             userId : ID of the user to unsuspend
   *
   */
  unsuspendUser: User;
  /**
   *
   *         Updates details about a project, done by its creator
   *         Args:
   *             args : The project details to update
   *
   */
  updateProject: Project;
  /**
   *
   *         Updates a folder related to a project, done by its creator or member
   *         Args:
   *             projectId : ID of the project
   *             folderId : ID of the folder to update
   *             name : Name of the folder
   *             description : Description of the folder
   *
   */
  updateProjectFolder: Project;
  /**
   *
   *         Updates a resource link details for a particular project
   *         Args:
   *             projectId : ID of the project
   *             linkId : ID of the resource link
   *             name : Name of the resource link
   *             url : Locator for the resource link
   *             description : Description of the resource link
   *
   */
  updateProjectResourceLink: Project;
  /**
   *
   *         Updates details of a project task
   *         Args:
   *             args : Details to update of the project task
   *
   */
  updateProjectTask: ProjectTask;
  /**
   *
   *         Updates details about a project task
   *         Args:
   *             taskId : ID of the project task
   *             folderId : ID of the folder to update
   *             name : Name of the folder
   *             description : Description of the folder
   *
   */
  updateProjectTaskFolder: ProjectTask;
  /**
   *
   *         Updates details for a resource link for a project task
   *         Args:
   *             taskId : ID of the project task
   *             linkId : ID of the resource link
   *             name : Name of the resource link
   *             url : Locator for the resource
   *             description : description of the resource link
   *
   */
  updateProjectTaskResourceLink: ProjectTask;
  /**
   *
   *         Updates a user account personal details
   *         Args:
   *             args : The details to update
   *
   */
  updateUser: User;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateProjectArgs = {
  args: CreateProjectInput;
};


export type MutationCreateProjectFolderArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
};


export type MutationCreateProjectResourceLinkArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};


export type MutationCreateProjectTaskArgs = {
  args: CreateProjectTaskInput;
};


export type MutationCreateProjectTaskFolderArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  taskId: Scalars['Int']['input'];
};


export type MutationCreateProjectTaskResourceLinkArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  taskId: Scalars['Int']['input'];
  url: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  args: CreateUserInput;
};


export type MutationDeleteMessagesArgs = {
  messageIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteNotificationsArgs = {
  notificationIds: Array<Scalars['Int']['input']>;
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['Int']['input'];
};


export type MutationDeleteProjectFileArgs = {
  fileUploadId: Scalars['Int']['input'];
  folderId: Scalars['Int']['input'];
  projectId: Scalars['Int']['input'];
};


export type MutationDeleteProjectFolderArgs = {
  folderId: Scalars['Int']['input'];
  projectId: Scalars['Int']['input'];
};


export type MutationDeleteProjectResourceLinkArgs = {
  linkId: Scalars['Int']['input'];
  projectId: Scalars['Int']['input'];
};


export type MutationDeleteProjectTaskArgs = {
  taskId: Scalars['Int']['input'];
};


export type MutationDeleteProjectTaskFileArgs = {
  fileUploadId: Scalars['Int']['input'];
  folderId: Scalars['Int']['input'];
  taskId: Scalars['Int']['input'];
};


export type MutationDeleteProjectTaskFolderArgs = {
  folderId: Scalars['Int']['input'];
  taskId: Scalars['Int']['input'];
};


export type MutationDeleteProjectTaskResourceLinkArgs = {
  linkId: Scalars['Int']['input'];
  taskId: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationMarkMessagesAsDeliveredArgs = {
  messageIds: Array<Scalars['Int']['input']>;
};


export type MutationMarkMessagesAsReadArgs = {
  messageIds: Array<Scalars['Int']['input']>;
};


export type MutationMarkNotificationsAsReadArgs = {
  notificationIds: Array<Scalars['Int']['input']>;
};


export type MutationResetPasswordArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  resetToken?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSendMessageArgs = {
  message: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['Int']['input']>;
  receiverUserId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationSetProjectMembersArgs = {
  projectId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationSetProjectStatusArgs = {
  projectId: Scalars['Int']['input'];
  status: ProjectStatus;
};


export type MutationSetProjectTaskAssignedMembersArgs = {
  taskId: Scalars['Int']['input'];
  userIds: Array<Scalars['Int']['input']>;
};


export type MutationSetProjectTaskStatusArgs = {
  status: ProjectTaskStatus;
  taskId: Scalars['Int']['input'];
};


export type MutationSetUserPermissionsArgs = {
  permissions: Array<UserPermission>;
  userId: Scalars['Int']['input'];
};


export type MutationSuspendUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUnsuspendUserArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUpdateProjectArgs = {
  args: UpdateProjectInput;
};


export type MutationUpdateProjectFolderArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  folderId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Int']['input'];
};


export type MutationUpdateProjectResourceLinkArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  linkId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Int']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProjectTaskArgs = {
  args: UpdateProjectTaskInput;
};


export type MutationUpdateProjectTaskFolderArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  folderId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['Int']['input'];
};


export type MutationUpdateProjectTaskResourceLinkArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  linkId: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['Int']['input'];
  url?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  args: UpdateUserInput;
};

export type Notification = {
  __typename?: 'Notification';
  dateCreated?: Maybe<Scalars['String']['output']>;
  details: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isRead: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type Project = {
  __typename?: 'Project';
  creator?: Maybe<User>;
  dateArchived?: Maybe<Scalars['String']['output']>;
  dateCompleted?: Maybe<Scalars['String']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateDue?: Maybe<Scalars['String']['output']>;
  dateStarted?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  folders: Array<FileUploadFolder>;
  id: Scalars['Int']['output'];
  members: Array<User>;
  name: Scalars['String']['output'];
  resourceLinks: Array<ResourceLink>;
  status: ProjectStatus;
};

/**
 *
 * Project statuses
 *
 */
export enum ProjectStatus {
  Archived = 'ARCHIVED',
  Completed = 'COMPLETED',
  Ongoing = 'ONGOING',
  Pending = 'PENDING'
}

export type ProjectTask = {
  __typename?: 'ProjectTask';
  assignedMembers: Array<User>;
  creator?: Maybe<User>;
  dateArchived?: Maybe<Scalars['String']['output']>;
  dateCompleted?: Maybe<Scalars['String']['output']>;
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateDue?: Maybe<Scalars['String']['output']>;
  dateStarted?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  folders: Array<FileUploadFolder>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  project?: Maybe<Project>;
  resourceLinks: Array<ResourceLink>;
  status: ProjectStatus;
};

/**
 *
 * Project task statuses
 *
 */
export enum ProjectTaskStatus {
  Archived = 'ARCHIVED',
  Completed = 'COMPLETED',
  Ongoing = 'ONGOING',
  Pending = 'PENDING'
}

export type Query = {
  __typename?: 'Query';
  /**
   *
   *         retrieves the current user's profile information
   *
   */
  myProfile?: Maybe<User>;
  /**
   *
   *         Fetches existing messages related to the acting user
   *         Args:
   *             peerUserId : receiver filter
   *             projectId : Project filter
   *             search : term to search for in message
   *             isRead : read by filter
   *             isDelivered : delivered to filter
   *             afterDate : date filter, lower end
   *             beforeDate : date filter, higher end
   *             messageIds : IDs of specific items to fetch
   *             excludeIds : IDs of items to filter out
   *             offset : Query offset
   *             limit : Max number of items to filter
   *
   */
  retrieveMessages: Array<Message>;
  /**
   *
   *         Fetches the acting users notifications
   *         Args:
   *             search : term to search for in title or details
   *             isRead : read by filter
   *             afterDate : date filter, lower end
   *             beforeDate : date filter, higher end
   *             notificationIds : IDs of specific items to fetch
   *             excludeIds : IDs of items to filter out
   *             offset : Query offset
   *             limit : Max number of items to filter
   *
   */
  retrieveNotifications: Array<Notification>;
  /**
   *
   *         Fetches an individual project
   *         Args:
   *             projectId : ID of the project to fetch
   *
   */
  retrieveProject?: Maybe<Project>;
  /**
   *
   *             Fetches folders for a particular project
   *             Args:
   *                 projectId : ID of the related project
   *                 search : term to search for in name
   *                 folderIds : IDs of the specific folders to fetch
   *                 excludeIds : IDs of the specific folders to filter out
   *                 offset : Query offset
   *                 limit : Max number of items to fetch
   *
   */
  retrieveProjectFolders: Array<FileUploadFolder>;
  /**
   *
   *             Fetches resource links for a particular project
   *             Args:
   *                 projectId : ID of the related project
   *                 search : term to search for in name or url
   *                 linkIds : IDs of the specific links to fetch
   *                 excludeIds : IDs of the specific links to filter out
   *                 offset : Query offset
   *                 limit : Max number of items to fetch
   *
   */
  retrieveProjectResourceLinks: Array<ResourceLink>;
  /**
   *
   *         Fetches an individual project task
   *         Args:
   *             taskId : ID of the task to fetch
   *
   */
  retrieveProjectTask?: Maybe<ProjectTask>;
  /**
   *
   *             Fetches folders for a particular project task
   *             Args:
   *                 taskId : ID of the project task
   *                 search : term to search for in name
   *                 folderIds : IDs of the specific folders to fetch
   *                 excludeIds : IDs of the specific folders to filter out
   *                 offset : Query offset
   *                 limit : Max number of items to fetch
   *
   */
  retrieveProjectTaskFolders: Array<FileUploadFolder>;
  /**
   *
   *             Fetches resource links for a particular project task
   *             Args:
   *                 taskId : ID of the project task
   *                 search : term to search for in name or url
   *                 linkIds : IDs of the specific links to fetch
   *                 excludeIds : IDs of the specific links to filter out
   *                 offset : Query offset
   *                 limit : Max number of items to fetch
   *
   */
  retrieveProjectTaskResourceLinks: Array<ResourceLink>;
  /**
   *
   *         Fetches existing project tasks
   *         Args:
   *             search : term to search for in name
   *             projectId : project filter
   *             taskIds : IDs of the specific tasks to fetch
   *             excludeIds : IDs of the tasks to filter out
   *             status : Status filter
   *             offset : Query offset
   *             limit : Max number of items to fetch
   *
   */
  retrieveProjectTasks: Array<ProjectTask>;
  /**
   *
   *         Fetches existing projects
   *         Args:
   *             search : term to search for in name
   *             projectIds : IDs of specific projects to fetch
   *             excludeIds : IDs of projects to filter out
   *             status : Project status filter
   *             offset : query offset
   *             limit : Maximum items to fetch
   *
   */
  retrieveProjects: Array<Project>;
  /**
   *
   *         Fetches an individual user
   *         Args:
   *             userId : ID of the user to fetch
   *
   */
  retrieveUser?: Maybe<User>;
  /**
   *
   *         Fetches existing users
   *         Args:
   *             search : term to search for in name or email
   *             userIds : IDs of specific users to fetch
   *             excludeIds : IDs of users to filter out
   *             offset : query offset
   *             limit : Maximum items to fetch
   *
   */
  retrieveUsers: Array<User>;
};


export type QueryRetrieveMessagesArgs = {
  afterDate?: InputMaybe<Scalars['String']['input']>;
  beforeDate?: InputMaybe<Scalars['String']['input']>;
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  isDelivered?: InputMaybe<Scalars['Boolean']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  messageIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  peerUserId?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRetrieveNotificationsArgs = {
  afterDate?: InputMaybe<Scalars['String']['input']>;
  beforeDate?: InputMaybe<Scalars['String']['input']>;
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  notificationIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRetrieveProjectArgs = {
  projectId: Scalars['Int']['input'];
};


export type QueryRetrieveProjectFoldersArgs = {
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  folderIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRetrieveProjectResourceLinksArgs = {
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  linkIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryRetrieveProjectTaskArgs = {
  taskId: Scalars['Int']['input'];
};


export type QueryRetrieveProjectTaskFoldersArgs = {
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  folderIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['Int']['input'];
};


export type QueryRetrieveProjectTaskResourceLinksArgs = {
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  linkIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['Int']['input'];
};


export type QueryRetrieveProjectTasksArgs = {
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  projectId?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectTaskStatus>;
  taskIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryRetrieveProjectsArgs = {
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  projectIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectStatus>;
};


export type QueryRetrieveUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryRetrieveUsersArgs = {
  excludeIds?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  userIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type ResourceLink = {
  __typename?: 'ResourceLink';
  dateCreated?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

/**
 *
 * Updating a project
 *
 */
export type UpdateProjectInput = {
  dateDue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectId: Scalars['Int']['input'];
};

/**
 *
 * Updating a project task
 *
 */
export type UpdateProjectTaskInput = {
  dateDue?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  taskId: Scalars['Int']['input'];
};

/**
 *
 * Updating a user
 *
 */
export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  dateCreated?: Maybe<Scalars['String']['output']>;
  dateSuspended?: Maybe<Scalars['String']['output']>;
  dateUnsuspended?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isActive: Scalars['Boolean']['output'];
  isSuspended: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  permissions: Array<UserPermission>;
  phoneNumber: Scalars['String']['output'];
  phoneNumberVerified: Scalars['Boolean']['output'];
  profilePicture?: Maybe<FileUpload>;
};

/**
 *
 * User permissions
 *
 */
export enum UserPermission {
  ManageProjects = 'MANAGE_PROJECTS',
  ManageProjectTasks = 'MANAGE_PROJECT_TASKS',
  ManageUsers = 'MANAGE_USERS'
}

export type RetrieveProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type RetrieveProjectsQuery = { __typename?: 'Query', retrieveProjects: Array<{ __typename?: 'Project', id: number, name: string, status: ProjectStatus, dateDue?: string | null, creator?: { __typename?: 'User', id: number, email: string } | null }> };

export type RetrieveProjectTasksQueryVariables = Exact<{
  projectId: Scalars['Int']['input'];
}>;


export type RetrieveProjectTasksQuery = { __typename?: 'Query', retrieveProjectTasks: Array<{ __typename?: 'ProjectTask', id: number, name: string, description: string, dateDue?: string | null, dateCompleted?: string | null, project?: { __typename?: 'Project', id: number } | null, creator?: { __typename?: 'User', id: number, email: string } | null }> };

export type CreateProjectMutationVariables = Exact<{
  args: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: number, name: string, dateDue?: string | null } };

export type CreateProjectTaskMutationVariables = Exact<{
  args: CreateProjectTaskInput;
}>;


export type CreateProjectTaskMutation = { __typename?: 'Mutation', createProjectTask: { __typename?: 'ProjectTask', id: number, name: string, description: string, dateDue?: string | null, dateCompleted?: string | null, project?: { __typename?: 'Project', id: number } | null } };

export type UpdateProjectMutationVariables = Exact<{
  args: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: number, name: string, description: string, dateDue?: string | null } };

export type UpdateProjectTaskMutationVariables = Exact<{
  args: UpdateProjectTaskInput;
}>;


export type UpdateProjectTaskMutation = { __typename?: 'Mutation', updateProjectTask: { __typename?: 'ProjectTask', id: number, name: string, description: string, dateDue?: string | null, dateCompleted?: string | null, project?: { __typename?: 'Project', id: number } | null } };

export type DeleteProjectTaskMutationVariables = Exact<{
  taskId: Scalars['Int']['input'];
}>;


export type DeleteProjectTaskMutation = { __typename?: 'Mutation', deleteProjectTask: boolean };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['Int']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', jwtToken?: string | null, message?: string | null } };

export type SetProjectStatusMutationVariables = Exact<{
  projectId: Scalars['Int']['input'];
  status: ProjectStatus;
}>;


export type SetProjectStatusMutation = { __typename?: 'Mutation', setProjectStatus: { __typename?: 'Project', id: number, name: string, status: ProjectStatus } };


export const RetrieveProjectsDocument = gql`
    query RetrieveProjects {
  retrieveProjects {
    id
    name
    status
    creator {
      id
      email
    }
    dateDue
  }
}
    `;

/**
 * __useRetrieveProjectsQuery__
 *
 * To run a query within a React component, call `useRetrieveProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useRetrieveProjectsQuery(baseOptions?: Apollo.QueryHookOptions<RetrieveProjectsQuery, RetrieveProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RetrieveProjectsQuery, RetrieveProjectsQueryVariables>(RetrieveProjectsDocument, options);
      }
export function useRetrieveProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RetrieveProjectsQuery, RetrieveProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RetrieveProjectsQuery, RetrieveProjectsQueryVariables>(RetrieveProjectsDocument, options);
        }
export function useRetrieveProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RetrieveProjectsQuery, RetrieveProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RetrieveProjectsQuery, RetrieveProjectsQueryVariables>(RetrieveProjectsDocument, options);
        }
export type RetrieveProjectsQueryHookResult = ReturnType<typeof useRetrieveProjectsQuery>;
export type RetrieveProjectsLazyQueryHookResult = ReturnType<typeof useRetrieveProjectsLazyQuery>;
export type RetrieveProjectsSuspenseQueryHookResult = ReturnType<typeof useRetrieveProjectsSuspenseQuery>;
export type RetrieveProjectsQueryResult = Apollo.QueryResult<RetrieveProjectsQuery, RetrieveProjectsQueryVariables>;
export const RetrieveProjectTasksDocument = gql`
    query RetrieveProjectTasks($projectId: Int!) {
  retrieveProjectTasks(projectId: $projectId) {
    id
    name
    description
    dateDue
    dateCompleted
    project {
      id
    }
    creator {
      id
      email
    }
  }
}
    `;

/**
 * __useRetrieveProjectTasksQuery__
 *
 * To run a query within a React component, call `useRetrieveProjectTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useRetrieveProjectTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRetrieveProjectTasksQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useRetrieveProjectTasksQuery(baseOptions: Apollo.QueryHookOptions<RetrieveProjectTasksQuery, RetrieveProjectTasksQueryVariables> & ({ variables: RetrieveProjectTasksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RetrieveProjectTasksQuery, RetrieveProjectTasksQueryVariables>(RetrieveProjectTasksDocument, options);
      }
export function useRetrieveProjectTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RetrieveProjectTasksQuery, RetrieveProjectTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RetrieveProjectTasksQuery, RetrieveProjectTasksQueryVariables>(RetrieveProjectTasksDocument, options);
        }
export function useRetrieveProjectTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RetrieveProjectTasksQuery, RetrieveProjectTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RetrieveProjectTasksQuery, RetrieveProjectTasksQueryVariables>(RetrieveProjectTasksDocument, options);
        }
export type RetrieveProjectTasksQueryHookResult = ReturnType<typeof useRetrieveProjectTasksQuery>;
export type RetrieveProjectTasksLazyQueryHookResult = ReturnType<typeof useRetrieveProjectTasksLazyQuery>;
export type RetrieveProjectTasksSuspenseQueryHookResult = ReturnType<typeof useRetrieveProjectTasksSuspenseQuery>;
export type RetrieveProjectTasksQueryResult = Apollo.QueryResult<RetrieveProjectTasksQuery, RetrieveProjectTasksQueryVariables>;
export const CreateProjectDocument = gql`
    mutation CreateProject($args: CreateProjectInput!) {
  createProject(args: $args) {
    id
    name
    dateDue
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const CreateProjectTaskDocument = gql`
    mutation CreateProjectTask($args: CreateProjectTaskInput!) {
  createProjectTask(args: $args) {
    id
    name
    description
    dateDue
    dateCompleted
    project {
      id
    }
  }
}
    `;
export type CreateProjectTaskMutationFn = Apollo.MutationFunction<CreateProjectTaskMutation, CreateProjectTaskMutationVariables>;

/**
 * __useCreateProjectTaskMutation__
 *
 * To run a mutation, you first call `useCreateProjectTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectTaskMutation, { data, loading, error }] = useCreateProjectTaskMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useCreateProjectTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectTaskMutation, CreateProjectTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectTaskMutation, CreateProjectTaskMutationVariables>(CreateProjectTaskDocument, options);
      }
export type CreateProjectTaskMutationHookResult = ReturnType<typeof useCreateProjectTaskMutation>;
export type CreateProjectTaskMutationResult = Apollo.MutationResult<CreateProjectTaskMutation>;
export type CreateProjectTaskMutationOptions = Apollo.BaseMutationOptions<CreateProjectTaskMutation, CreateProjectTaskMutationVariables>;
export const UpdateProjectDocument = gql`
    mutation UpdateProject($args: UpdateProjectInput!) {
  updateProject(args: $args) {
    id
    name
    description
    dateDue
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const UpdateProjectTaskDocument = gql`
    mutation UpdateProjectTask($args: UpdateProjectTaskInput!) {
  updateProjectTask(args: $args) {
    id
    name
    description
    dateDue
    dateCompleted
    project {
      id
    }
  }
}
    `;
export type UpdateProjectTaskMutationFn = Apollo.MutationFunction<UpdateProjectTaskMutation, UpdateProjectTaskMutationVariables>;

/**
 * __useUpdateProjectTaskMutation__
 *
 * To run a mutation, you first call `useUpdateProjectTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectTaskMutation, { data, loading, error }] = useUpdateProjectTaskMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateProjectTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectTaskMutation, UpdateProjectTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectTaskMutation, UpdateProjectTaskMutationVariables>(UpdateProjectTaskDocument, options);
      }
export type UpdateProjectTaskMutationHookResult = ReturnType<typeof useUpdateProjectTaskMutation>;
export type UpdateProjectTaskMutationResult = Apollo.MutationResult<UpdateProjectTaskMutation>;
export type UpdateProjectTaskMutationOptions = Apollo.BaseMutationOptions<UpdateProjectTaskMutation, UpdateProjectTaskMutationVariables>;
export const DeleteProjectTaskDocument = gql`
    mutation DeleteProjectTask($taskId: Int!) {
  deleteProjectTask(taskId: $taskId)
}
    `;
export type DeleteProjectTaskMutationFn = Apollo.MutationFunction<DeleteProjectTaskMutation, DeleteProjectTaskMutationVariables>;

/**
 * __useDeleteProjectTaskMutation__
 *
 * To run a mutation, you first call `useDeleteProjectTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectTaskMutation, { data, loading, error }] = useDeleteProjectTaskMutation({
 *   variables: {
 *      taskId: // value for 'taskId'
 *   },
 * });
 */
export function useDeleteProjectTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectTaskMutation, DeleteProjectTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectTaskMutation, DeleteProjectTaskMutationVariables>(DeleteProjectTaskDocument, options);
      }
export type DeleteProjectTaskMutationHookResult = ReturnType<typeof useDeleteProjectTaskMutation>;
export type DeleteProjectTaskMutationResult = Apollo.MutationResult<DeleteProjectTaskMutation>;
export type DeleteProjectTaskMutationOptions = Apollo.BaseMutationOptions<DeleteProjectTaskMutation, DeleteProjectTaskMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation DeleteProject($projectId: Int!) {
  deleteProject(projectId: $projectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    jwtToken
    message
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SetProjectStatusDocument = gql`
    mutation SetProjectStatus($projectId: Int!, $status: ProjectStatus!) {
  setProjectStatus(projectId: $projectId, status: $status) {
    id
    name
    status
  }
}
    `;
export type SetProjectStatusMutationFn = Apollo.MutationFunction<SetProjectStatusMutation, SetProjectStatusMutationVariables>;

/**
 * __useSetProjectStatusMutation__
 *
 * To run a mutation, you first call `useSetProjectStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetProjectStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setProjectStatusMutation, { data, loading, error }] = useSetProjectStatusMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useSetProjectStatusMutation(baseOptions?: Apollo.MutationHookOptions<SetProjectStatusMutation, SetProjectStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetProjectStatusMutation, SetProjectStatusMutationVariables>(SetProjectStatusDocument, options);
      }
export type SetProjectStatusMutationHookResult = ReturnType<typeof useSetProjectStatusMutation>;
export type SetProjectStatusMutationResult = Apollo.MutationResult<SetProjectStatusMutation>;
export type SetProjectStatusMutationOptions = Apollo.BaseMutationOptions<SetProjectStatusMutation, SetProjectStatusMutationVariables>;