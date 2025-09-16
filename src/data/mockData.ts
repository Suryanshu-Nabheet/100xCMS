// Deprecated: This file now re-exports the real data managers so the app has a single
// source of truth. Import from this file or from `realData` directly — both point to
// the same implementations.

export { UserManager, CourseManager, EnrollmentManager, ProgressManager, AchievementManager } from './realData'