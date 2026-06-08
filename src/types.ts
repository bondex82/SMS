/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ActiveTab = 'home' | 'about' | 'academics' | 'admissions' | 'news' | 'events' | 'gallery' | 'contact';

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: 'Announcement' | 'Event' | 'Achievement' | 'Newsletter';
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Classroom' | 'Sports' | 'Arts' | 'Science' | 'Events';
  imageUrl: string;
  description: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  bio: string;
}

export interface CurriculumSubject {
  name: string;
  description: string;
}

export interface CurriculumGrade {
  gradeLevel: string;
  ageGroup: string;
  curriculumFocus: string;
  subjects: CurriculumSubject[];
}

export interface Testimonial {
  id: string;
  name: string;
  relation: 'Parent' | 'Alumni' | 'Student';
  quote: string;
  avatarUrl: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
  dateSubmitted: string;
}

export interface AdmissionApplication {
  studentName: string;
  dateOfBirth: string;
  gender: string;
  targetGrade: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  previousSchool?: string;
  message?: string;
  status: 'Pending' | 'Reviewing' | 'Accepted';
  dateSubmitted: string;
  wantsBus?: boolean;
  busRouteId?: string;
  wantsHostel?: boolean;
  wantsDining?: boolean;
  parentOccupation?: string;
  guardianRelationship?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  bloodGroup?: string;
  genotype?: string;
  allergies?: string;
  enrolledTerm?: string;
  passport?: string;
}

export interface AcademyEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category: 'Academic' | 'Sports' | 'Arts' | 'Community' | 'Science' | 'Admissions' | 'General';
}

