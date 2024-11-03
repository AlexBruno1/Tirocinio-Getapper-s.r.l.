import { Filter, ObjectId, WithId } from "mongodb";
import mongoDao from "@/lib/mongodb/mongo-dao";
import {
  ActivityStatus,
  ReminderStrategy,
} from "@/models/common/ActivityCommon";
import { IActivityFe } from "@/models/client/ActivityFe";

export type IActivity = {
  _id?: ObjectId;
  userIds: Array<ObjectId>;
  title: string;
  reminderStrategy: ReminderStrategy;
  reminderTime: number;
  deadline: Date;
  params: {
    customersIds: Array<ObjectId>;
    jobsIds: Array<ObjectId>;
    projectsIds: Array<ObjectId>;
    workersIds: Array<ObjectId>;
  };
  status: ActivityStatus;
  created: Date;
  v: number;
};

export class Activity implements WithId<IActivity> {
  _id: ObjectId;
  userIds: Array<ObjectId>;
  title: string;
  reminderStrategy: ReminderStrategy;
  reminderTime: number;
  deadline: Date;
  params: {
    customersIds: Array<ObjectId>;
    jobsIds: Array<ObjectId>;
    projectsIds: Array<ObjectId>;
    workersIds: Array<ObjectId>;
  };
  status: ActivityStatus;
  created: Date;
  v: number;

  static get collectionName() {
    return "activities";
  }

  constructor(iActivity: IActivity) {
    this.fromInterface(iActivity);
  }

  static async create(
    userIds: Array<ObjectId>,
    title: string,
    reminderStrategy: ReminderStrategy,
    reminderTime: number,
    deadline: Date,
  ): Promise<Activity | null> {
    const iActivity = await mongoDao.insertOne<IActivity>(
      Activity.collectionName,
      {
        userIds,
        title,
        reminderStrategy,
        reminderTime,
        deadline,
        params: {
          customersIds: [],
          jobsIds: [],
          projectsIds: [],
          workersIds: [],
        },
        status: ActivityStatus.ACTIVE,
        created: new Date(),
        v: 1,
      },
    );
    return iActivity ? new Activity(iActivity) : null;
  }

  static async getById(_id: ObjectId): Promise<Activity | null> {
    const iActivity = await mongoDao.findOne<IActivity>(
      Activity.collectionName,
      {
        _id,
      },
    );
    return iActivity ? new Activity(iActivity) : null;
  }

  async patch(fields: Partial<IActivity>): Promise<void> {
    const result = await mongoDao.updateOne<IActivity>(
      Activity.collectionName,
      {
        _id: this._id,
      },
      {
        $set: fields,
      },
    );
    if (result.modifiedCount !== 1) {
      throw new Error("Patch op was not applied successfully");
    }
    await this.refresh();
  }

  static async delete(_id: ObjectId): Promise<void> {
    const result = await mongoDao.deleteOne<IActivity>(
      Activity.collectionName,
      {
        _id,
      },
    );
    if (result.deletedCount !== 1) {
      throw new Error("Delete op was not applied successfully");
    }
  }

  static async getList(
    filter: Filter<IActivity> = {},
    {
      limit = 10,
      skip = 0,
      sort = [],
      projection = null,
    }: {
      limit?: number;
      skip?: number;
      sort?: {
        by: keyof IActivity;
        asc: boolean;
      }[];
      projection?: Document;
    } = {
      limit: 10,
      skip: 0,
      sort: [],
      projection: null,
    },
  ): Promise<Activity[]> {
    const iActivities = await mongoDao.findMany<IActivity>(
      Activity.collectionName,
      filter,
      {
        limit,
        skip,
        sort: sort.length
          ? Object.fromEntries(sort.map((pair) => [pair.by, pair.asc ? 1 : -1]))
          : undefined,
        projection,
      },
    );
    return iActivities.map((iActivity) => new Activity(iActivity));
  }

  /* Mostly for internal use */

  fromInterface(iActivity: IActivity) {
    if (!iActivity._id) {
      throw new Error("Interface object doesn't have an _id");
    }
    this._id = iActivity._id;
    this.userIds = iActivity.userIds;
    this.title = iActivity.title;
    this.reminderStrategy = iActivity.reminderStrategy;
    this.params = iActivity.params;
    this.status = iActivity.status;
    this.created = iActivity.created;
    this.v = iActivity.v;
  }

  async refresh() {
    const iActivity = await mongoDao.findOne<IActivity>(
      Activity.collectionName,
      {
        _id: this._id,
      },
    );
    if (iActivity) {
      this.fromInterface(iActivity);
    } else {
      throw new Error("Couldn't find document in DB");
    }
  }

  toClientVersion(): IActivityFe {
    return {
      _id: this._id.toHexString(),
      userIds: this.userIds.map((userId) => userId.toHexString()),
      title: this.title,
      reminderStrategy: this.reminderStrategy,
      reminderTime: this.reminderTime,
      deadline: this.deadline,
      params: {
        customersIds: this.params.customersIds.map((customerId) =>
          customerId.toHexString(),
        ),
        jobsIds: this.params.jobsIds.map((jobId) => jobId.toHexString()),
        projectsIds: this.params.projectsIds.map((projectId) =>
          projectId.toHexString(),
        ),
        workersIds: this.params.workersIds.map((workerId) =>
          workerId.toHexString(),
        ),
      },
    };
  }
}
