export const createUserObjects = (
  userData: [string, string, number, string, string][]
) => {
  return userData.map((row) => ({
    id: row[0],
    name: row[1],
    level: row[2],
    creationDate: new Date(row[3]),
    nationality: row[4],
  }));
};

export const createUserArrays = (
  users: {
    id: string;
    name: string;
    level: number;
    creationDate: Date;
    nationality: string;
  }[]
) => {
  return users.map((user) => [
    user.id,
    user.name,
    user.level,
    user.creationDate.toISOString(),
    user.nationality,
  ]);
};

export const createInventoryObjects = (
  inventoryData: [number, string, string, string, string][]
) => {
  return inventoryData.map((row) => ({
    id: row[0],
    userId: row[1],
    slot1: row[2],
    slot2: row[3],
    slot3: row[4],
  }));
};

export const createInventoryArrays = (
  inventories: {
    id: number;
    userId: string;
    slot1: string;
    slot2: string;
    slot3: string;
  }[]
) => {
  return inventories.map((inventory) => [
    inventory.id,
    inventory.userId,
    inventory.slot1,
    inventory.slot2,
    inventory.slot3,
  ]);
};

export const createSkillObjects = (
  skillData: [string, string, string, string, string][]
) => {
  return skillData.map((row) => ({
    name: row[0],
    userId: row[1],
    skill1: row[2],
    skill2: row[3],
    skill3: row[4],
  }));
};

export const createSkillArrays = (
  skills: {
    name: string;
    userId: string;
    skill1: string;
    skill2: string;
    skill3: string;
  }[]
) => {
  return skills.map((skill) => [
    skill.name,
    skill.userId,
    skill.skill1,
    skill.skill2,
    skill.skill3,
  ]);
};

export const createAchievementObjects = (
  achievementData: [string, string, string, number, string][]
) => {
  return achievementData.map((row) => ({
    id: row[0],
    userId: row[1],
    name: row[2],
    experience: row[3],
    dateCompleted: new Date(row[4]),
  }));
};

export const createAchievementArrays = (
  achievements: {
    id: string;
    userId: string;
    name: string;
    experience: number;
    dateCompleted: Date;
  }[]
) => {
  return achievements.map((achievement) => [
    achievement.id,
    achievement.userId,
    achievement.name,
    achievement.experience,
    achievement.dateCompleted.toISOString(),
  ]);
};
