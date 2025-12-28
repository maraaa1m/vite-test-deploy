
export enum SessionType {
  PLENARY = 'Plenary',
  PARALLEL = 'Parallel',
  POSTER = 'Poster'
}

export enum CommunicationType {
  ORAL = 'Oral Presentation',
  POSTER = 'Poster Presentation'
}

// Updated Roles to match specific requirements
export type Role = 
  | 'Organizer'            // Administrateur / Organisateur
  | 'Author'               // Communicant
  | 'ScientificCommittee'  // Membre du Comité Scientifique
  | 'Speaker'              // Invité / Conférencier
  | 'WorkshopAnimator'     // Animateur de Workshop
  | 'Participant';         // Simple Participant

export type SubmissionStatus = 'Pending' | 'Under Review' | 'Accepted' | 'Rejected' | 'Revision Required';

export type PaymentMethod = 'Online' | 'On-Site';

export interface Submission {
  id: string;
  eventId: string;
  eventTitle: string;
  title: string;
  authorName?: string;
  type: CommunicationType;
  status: SubmissionStatus;
  date: string;
  reviewNotes?: string;
  keywords?: string;
  fileUrl?: string;
  score?: number;
  assignedReviewerId?: string;
}

export interface Question {
  id: string;
  sessionId: string;
  authorName: string;
  content: string;
  votes: number;
  timestamp: string;
  isLiked?: boolean;
}

export interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  isActive: boolean;
}

export interface WorkshopResource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'link';
  url: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert';
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: Role;
    photo?: string;
  }[];
  lastMessage?: string;
  updatedAt: string;
}

export interface UserProfile {
  photo?: string;
  institution: string;
  researchField: string;
  biography: string;
  linkedin?: string;
  phoneNumber?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  profile: UserProfile;
}

export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';

export interface Speaker {
  name: string;
  role: string;
  image: string;
  institution?: string;
}

export interface Session {
  id: string;
  time: string;
  title: string;
  room: string;
  type: SessionType;
  description?: string;
}

export interface Workshop {
  id: string;
  title: string;
  animator: string;
  animatorId?: string;
  capacity: number;
  enrolled: number;
  time: string;
  location: string;
  price?: string;
  resources?: WorkshopResource[];
}

export interface Communication {
  id: string;
  title: string;
  authors: string[];
  type: CommunicationType;
  abstractSummary: string;
}

export interface MedicalEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  theme: string;
  startDate: string;
  endDate: string;
  attendees: number;
  price: string;
  image: string;
}

export interface FilterState {
  searchQuery: string;
  specialty: string | null;
  status: 'upcoming' | 'archived';
  priceRange: [number, number];
  location: string;
}
