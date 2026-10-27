import { StudentProfile } from '../types/student';
import { Opportunity, RecommendationScore, ScoredOpportunity } from '../types/opportunity';
import { StudentRoadmap } from '../types/roadmap';

export interface NextBestMove {
  actionTitle: string;
  badgeText: string;
  category: 'Milestone Task' | 'High-Impact Opportunity' | 'Skill Gap Bridge';
  whyRelevant: string;
  estimatedTime: string;
  expectedBenefit: string;
  targetId: string;
  actionType: 'navigate_roadmap' | 'view_opportunity' | 'edit_profile';
  buttonLabel: string;
  engineNote: string;
}

export class RecommendationEngine {
  /**
   * Transparent Rule-Based Match Scoring for ALL Departments
   * Scores an opportunity from 0 to 100 based on exact transparent criteria.
   */
  static scoreOpportunity(opportunity: Opportunity, profile: StudentProfile): RecommendationScore {
    let skillScore = 0;
    let interestScore = 0;
    let deptScore = 0;
    let locationScore = 0;
    let deadlineScore = 0;
    const rationale: string[] = [];
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];

    // 1. Skill Match (Max 30 points)
    const studentSkillMap = new Map(
      profile.skills.map((s) => [s.name.toLowerCase().trim(), s.level])
    );

    if (opportunity.requiredSkills.length > 0) {
      let matchedWeight = 0;
      opportunity.requiredSkills.forEach((reqSkill) => {
        const reqLower = reqSkill.toLowerCase().trim();
        // Check exact or partial match
        let foundLevel: string | undefined = studentSkillMap.get(reqLower);
        if (!foundLevel) {
          // Check if any student skill is substring or vice versa
          for (const [sName, sLevel] of studentSkillMap.entries()) {
            if (sName.includes(reqLower) || reqLower.includes(sName)) {
              foundLevel = sLevel;
              break;
            }
          }
        }

        if (foundLevel) {
          matchedSkills.push(reqSkill);
          if (foundLevel === 'Advanced') matchedWeight += 1.0;
          else if (foundLevel === 'Intermediate') matchedWeight += 0.85;
          else matchedWeight += 0.6;
        } else {
          missingSkills.push(reqSkill);
        }
      });

      const skillRatio = matchedWeight / opportunity.requiredSkills.length;
      skillScore = Math.round(skillRatio * 30);

      if (matchedSkills.length > 0) {
        rationale.push(
          `Matches ${matchedSkills.length} of ${opportunity.requiredSkills.length} required skills (${matchedSkills.slice(0, 3).join(', ')}${matchedSkills.length > 3 ? '...' : ''})`
        );
      }
      if (missingSkills.length > 0 && missingSkills.length <= 2) {
        rationale.push(`Growth skill opportunity: Learn ${missingSkills.join(', ')} to boost your edge`);
      }
    } else {
      skillScore = 20; // Default when open to all skills
      rationale.push('Open to all skill levels with no strict prerequisites');
    }

    // 2. Interest Alignment (Max 25 points)
    const combinedText = `${opportunity.title} ${opportunity.description} ${opportunity.category}`.toLowerCase();
    const matchedInterests: string[] = [];
    profile.areasOfInterest.forEach((interest) => {
      const keywords = interest.toLowerCase().split(' ');
      const hasMatch = keywords.some((k) => k.length > 3 && combinedText.includes(k));
      if (hasMatch) {
        matchedInterests.push(interest);
      }
    });

    if (matchedInterests.length > 0) {
      interestScore = Math.min(25, matchedInterests.length * 12);
      rationale.push(`Directly connects with your interest in ${matchedInterests[0]}`);
    } else {
      interestScore = 10;
    }

    // 3. Department Relevance (Max 20 points) - Supports ALL Departments
    const studentDept = (profile.customDepartment || profile.department || '').toLowerCase();
    const isAllDepartments = opportunity.department.some(
      (d) => d.toLowerCase().includes('all department') || d.toLowerCase() === 'all'
    );

