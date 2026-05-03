const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const sql = neon(process.env.VITE_NEON_DATABASE_URL);

async function migrate() {
  console.log('🚀 Initializing Migration...');

  try {
    // 1. Drop existing tables
    console.log('🗑️ Dropping existing tables...');
    await sql`DROP TABLE IF EXISTS applications CASCADE`;
    await sql`DROP TABLE IF EXISTS jobs CASCADE`;
    await sql`DROP TABLE IF EXISTS candidates CASCADE`;
    await sql`DROP TABLE IF EXISTS employers CASCADE`;

    // 2. Create tables
    console.log('🏗️ Creating tables...');
    
    await sql`
      CREATE TABLE employers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        industry TEXT,
        size TEXT,
        city TEXT,
        state TEXT,
        contact_person TEXT,
        active_jobs INTEGER DEFAULT 0,
        total_hired INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active'
      )
    `;

    await sql`
      CREATE TABLE jobs (
        id TEXT PRIMARY KEY,
        employer_id TEXT REFERENCES employers(id),
        title TEXT NOT NULL,
        company TEXT,
        location TEXT,
        min_experience INTEGER,
        max_experience INTEGER,
        min_salary INTEGER,
        max_salary INTEGER,
        employment_type TEXT,
        work_mode TEXT,
        department TEXT,
        description TEXT,
        skills JSONB,
        openings INTEGER DEFAULT 1,
        deadline TIMESTAMP,
        status TEXT DEFAULT 'published',
        applicant_count INTEGER DEFAULT 0,
        posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE candidates (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT,
        skills JSONB,
        experience INTEGER,
        location TEXT,
        qualification TEXT,
        expected_salary INTEGER,
        notice_period INTEGER,
        resume_available BOOLEAN DEFAULT false,
        status TEXT DEFAULT 'active',
        profile_strength INTEGER DEFAULT 0,
        open_to_work BOOLEAN DEFAULT true,
        email TEXT UNIQUE,
        phone TEXT,
        saved_jobs JSONB DEFAULT '[]'
      )
    `;

    await sql`
      CREATE TABLE applications (
        id TEXT PRIMARY KEY,
        job_id TEXT REFERENCES jobs(id),
        candidate_id TEXT REFERENCES candidates(id),
        status TEXT DEFAULT 'applied',
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        recruiter_note TEXT
      )
    `;

    console.log('✅ Tables created successfully.');

    // 3. Seed Data
    console.log('🌱 Seeding data...');

    // Seed Employers
    const employersData = [
      { id: 'comp_001', name: 'TechCorp Solutions', industry: 'IT Services', size: '1000+', city: 'Chennai', state: 'Tamil Nadu', contactPerson: 'Suresh Raina', activeJobs: 5, totalHired: 120 },
      { id: 'comp_002', name: 'Nexus Retail Group', industry: 'Retail', size: '500-1000', city: 'Chennai', state: 'Tamil Nadu', contactPerson: 'Priya Mani', activeJobs: 3, totalHired: 45 },
      { id: 'comp_003', name: 'PixelCraft Studio', industry: 'Design', size: '50-200', city: 'Remote', state: 'Global', contactPerson: 'Arjun Das', activeJobs: 2, totalHired: 12 },
      { id: 'comp_004', name: 'DataPulse Analytics', industry: 'Data Science', size: '200-500', city: 'Chennai', state: 'Tamil Nadu', contactPerson: 'Meera Jasmine', activeJobs: 4, totalHired: 28 },
      { id: 'comp_005', name: 'BrandMesh Agency', industry: 'Marketing', size: '100-250', city: 'Chennai', state: 'Tamil Nadu', contactPerson: 'Karthik Sivakumar', activeJobs: 3, totalHired: 15 },
      { id: 'comp_006', name: 'FinEdge Technologies', industry: 'Fintech', size: '500-1000', city: 'Chennai', state: 'Tamil Nadu', contactPerson: 'Lakshmi Narayan', activeJobs: 6, totalHired: 52 },
      { id: 'comp_007', name: 'Firstdot Works', industry: 'HR Tech', size: '50-100', city: 'Chennai', state: 'Tamil Nadu', contactPerson: 'Priya Krishnan', activeJobs: 2, totalHired: 8 },
    ];

    for (const e of employersData) {
      await sql`
        INSERT INTO employers (id, name, industry, size, city, state, contact_person, active_jobs, total_hired)
        VALUES (${e.id}, ${e.name}, ${e.industry}, ${e.size}, ${e.city}, ${e.state}, ${e.contactPerson}, ${e.activeJobs}, ${e.totalHired})
      `;
    }

    // Seed Jobs (Simplified for seeding)
    const jobsData = [
      { id: 'job_001', employer_id: 'comp_001', title: 'Senior React Developer', company: 'TechCorp Solutions', location: 'Chennai, TN', min_experience: 4, max_experience: 8, min_salary: 1200000, max_salary: 1800000, employment_type: 'full-time', work_mode: 'hybrid', department: 'Engineering', description: 'Senior React Developer role...', skills: ['React', 'TypeScript', 'Node.js'], openings: 3, deadline: '2026-06-15', applicant_count: 24 },
      { id: 'job_002', employer_id: 'comp_002', title: 'HR Business Partner', company: 'Nexus Retail Group', location: 'Chennai, TN', min_experience: 5, max_experience: 10, min_salary: 900000, max_salary: 1400000, employment_type: 'full-time', work_mode: 'onsite', department: 'HR', description: 'HR BP role...', skills: ['HR Strategy', 'Labor Law'], openings: 1, deadline: '2026-06-01', applicant_count: 18 },
      // ... adding more jobs
    ];

    for (const j of jobsData) {
      await sql`
        INSERT INTO jobs (id, employer_id, title, company, location, min_experience, max_experience, min_salary, max_salary, employment_type, work_mode, department, description, skills, openings, deadline, applicant_count)
        VALUES (${j.id}, ${j.employer_id}, ${j.title}, ${j.company}, ${j.location}, ${j.min_experience}, ${j.max_experience}, ${j.min_salary}, ${j.max_salary}, ${j.employment_type}, ${j.work_mode}, ${j.department}, ${j.description}, ${JSON.stringify(j.skills)}, ${j.openings}, ${j.deadline}, ${j.applicant_count})
      `;
    }

    console.log('✨ Seeding complete!');
  } catch (err) {
    console.error('❌ Migration failed:', err);
  }
}

migrate();
