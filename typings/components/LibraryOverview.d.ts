import { Libraries } from '../Library';

export interface LibraryOverviewData {
    librarySearch: string;
    libraries: Libraries;
}

export interface LibraryOverviewComputed {
    librariesFiltered: string[];
}
