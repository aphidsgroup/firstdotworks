// Mock Applications — links candidates to jobs with pipeline status
// Replace with: GET /api/v1/applications

export const applications = [
  { id: 'app_001', jobId: 'job_001', candidateId: 'cand_001', status: 'shortlisted', appliedAt: '2026-04-20', recruiterNote: 'Strong profile, good culture fit.' },
  { id: 'app_002', jobId: 'job_003', candidateId: 'cand_002', status: 'interview_scheduled', appliedAt: '2026-04-16', recruiterNote: 'Portfolio is excellent.' },
  { id: 'app_003', jobId: 'job_004', candidateId: 'cand_003', status: 'applied', appliedAt: '2026-04-23', recruiterNote: '' },
  { id: 'app_004', jobId: 'job_002', candidateId: 'cand_004', status: 'selected', appliedAt: '2026-04-21', recruiterNote: 'Cleared all rounds. Offer sent.' },
  { id: 'app_005', jobId: 'job_006', candidateId: 'cand_005', status: 'shortlisted', appliedAt: '2026-04-26', recruiterNote: 'K8s exp verified.' },
  { id: 'app_006', jobId: 'job_007', candidateId: 'cand_006', status: 'applied', appliedAt: '2026-04-13', recruiterNote: '' },
  { id: 'app_007', jobId: 'job_009', candidateId: 'cand_007', status: 'interview_scheduled', appliedAt: '2026-04-29', recruiterNote: 'Technical round on 10 May.' },
  { id: 'app_008', jobId: 'job_008', candidateId: 'cand_008', status: 'shortlisted', appliedAt: '2026-04-18', recruiterNote: '7 yrs PM exp, strong.' },
  { id: 'app_009', jobId: 'job_011', candidateId: 'cand_009', status: 'applied', appliedAt: '2026-04-09', recruiterNote: '' },
  { id: 'app_010', jobId: 'job_014', candidateId: 'cand_010', status: 'applied', appliedAt: '2026-04-20', recruiterNote: '' },
  { id: 'app_011', jobId: 'job_012', candidateId: 'cand_011', status: 'screened', appliedAt: '2026-04-27', recruiterNote: 'Resume looks good. Need to verify exp.' },
  { id: 'app_012', jobId: 'job_016', candidateId: 'cand_012', status: 'applied', appliedAt: '2026-04-22', recruiterNote: '' },
  { id: 'app_013', jobId: 'job_015', candidateId: 'cand_013', status: 'shortlisted', appliedAt: '2026-04-30', recruiterNote: 'Top candidate. Schedule ASAP.' },
  { id: 'app_014', jobId: 'job_010', candidateId: 'cand_014', status: 'applied', appliedAt: '2026-04-06', recruiterNote: '' },
  { id: 'app_015', jobId: 'job_013', candidateId: 'cand_015', status: 'interview_scheduled', appliedAt: '2026-04-15', recruiterNote: 'Interview on 7 May.' },
  { id: 'app_016', jobId: 'job_018', candidateId: 'cand_016', status: 'screened', appliedAt: '2026-04-24', recruiterNote: 'Angular 15 exp confirmed.' },
  { id: 'app_017', jobId: 'job_005', candidateId: 'cand_017', status: 'applied', appliedAt: '2026-04-11', recruiterNote: '' },
  { id: 'app_018', jobId: 'job_002', candidateId: 'cand_018', status: 'rejected', appliedAt: '2026-04-21', recruiterNote: 'Not aligned with team needs.' },
  { id: 'app_019', jobId: 'job_004', candidateId: 'cand_019', status: 'shortlisted', appliedAt: '2026-04-23', recruiterNote: 'Strong in Spark + dbt combo.' },
  { id: 'app_020', jobId: 'job_003', candidateId: 'cand_020', status: 'applied', appliedAt: '2026-04-16', recruiterNote: '' },
  { id: 'app_021', jobId: 'job_009', candidateId: 'cand_021', status: 'interview_scheduled', appliedAt: '2026-04-29', recruiterNote: 'Second round scheduled.' },
  { id: 'app_022', jobId: 'job_007', candidateId: 'cand_022', status: 'screened', appliedAt: '2026-04-13', recruiterNote: 'Writing sample good.' },
  { id: 'app_023', jobId: 'job_010', candidateId: 'cand_023', status: 'applied', appliedAt: '2026-04-06', recruiterNote: '' },
  { id: 'app_024', jobId: 'job_003', candidateId: 'cand_024', status: 'shortlisted', appliedAt: '2026-04-16', recruiterNote: 'Top UX candidate so far.' },
  { id: 'app_025', jobId: 'job_005', candidateId: 'cand_025', status: 'applied', appliedAt: '2026-04-11', recruiterNote: '' },
  { id: 'app_026', jobId: 'job_017', candidateId: 'cand_026', status: 'selected', appliedAt: '2026-04-12', recruiterNote: 'Placed. Joining 1 June.' },
  { id: 'app_027', jobId: 'job_001', candidateId: 'cand_027', status: 'screened', appliedAt: '2026-04-19', recruiterNote: '2 yrs React, needs assessment.' },
  { id: 'app_028', jobId: 'job_014', candidateId: 'cand_028', status: 'applied', appliedAt: '2026-04-20', recruiterNote: '' },
  { id: 'app_029', jobId: 'job_006', candidateId: 'cand_029', status: 'interview_scheduled', appliedAt: '2026-04-26', recruiterNote: 'Infra interview on 9 May.' },
  { id: 'app_030', jobId: 'job_010', candidateId: 'cand_030', status: 'applied', appliedAt: '2026-04-06', recruiterNote: '' },
  { id: 'app_031', jobId: 'job_001', candidateId: 'cand_031', status: 'shortlisted', appliedAt: '2026-04-19', recruiterNote: 'Good Python + Django combo.' },
  { id: 'app_032', jobId: 'job_007', candidateId: 'cand_032', status: 'applied', appliedAt: '2026-04-13', recruiterNote: '' },
  { id: 'app_033', jobId: 'job_002', candidateId: 'cand_033', status: 'screened', appliedAt: '2026-04-21', recruiterNote: 'Strong TA background.' },
  { id: 'app_034', jobId: 'job_013', candidateId: 'cand_034', status: 'applied', appliedAt: '2026-04-15', recruiterNote: '' },
  { id: 'app_035', jobId: 'job_012', candidateId: 'cand_035', status: 'shortlisted', appliedAt: '2026-04-27', recruiterNote: 'Strong ML portfolio.' },
]

// Analytics helpers
export const getApplicationsByJob = (jobId) => applications.filter(a => a.jobId === jobId)
export const getApplicationsByCandidate = (candidateId) => applications.filter(a => a.candidateId === candidateId)

export const applicationStatusCount = () => {
  return applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1
    return acc
  }, {})
}

// Mock trend data for charts
export const applicationTrend = [
  { month: 'Nov', applications: 28, shortlisted: 8 },
  { month: 'Dec', applications: 35, shortlisted: 11 },
  { month: 'Jan', applications: 52, shortlisted: 18 },
  { month: 'Feb', applications: 67, shortlisted: 22 },
  { month: 'Mar', applications: 89, shortlisted: 30 },
  { month: 'Apr', applications: 124, shortlisted: 42 },
]

export const hiringFunnel = [
  { stage: 'Applied', count: 318 },
  { stage: 'Screened', count: 198 },
  { stage: 'Shortlisted', count: 74 },
  { stage: 'Interviewed', count: 38 },
  { stage: 'Selected', count: 16 },
]
