
import { Project } from '../types';
import { debugLog, debugError } from '../utils/debugLogger';

const PROJECTS_STORAGE_KEY = 'aiThumbnailEditorProjects';

export const loadProjects = (): Project[] => {
  try {
    const storedProjects = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (storedProjects) {
      debugLog('projects', 'Loading projects from localStorage', { count: JSON.parse(storedProjects).length });
      // Sort by creation date, newest first
      return JSON.parse(storedProjects).sort((a: Project, b: Project) => b.createdAt - a.createdAt);
    }
  } catch (error) {
    debugError('projects', "Failed to load projects from localStorage", error);
    console.error("Failed to load projects from localStorage", error);
  }
  return [];
};

export const saveProjects = (projects: Project[]): void => {
  try {
    debugLog('projects', 'Saving projects to localStorage', { count: projects.length });
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    debugError('projects', "Failed to save projects from localStorage", error);
    console.error("Failed to save projects from localStorage", error);
  }
};
