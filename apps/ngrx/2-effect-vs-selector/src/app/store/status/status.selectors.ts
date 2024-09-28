import { createSelector } from '@ngrx/store';
import { ActivityType } from '../activity/activity.model';
import { selectActivities } from '../activity/activity.selectors';
import { selectUser } from '../user/user.selectors';
import { Status } from './status.model';

export const selectStatuses = createSelector(
  selectUser,
  selectActivities,
  (user, activities) => {
    if (!user?.isAdmin) {
      return [];
    }

    const statuses: Status[] = [];
    activities.forEach((activity) => {
      const status = statuses.find((s) => s.name === activity.type);
      if (status) {
        status.teachers.push(activity.teacher);
      } else {
        statuses.push({ name: activity.type, teachers: [activity.teacher] });
      }
    });
    return statuses;
  },
);

export const selectAllTeachersByActivityType = (name: ActivityType) =>
  createSelector(
    selectStatuses,
    (statuses) => statuses.find((s) => s.name == name)?.teachers ?? [],
  );
