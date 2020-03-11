
export interface File{
    relativePath: string;
    test:boolean;
    name: string;
}
export default interface Component{
    files: File[];
    mainFile: string;
    trackDir: string;
    rootDir: string;
    origin: string;
    exported: boolean;
}

export type NameAndComponent = [string, Component]
