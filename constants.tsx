
import { MedicalEvent, Speaker, Session, SessionType, Workshop, Communication, CommunicationType } from './types';

export interface MedicalEventExtended extends MedicalEvent {
  contactEmail: string;
  contactPhone: string;
  speakers: Speaker[];
  committee: string[];
  isArchived: boolean;
  sessions: Session[];
  workshops: Workshop[];
  communications: Communication[];
}

export const MOCK_EVENTS: MedicalEventExtended[] = [
  {
    id: '1',
    title: 'Congrès International de Cardiologie de Constantine (CICC)',
    theme: 'Cardiology',
    startDate: '12 Jan 2026',
    endDate: '15 Jan 2026',
    location: 'Marriott Hotel, Constantine',
    attendees: 1500,
    price: '7,000 DA',
    image: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=800',
    description: 'Le plus grand rassemblement de cardiologues en Algérie. Focus sur les nouvelles technologies d\'imagerie et les interventions valvulaires. Un événement scientifique majeur au cœur de la ville des ponts suspendus.',
    contactEmail: 'contact@cicc-algerie.dz',
    contactPhone: '+213 31 91 11 00',
    isArchived: false,
    committee: ['Pr. Kamel Bouraoui (Président)', 'Pr. Sarah Benali', 'Dr. Mohamed Lamine G.', 'Pr. Nassiba Meriem'],
    speakers: [
      { name: 'Pr. Salim Benkhedda', role: 'Chef de Service Cardiologie', institution: 'CHU Mustapha Bacha, Alger', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' },
      { name: 'Dr. Karima Messadi', role: 'Spécialiste en Rythmologie', institution: 'CHU Constantine', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' }
    ],
    sessions: [
      { id: 's1', type: SessionType.PLENARY, time: '08:30', title: 'Session Plénière : Hypertension en Algérie', room: 'Grande Salle Ahmed Bey', description: 'État des lieux et défis thérapeutiques nationaux.' },
      { id: 's2', type: SessionType.PARALLEL, time: '10:30', title: 'Atelier Échocardiographie Trans-œsophagienne', room: 'Salle Cirta', description: 'Démonstrations pratiques sur simulateurs.' }
    ],
    workshops: [
      { id: 'w1', title: 'Lecture ECG Avancée', animator: 'Dr. Yacine Touati', capacity: 30, enrolled: 28, time: '13 Jan, 14:00', location: 'Salle Rhumel' }
    ],
    communications: [
      { id: 'c1', title: 'Profil épidémiologique du syndrome coronaire aigu à Constantine', authors: ['Dr. R. Belhadj', 'Pr. S. Ziri'], type: CommunicationType.ORAL, abstractSummary: 'Étude rétrospective sur 500 cas admis au CHU Benbadis.' }
    ]
  },
  {
    id: '2',
    title: 'Symposium National : IA et Imagerie Médicale Moderne',
    theme: 'Radiology',
    startDate: '05 Feb 2026',
    endDate: '06 Feb 2026',
    location: 'Centre International des Conférences (CIC), Alger',
    attendees: 2000,
    price: '9,500 DA',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    description: 'Une exploration approfondie de l\'impact de l\'intelligence artificielle sur le diagnostic radiologique en Algérie. Organisé au prestigieux CIC Abdelatif Rahal.',
    contactEmail: 'ia-sante@cic.dz',
    contactPhone: '+213 21 00 22 33',
    isArchived: false,
    committee: ['Pr. Mustapha Khiati', 'Dr. Nadia Hamidi', 'Pr. Redouane Belhadj'],
    speakers: [{ name: 'Pr. Ahmed Rezki', role: 'Directeur de Recherche', institution: 'USTHB / Pasteur Alger', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  },
  {
    id: '3',
    title: 'Journées Méditerranéennes d\'Oncologie d\'Oran',
    theme: 'Oncology',
    startDate: '20 Mar 2026',
    endDate: '22 Mar 2026',
    location: 'Le Méridien Hotel & Convention Centre, Oran',
    attendees: 800,
    price: '6,500 DA',
    image: 'https://images.unsplash.com/photo-1579152276503-34e85743b171?auto=format&fit=crop&q=80&w=800',
    description: 'Consacré aux avancées en immunothérapie et aux protocoles de soins personnalisés pour les patients d\'Afrique du Nord.',
    contactEmail: 'oran-onco@medsymposium.dz',
    contactPhone: '+213 41 88 77 66',
    isArchived: false,
    committee: ['Pr. Belkacem Z.', 'Dr. Souad G.'],
    speakers: [{ name: 'Pr. Fatima Zohra B.', role: 'Oncologue Médicale', institution: 'EHU Oran', image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  },
  {
    id: '4',
    title: 'Colloque de Pédiatrie et Santé Infantile',
    theme: 'Pediatrics',
    startDate: '10 May 2026',
    endDate: '12 May 2026',
    location: 'Park Mall Sétif Hotel, Sétif',
    attendees: 600,
    price: '4,500 DA',
    image: 'https://images.unsplash.com/photo-1581594632702-f2013b9bdaee?auto=format&fit=crop&q=80&w=800',
    description: 'Rencontre annuelle des pédiatres de l\'Est Algérien. Thématiques : nutrition infantile et calendrier vaccinal national.',
    contactEmail: 'setif-pediatrie@med.dz',
    contactPhone: '+213 36 00 11 22',
    isArchived: false,
    committee: ['Dr. Amina Guezane', 'Pr. Lamine G.'],
    speakers: [{ name: 'Pr. Mustapha Khiati', role: 'Président de la FOREM', institution: 'Alger', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  },
  {
    id: '5',
    title: 'Sommet Maghrébin d\'Endocrinologie',
    theme: 'Endocrinology',
    startDate: '15 Oct 2024',
    endDate: '17 Oct 2024',
    location: 'Sheraton Hotel, Annaba',
    attendees: 400,
    price: '5,000 DA',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80&w=800',
    description: 'Une rétrospective sur les défis du diabète de type 2 et les maladies métaboliques en zone côtière.',
    contactEmail: 'annaba-endo@dz-medical.com',
    contactPhone: '+213 38 40 50 60',
    isArchived: true,
    committee: ['Pr. Z. Lamri', 'Dr. F. Souahi'],
    speakers: [{ name: 'Pr. Amine K.', role: 'Professeur en Endocrinologie', institution: 'CHU Annaba', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  },
  {
    id: '6',
    title: 'Conférence Nationale de Chirurgie Viscérale',
    theme: 'Surgery',
    startDate: '12 Nov 2024',
    endDate: '14 Nov 2024',
    location: 'Renaissance Hotel, Tlemcen',
    attendees: 350,
    price: '8,000 DA',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=800',
    description: 'Séminaire sur les techniques laparoscopiques avancées et la chirurgie robotique en milieu hospitalier algérien.',
    contactEmail: 'tlemcen-surgery@medsymposium.dz',
    contactPhone: '+213 43 20 10 00',
    isArchived: true,
    committee: ['Pr. F. Mansouri', 'Dr. H. Zahra'],
    speakers: [{ name: 'Dr. Karima T.', role: 'Chirurgien Chef', institution: 'CHU Tlemcen', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  },
  {
    id: '7',
    title: 'Forum de Dermatologie de Kabylie',
    theme: 'Dermatology',
    startDate: '05 Dec 2024',
    endDate: '07 Dec 2024',
    location: 'Hotel Atlantis, Bejaia',
    attendees: 500,
    price: '4,000 DA',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800',
    description: 'Discussion sur les pathologies cutanées liées au climat méditerranéen et les nouvelles thérapies biologiques.',
    contactEmail: 'bejaia-derma@atlantis.dz',
    contactPhone: '+213 34 11 22 33',
    isArchived: true,
    committee: ['Dr. Rayane S.', 'Pr. Sofia Meriem'],
    speakers: [{ name: 'Pr. Sarah Benali', role: 'Dermatologue', institution: 'CHU Bejaia', image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  },
  {
    id: '8',
    title: 'Séminaire Médical du Sahara',
    theme: 'Gastroenterology',
    startDate: '10 Feb 2024',
    endDate: '11 Feb 2024',
    location: 'Hotel M\'Zab, Ghardaia',
    attendees: 200,
    price: '3,500 DA',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
    description: 'Traitement des maladies digestives en zone aride et prévention des intoxications alimentaires saisonnières.',
    contactEmail: 'ghardaia-med@dz-sante.com',
    contactPhone: '+213 29 80 70 60',
    isArchived: true,
    committee: ['Pr. Amine K.', 'Dr. Yacine B.'],
    speakers: [{ name: 'Dr. Mourad K.', role: 'Gastro-entérologue', institution: 'Hôpital Ghardaia', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  },
  {
    id: '9',
    title: 'Conférence Inter-Wilayas sur l\'Ophtalmologie',
    theme: 'Surgery',
    startDate: '18 Jun 2026',
    endDate: '20 Jun 2026',
    location: 'Hotel AZ Kouba, Alger',
    attendees: 450,
    price: '6,000 DA',
    image: 'https://images.unsplash.com/photo-1579152276503-34e85743b171?auto=format&fit=crop&q=80&w=800',
    description: 'Focus sur la chirurgie de la cataracte et les nouveaux lasers de traitement de la rétine.',
    contactEmail: 'kouba-ophta@az-hotels.dz',
    contactPhone: '+213 21 50 60 70',
    isArchived: false,
    committee: ['Pr. Salim Benkhedda', 'Dr. Nadia Hamidi'],
    speakers: [{ name: 'Dr. Yacine Touati', role: 'Ophtalmologue', institution: 'Clinique El Manar', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=200' }],
    sessions: [],
    workshops: [],
    communications: []
  }
];

export const SPECIALTIES = [
  'Cardiology', 'Oncology', 'Neurology', 'Pediatrics', 
  'Dermatology', 'Psychiatry', 'Orthopedics', 'Gastroenterology',
  'Radiology', 'Endocrinology', 'Immunology', 'Surgery'
];