    const isDirectMatch = opportunity.department.some((d) => {
      const dLower = d.toLowerCase();
      if (dLower === studentDept) return true;
      if (studentDept.includes('biomedical') && dLower.includes('biomedical')) return true;
      if (studentDept.includes('mechanical') && (dLower.includes('mechanical') || dLower.includes('aero'))) return true;
      if (studentDept.includes('civil') && dLower.includes('civil')) return true;
      if (studentDept.includes('computer') && (dLower.includes('computer') || dLower.includes('it') || dLower.includes('cse'))) return true;
      if (studentDept.includes('information') && (dLower.includes('information') || dLower.includes('it'))) return true;
      if (studentDept.includes('data') && dLower.includes('data')) return true;
      if (studentDept.includes('commerce') && (dLower.includes('commerce') || dLower.includes('b.com'))) return true;
      if (studentDept.includes('business') && (dLower.includes('business') || dLower.includes('bba') || dLower.includes('mba'))) return true;
      if (studentDept.includes('biotech') && (dLower.includes('biotech') || dLower.includes('life science'))) return true;
      if (studentDept.includes('pharmacy') && (dLower.includes('pharmacy') || dLower.includes('health'))) return true;
      if (studentDept.includes('law') && dLower.includes('law')) return true;
      if (studentDept.includes('agri') && dLower.includes('agri')) return true;
      return false;
    });

    if (isDirectMatch) {
      deptScore = 20;
      rationale.push(`Curated specifically for ${profile.customDepartment || profile.department} students`);
    } else if (isAllDepartments) {
      deptScore = 18;
      rationale.push('Open to students across all college degree disciplines');
    } else {
      deptScore = 6;
    }

    // Academic Year Eligibility Check
    if (opportunity.eligibleAcademicYears && opportunity.eligibleAcademicYears.length > 0) {
      if (opportunity.eligibleAcademicYears.includes(profile.academicYear)) {
        rationale.push(`Eligible for ${profile.academicYear} students`);
      }
    }

    // 4. Location & Format Preference (Max 15 points)
    if (opportunity.type === 'Online') {
      locationScore = 15;
      rationale.push('100% Virtual / Online — accessible from anywhere');
    } else {
      // Offline distance logic relative to student city
      if (opportunity.distanceKm <= 15) {
        locationScore = 15;
        rationale.push(`Nearby event (${opportunity.distanceKm} km from your college/city area)`);
      } else if (opportunity.distanceKm <= 35) {
        locationScore = 11;
        rationale.push(`Regional location (${opportunity.distanceKm} km)`);
      } else {
        locationScore = 7;
      }
    }

