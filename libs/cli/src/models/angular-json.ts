export interface AngularJson {
  $schema: string;
  version: number;
  newProjectRoot: string;
  projects: { [projectId: string]: Project };
  defaultProject: string;
}

export interface Project {
  projectType: ProjectType;
  root: string;
  sourceRoot: string;
  prefix: string;
  architect: {
    build: {
      options: {
        stylePreprocessorOptions: { includePaths: string[] };
        styles: string[];
      };
    };
  };
}

export type ProjectType = 'library' | 'application';
