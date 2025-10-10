export interface ProfileData {
  tabs: Array<{
    id: string
    label: string
    icon: string
  }>
  achievements: Array<{
    id: string
    title: string
    description: string
    icon: string
    earned: boolean
  }>
  stats: Array<{
    id: string
    label: string
    value: string
    icon: string
  }>
  settings: Array<{
    id: string
    label: string
    description: string
    type: 'toggle' | 'select' | 'input'
    value: any
  }>
}

export const profileData: ProfileData = {
  tabs: [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'courses', label: 'My Courses', icon: 'BookOpen' },
    { id: 'achievements', label: 'Achievements', icon: 'Award' },
    { id: 'settings', label: 'Settings', icon: 'Settings' }
  ],
  achievements: [
    {
      id: 'first-course',
      title: 'First Steps',
      description: 'Complete your first course',
      icon: 'Award',
      earned: false
    },
    {
      id: 'week-streak',
      title: 'Week Warrior',
      description: 'Study for 7 days in a row',
      icon: 'Calendar',
      earned: false
    },
    {
      id: 'course-master',
      title: 'Course Master',
      description: 'Complete 10 courses',
      icon: 'Trophy',
      earned: false
    }
  ],
  stats: [
    { id: 'courses-completed', label: 'Courses Completed', value: '0', icon: 'BookOpen' },
    { id: 'hours-studied', label: 'Hours Studied', value: '0', icon: 'Clock' },
    { id: 'certificates', label: 'Certificates', value: '0', icon: 'Award' },
    { id: 'streak', label: 'Current Streak', value: '0 days', icon: 'Calendar' }
  ],
  settings: [
    {
      id: 'email-notifications',
      label: 'Email Notifications',
      description: 'Receive email updates about courses and progress',
      type: 'toggle',
      value: true
    },
    {
      id: 'dark-mode',
      label: 'Dark Mode',
      description: 'Use dark theme for the interface',
      type: 'toggle',
      value: true
    },
    {
      id: 'language',
      label: 'Language',
      description: 'Select your preferred language',
      type: 'select',
      value: 'English'
    }
  ]
}
