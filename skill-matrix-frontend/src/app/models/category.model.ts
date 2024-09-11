export interface Category {
    _id?: string;  // Optional for MongoDB ID
    name: string;
    description?: string;
    parentCategoryId?: string;  // Optional for parent category
  }
  