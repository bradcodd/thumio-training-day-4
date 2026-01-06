
import React, { useState } from 'react';
import { Project } from '../../types';
import ImageUpload from './ImageUpload';
import { DeleteIcon, SparklesIcon } from '../common/Icons';

interface ProjectCardProps {
    project: Project;
    onLoad: (project: Project) => void;
    onUpdate: (project: Project) => void;
    onDelete: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onLoad, onUpdate, onDelete }) => {
    const [name, setName] = useState(project.name);
    const [isEditing, setIsEditing] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleNameBlur = () => {
        if (name.trim() && name !== project.name) {
            onUpdate({ ...project, name: name.trim() });
        } else {
            setName(project.name);
        }
        setIsEditing(false);
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNameBlur();
        } else if (e.key === 'Escape') {
            setName(project.name);
            setIsEditing(false);
        }
    };
    
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Removed window.confirm as it's blocked in the sandboxed environment.
        onDelete(project.id);
    };

    return (
        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-md transition-all duration-300 hover:shadow-sky-500/10 hover:border-gray-700 group">
            <div 
                className="aspect-video bg-black cursor-pointer overflow-hidden" 
                onClick={() => onLoad(project)}
            >
                <img src={project.imageData} alt={project.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-3">
                <div onDoubleClick={() => setIsEditing(true)} title="Double-click to edit name">
                    {isEditing ? (
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            onBlur={handleNameBlur}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-gray-800 text-slate-100 text-sm font-semibold p-1 rounded-md outline-none ring-2 ring-sky-500"
                            autoFocus
                        />
                    ) : (
                        <p className="font-semibold text-slate-200 text-sm truncate">{project.name}</p>
                    )}
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-slate-400">
                        {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                    <button 
                        onClick={handleDelete}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full opacity-50 group-hover:opacity-100"
                        title="Delete Project"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

interface ProjectsViewProps {
  projects: Project[];
  onImageUpload: (file: File) => void;
  onLoadProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  isLoading: boolean;
}

const ProjectsView: React.FC<ProjectsViewProps> = ({ 
    projects, 
    onImageUpload, 
    onLoadProject, 
    onUpdateProject, 
    onDeleteProject, 
    isLoading 
}) => {
  return (
    <div className="w-full h-full p-4 md:p-8 overflow-y-auto">
        <ImageUpload onImageUpload={onImageUpload} isLoading={isLoading} />
        
        <div className="mt-12">
             <h2 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-sky-400" />
                <span>My Projects</span>
            </h2>
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {projects.map(p => (
                        <ProjectCard 
                            key={p.id} 
                            project={p}
                            onLoad={onLoadProject}
                            onUpdate={onUpdateProject}
                            onDelete={onDeleteProject}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 border-2 border-dashed border-gray-800 rounded-lg">
                    <p className="text-slate-400">You have no saved projects.</p>
                    <p className="text-slate-500 text-sm">Download a thumbnail to save it as a project.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default ProjectsView;