    // 5. Registration Deadline & Urgency (Max 10 points)
    try {
      const deadlineDate = new Date(opportunity.registrationDeadline);
      const today = new Date();
      const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));

      if (diffDays > 0 && diffDays <= 7) {
        deadlineScore = 10;
        rationale.push(`Closes soon (within ${diffDays} days) — action recommended`);
      } else if (diffDays > 7 && diffDays <= 21) {
        deadlineScore = 8;
      } else if (diffDays > 21) {
        deadlineScore = 6;
      } else {
        deadlineScore = 3;
      }
    } catch {
      deadlineScore = 5;
    }

    const totalScore = Math.min(100, Math.max(10, skillScore + interestScore + deptScore + locationScore + deadlineScore));

    return {
      totalScore,
      skillMatchScore: skillScore,
      interestMatchScore: interestScore,
      departmentMatchScore: deptScore,
      locationScore,
      deadlineScore,
      rationale,
      matchedSkills,
      missingSkills,
    };
  }

  /**
   * Sort and attach scores to all opportunities
   */
  static getScoredOpportunities(opportunities: Opportunity[], profile: StudentProfile): ScoredOpportunity[] {
    return opportunities
      .map((opp) => ({
        ...opp,
        matchScore: this.scoreOpportunity(opp, profile),
      }))
      .sort((a, b) => b.matchScore.totalScore - a.matchScore.totalScore);
  }

  /**
   * Generates the "Your Next Best Move" card
   */
  static getNextBestMove(
    profile: StudentProfile,
    roadmap: StudentRoadmap,
    scoredOpportunities: ScoredOpportunity[]
  ): NextBestMove {
    const studentDept = profile.customDepartment || profile.department;

    // 1. Check if there is an urgent top-scoring opportunity closing within 10 days
    const urgentTopOpp = scoredOpportunities.find(
      (opp) => opp.matchScore.totalScore >= 80 && opp.matchScore.deadlineScore === 10 && opp.officialRegistrationUrl
    );

    // 2. Find next incomplete task in roadmap
    let nextTask: { task: any; milestone: any } | null = null;
    for (const milestone of roadmap.milestones) {
      const uncompleted = milestone.tasks.find((t) => !t.isCompleted);
      if (uncompleted) {
        nextTask = { task: uncompleted, milestone };
        break;
      }
    }

    // If there's an urgent top opportunity and user hasn't completed it, highlight it
    if (urgentTopOpp && (!nextTask || Math.random() > 0.65)) {
      return {
        actionTitle: `Apply / Register for: ${urgentTopOpp.title}`,
        badgeText: `${urgentTopOpp.matchScore.totalScore}% Match • Deadline Closing`,
        category: 'High-Impact Opportunity',
        whyRelevant: `Curated for your ${studentDept} background and targets your goal to become a ${profile.targetRole}.`,
        estimatedTime: '20 - 30 minutes to apply',
        expectedBenefit: `Secures your participation spot, provides practical validation, and connects you directly with ${urgentTopOpp.organizer}.`,
        targetId: urgentTopOpp.id,
        actionType: 'view_opportunity',
        buttonLabel: 'View Opportunity & Apply',
        engineNote: 'Rule Trigger: Top department match score > 80% with registration deadline within 7 days.',
      };
    }

    // Otherwise, recommend the next roadmap milestone task
    if (nextTask) {
      return {
        actionTitle: `${nextTask.milestone.title.split(':')[0]}: ${nextTask.task.title}`,
        badgeText: `Next Step in Your ${roadmap.title.split(' ')[0]} Sprint`,
        category: 'Milestone Task',
        whyRelevant: `Aligned with your target goal: "${profile.careerGoal}". Completing this task advances your ${studentDept} skill development and builds the practical deliverable required for upcoming applications.`,
        estimatedTime: `${nextTask.task.estimatedHours} hours (Fits your ${profile.weeklyHoursAvailable}h/week budget)`,
        expectedBenefit: `Direct outcome: ${nextTask.task.practicalOutcome || 'Builds a verified portfolio deliverable and reinforces your domain expertise'}.`,
        targetId: nextTask.task.id,
        actionType: 'navigate_roadmap',
        buttonLabel: 'Go to Roadmap Task',
        engineNote: `Rule Trigger: Sequential progression through Week ${nextTask.milestone.weekNumber} milestones for ${studentDept}.`,
      };
    }

    // Fallback if all roadmap tasks are completed
    return {
      actionTitle: `Explore Advanced Applications & Fellowships in ${studentDept}`,
      badgeText: 'Milestone Sprint Completed',
      category: 'High-Impact Opportunity',
      whyRelevant: `You have completed all scheduled tasks in your current roadmap sprint! Time to apply to top vetted opportunities.`,
      estimatedTime: '1 - 2 hours',
      expectedBenefit: 'Demonstrates proven consistency and lets you submit multiple vetted applications with your updated portfolio.',
      targetId: scoredOpportunities[0]?.id || 'opp-hack-01',
      actionType: 'view_opportunity',
      buttonLabel: 'Browse All Opportunities',
      engineNote: 'Rule Trigger: 100% roadmap completion reached.',
    };
  }

  /**
   * Identify skill gaps between student's current skills and their specific department & career goals
   */
  static getRecommendedSkillsToDevelop(profile: StudentProfile): { name: string; reason: string; priority: 'High' | 'Medium' }[] {
    const studentSkillNames = new Set(profile.skills.map((s) => s.name.toLowerCase()));
    const recommendations: { name: string; reason: string; priority: 'High' | 'Medium' }[] = [];
    const deptLower = (profile.customDepartment || profile.department || '').toLowerCase();

    // 1. Biomedical & Biotech
    if (deptLower.includes('biomedical') || deptLower.includes('biotech') || deptLower.includes('health')) {
      if (!studentSkillNames.has('medical instrumentation')) {
        recommendations.push({
          name: 'Medical Instrumentation',
          reason: 'Core prerequisite for clinical engineering, sensor interfacing, and patient monitors.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('biosignal processing (ecg/emg)') && !studentSkillNames.has('biosignals')) {
        recommendations.push({
          name: 'Biosignal Processing (ECG/EMG)',
          reason: 'Required for physiological signal filtering, noise rejection, and clinical diagnostics.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('medical device regulations (fda / iso 13485)') && !studentSkillNames.has('iso 13485')) {
        recommendations.push({
          name: 'Medical Device Regulations (FDA / ISO 13485)',
          reason: 'Critical quality management and compliance knowledge demanded by MedTech MNCs.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('medical ai & diagnostic imaging (dicom)') && !studentSkillNames.has('dicom')) {
        recommendations.push({
          name: 'Medical AI & Diagnostic Imaging (DICOM)',
          reason: 'Rapidly emerging skill for clinical pathology classification and radiology automation.',
          priority: 'Medium',
        });
      }
    }
    // 2. Mechanical, Civil, Aerospace
    else if (deptLower.includes('mechanical') || deptLower.includes('aero') || deptLower.includes('civil') || deptLower.includes('cad')) {
      if (!studentSkillNames.has('solidworks (cad)') && !studentSkillNames.has('autocad')) {
        recommendations.push({
          name: 'SolidWorks (CAD)',
          reason: 'The industry-standard 3D parametric design tool for mechanical and product engineers.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('ansys / fea simulation') && !studentSkillNames.has('fea')) {
        recommendations.push({
          name: 'ANSYS / FEA Simulation',
          reason: 'Essential for structural stress, thermal heat dissipation, and topology optimization.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('gd&t tolerancing') && !studentSkillNames.has('gd&t')) {
        recommendations.push({
          name: 'GD&T Tolerancing',
          reason: 'ASME Y14.5 standards required for accurate 2D engineering drawings and CNC manufacturing.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('design for manufacturing (dfm)') && !studentSkillNames.has('dfm')) {
        recommendations.push({
          name: 'Design for Manufacturing (DFM)',
          reason: 'Crucial for injection molding, CNC tooling, and minimizing fabrication costs.',
          priority: 'Medium',
        });
      }
    }
    // 3. Commerce, Management & Finance
    else if (deptLower.includes('commerce') || deptLower.includes('b.com') || deptLower.includes('bba') || deptLower.includes('mba') || deptLower.includes('business')) {
      if (!studentSkillNames.has('financial modeling & valuation')) {
        recommendations.push({
          name: 'Financial Modeling & Valuation',
          reason: 'Foundational capability for equity research, investment banking, and corporate finance.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('power bi & tableau')) {
        recommendations.push({
          name: 'Power BI & Tableau',
          reason: 'High demand tool for interactive business KPI visualization and executive dashboards.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('sql')) {
        recommendations.push({
          name: 'SQL',
          reason: 'Standard language to query enterprise databases and conduct customer retention analytics.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('business strategy & pitch decks')) {
        recommendations.push({
          name: 'Business Strategy & Pitch Decks',
          reason: 'Key communication framework for consulting case interviews and startup ventures.',
          priority: 'Medium',
        });
      }
    }
    // 4. Computing, Software & IT (Default for CSE, IT, BCA, MCA)
    else {
      if (!studentSkillNames.has('data structures & algorithms') && !studentSkillNames.has('dsa')) {
        recommendations.push({
          name: 'Data Structures & Algorithms',
          reason: 'The foundational benchmark tested in 90% of technical screening interviews.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('typescript')) {
        recommendations.push({
          name: 'TypeScript',
          reason: 'Required by modern frontend and full-stack engineering teams.',
          priority: 'High',
        });
      }
      if (!studentSkillNames.has('docker')) {
        recommendations.push({
          name: 'Docker',
          reason: 'Essential for running consistent containerized environments across hackathons.',
          priority: 'Medium',
        });
      }
      if (!studentSkillNames.has('git & github')) {
        recommendations.push({
          name: 'Git & GitHub',
          reason: 'Fundamental version control for participating in hackathons and open source.',
          priority: 'High',
        });
      }
    }

    return recommendations.slice(0, 4);
  }
}
