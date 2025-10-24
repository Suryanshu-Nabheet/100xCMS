#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of course UI files to update
const courseFiles = [
  'src/components/Dashboard/Courses/DsaClasses/DsaClassesUI.tsx',
  'src/components/Dashboard/Courses/AndroidDevelopment/AndroidDevelopmentUI.tsx',
  'src/components/Dashboard/Courses/EthicalHacking/EthicalHackingUI.tsx',
  'src/components/Dashboard/Courses/IOSDevelopment/IOSDevelopmentUI.tsx',
  'src/components/Dashboard/Courses/Web3Cohort/Web3CohortUI.tsx',
  'src/components/Dashboard/Courses/AdhocClasses/AdhocClassesUI.tsx',
  'src/components/Dashboard/Courses/SolanaFellowship/SolanaFellowshipUI.tsx',
  'src/components/Dashboard/Courses/DevopsCohort/DevopsCohortUI.tsx'
];

// Course ID mapping
const courseIdMap = {
  'DsaClassesUI.tsx': 'dsa-classes',
  'AndroidDevelopmentUI.tsx': 'android-development',
  'EthicalHackingUI.tsx': 'ethical-hacking',
  'IOSDevelopmentUI.tsx': 'ios-development',
  'Web3CohortUI.tsx': 'web3-cohort',
  'AdhocClassesUI.tsx': 'adhoc-classes',
  'SolanaFellowshipUI.tsx': 'solana-fellowship',
  'DevopsCohortUI.tsx': 'devops-cohort'
};

courseFiles.forEach(filePath => {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Extract course ID from filename
    const fileName = path.basename(filePath);
    const courseId = courseIdMap[fileName];
    
    if (courseId) {
      // Add data-course-id to main container
      content = content.replace(
        /<div className="min-h-screen bg-black">/,
        `<div className="min-h-screen bg-black" data-course-id="${courseId}">`
      );
      
      // Add data-module-id to module cards
      content = content.replace(
        /<div\s+key={module\.id}\s+className="bg-white\/5 backdrop-blur-sm border border-white\/10 rounded-xl overflow-hidden hover:bg-white\/10 transition-all duration-200 group cursor-pointer"/,
        `<div key={module.id} data-module-id={module.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"`
      );
      
      // Add data-lesson-id to lesson cards
      content = content.replace(
        /<div\s+key={lesson\.id}\s+className="bg-white\/5 backdrop-blur-sm border border-white\/10 rounded-xl overflow-hidden hover:bg-white\/10 transition-all duration-200 group cursor-pointer"/,
        `<div key={lesson.id} data-lesson-id={lesson.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-200 group cursor-pointer"`
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`Updated ${fileName} with data attributes`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});

console.log('All course UI files updated with data attributes!');
