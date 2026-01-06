
import { Project } from '../types';

const PROJECTS_STORAGE_KEY = 'aiThumbnailEditorProjects';

export const loadProjects = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (storedProjects) {
      // Sort by creation date, newest first
      return JSON.parse(storedProjects).sort((a: Project, b: Project) => b.createdAt - a.createdAt);
    }
  } catch (error) {
    console.error("Failed to load projects from localStorage", error);
  }
  return [];
};

export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to save projects to localStorage", error);
  }
};
