export const assemblyData = [
    {
        id: 'Soft1',
        version: '2.0.0.0',
        name: 'Software 1',
        isNative: false,
        isSoftware: true,
        depthMax: 3,
        assemblyLinkCount: 2,
        referenceNames: ['dll1', 'dll2']
    },
    {
        id: 'Soft2',
        version: '3.0.0.0',
        name: 'Software 2',
        isNative: false,
        isSoftware: true,
        depthMax: 0,
        assemblyLinkCount: 0,
        referenceNames: []
    },
    {
        id: 'dll1',
        version: '1.0.0.0',
        name: 'dll1 name',
        isNative: false,
        isSoftware: false,
        depthMax: 2,
        assemblyLinkCount: 1,
        referenceNames: ['dll2']
    },
    {
        id: 'dll2',
        version: '2.0.0.0',
        name: 'dll2 name',
        isNative: false,
        isSoftware: false,
        depthMax: 1,
        assemblyLinkCount: 1,
        referenceNames: ['dll3']
    },
    {
        id: 'dll3',
        version: '3.0.0.0',
        name: 'dll3 name',
        isNative: false,
        isSoftware: false,
        depthMax: 0,
        assemblyLinkCount: 0,
        referenceNames: []
    },
];
