import { FC, ReactNode, useEffect } from "react";
import setupIndexedDB from "use-indexeddb";

export const IDBProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const idbConfig = {
        databaseName: "session",
        version: 1,
        stores: [
          {
            name: "user",
            id: { keyPath: "id", autoIncrement: false },
            indices: []
          },
        ],
    };

    useEffect(() => {
        setupIndexedDB(idbConfig)
      }, []);

    return (
        <>
            { children }
        </>
    )
}
