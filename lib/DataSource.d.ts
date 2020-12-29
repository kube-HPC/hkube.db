/*---------------------------------------------------------
 * Copyright (C) Hkube. All rights reserved.
 *--------------------------------------------------------*/
import Collection from './MongoDB/Collection';
import { Id } from './MongoDB/types';

export type FileMeta = {
    id: string;
    name: string;
    /** The file's location in the repository */
    path: string;
    /** Size in bytes */
    size: number;
    /** Mime type */
    type: string;
    /** An extra text content the user can upload per file */
    meta?: string;
    uploadedAt: number;
};

type Snapshot = { name: string; query: string };

export type DataSource = {
    id?: Id;
    name: string;
    /** A commit message for the description */
    versionDescription: string;
    /** A hash generated by git for each version */
    versionId: string;
    files: FileMeta[];
    isPartial: boolean;
    snapshots?: Snapshot[];
};

export type DataSourceMeta = {
    id: Id;
    name: string;
    versionDescription: string;
    filesCount: number;
    avgFileSize: string;
    totalSize: number;
    fileTypes: string[];
};

export type DataSourceWithMeta = DataSource & DataSourceMeta;

export type DataSourceVersion = {
    id: Id;
    versionDescription: string;
    versionId: string;
};

export interface DataSourcesCollection extends Collection<DataSource>, DataSourceOverrides {
    create(props: { name: string }): Promise<DataSource>;
    fetchAll(): Promise<DataSourceMeta[]>;
    fetch(
        query: Partial<DataSource>,
        props: { fields?: Partial<DataSource>; sort?: Partial<DataSource> }
    ): Promise<DataSource>;
    createVersion(params: {
        name?: string;
        id?: Id;
        versionDescription: string;
    }): Promise<DataSource>;
    updateFiles(params: {
        name?: string;
        id?: Id;
        versionId: string;
        files: FileMeta[];
    }): Promise<DataSource>;
    listVersions(params: { name: string }): Promise<DataSourceVersion[]>;
    upsertSnapshot(params: { name?: string; id?: string; snapshot: Snapshot }): Promise<DataSource>;
}
