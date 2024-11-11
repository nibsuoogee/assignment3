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
