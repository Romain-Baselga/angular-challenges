import { createSelector } from '@ngrx/store';
import { ActivityType } from '../activity/activity.model';
import { selectActivities } from '../activity/activity.selectors';
import { selectUser } from '../user/user.selectors';
import { Status } from './status.model';

export const selectStatuses = createSelector(
  selectUser,
  selectActivities,
  (user, activities) => {
    if (user?.isAdmin) {
      return activities.reduce((status: Status[], activity): Status[] => {
        const index = status.findIndex((s) => s.name === activity.type);
        if (index === -1) {
          return [
            ...status,
            { name: activity.type, teachers: [activity.teacher] },
          ];
        } else {
          status[index].teachers.push(activity.teacher);
          return status;
        }
      }, []);
    }
    return [];
  },
);

export const selectAllTeachersByActivityType = (name: ActivityType) =>
  createSelector(
    selectStatuses,
    (statuses) => statuses.find((s) => s.name == name)?.teachers ?? [],
  );
