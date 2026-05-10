const allRoles = {
  user: [
    'getPosts',
    'managePosts',
    'getComments',
    'manageComments',
    'getStories',
    'manageStories',
    'getReels',
    'getExplore',
    'getNewFeed',
    'manageProfile',
    'manageFollow',
  ],
  admin: [
    'getUsers',
    'manageUsers',
    'getSessions',
    'getMeetings',
    'getPosts',
    'managePosts',
    'getComments',
    'manageComments',
    'getStories',
    'manageStories',
    'getReels',
    'getExplore',
    'getNewFeed',
    'manageProfile',
    'manageFollow',
  ],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
