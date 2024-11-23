export const createUserObjects = (
  userData: [string, string, number, string, string][]
) => {
  return userData.map((row) => ({
    id: row[0],
    name: row[1],
    level: row[2],
    creationDate: row[3],
    nationality: row[4],
  }));
};

export const createInventoryObjects = (
  inventoryData: [number, string, string, string, string][]
) => {
  return inventoryData.map((row) => ({
    id: row[0],
    user_id: row[1],
    slot1: row[2],
    slot2: row[3],
    slot3: row[4],
  }));
};

export const createSkillObjects = (
  skillData: [string, string, string, string, string][]
) => {
  return skillData.map((row) => ({
    name: row[0],
    user_id: row[1],
    skill1: row[2],
    skill2: row[3],
    skill3: row[4],
  }));
};

export const createAchievementObjects = (
  achievementData: [string, string, string, number, string][]
) => {
  return achievementData.map((row) => ({
    id: row[0],
    user_id: row[1],
    name: row[2],
    experience: row[3],
    dateCompleted: row[4],
  }));
};

export const createUserObjectsFromMongo = (userDocs: any[]) =>
  userDocs.map((userDoc) => ({
    id: userDoc.id,
    name: userDoc.name,
    level: userDoc.level,
    creationDate: userDoc.creationDate,
    nationality: userDoc.nationality,
  }));

export const createInventoryObjectsFromMongo = (inventoryDocs: any[]) =>
  inventoryDocs.map((inventoryDoc) => ({
    id: inventoryDoc.id,
    user_id: inventoryDoc.user_id,
    slot1: inventoryDoc.slot1,
    slot2: inventoryDoc.slot2,
    slot3: inventoryDoc.slot3,
  }));

export const createSkillObjectsFromMongo = (skillDocs: any[]) =>
  skillDocs.map((skillDoc) => ({
    name: skillDoc.name,
    user_id: skillDoc.user_id,
    skill1: skillDoc.skill1,
    skill2: skillDoc.skill2,
    skill3: skillDoc.skill3,
  }));

export const createAchievementObjectsFromMongo = (achievementDocs: any[]) =>
  achievementDocs.map((achievementDoc) => ({
    id: achievementDoc.id,
    user_id: achievementDoc.user_id,
    name: achievementDoc.name,
    experience: achievementDoc.experience,
    dateCompleted: achievementDoc.dateCompleted,
  }));
