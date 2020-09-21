export default (): unknown => ({
    buildingTax: {
        type: 'toggle',
        default: true,
    },
    missionPrisoners: {
        type: 'toggle',
        default: true,
    },
    missionReply: {
        type: 'toggle',
        default: false,
        disabled: () => true,
    },
    memberlistManageUser: {
        type: 'toggle',
        default: false,
    },
    deleteForumPost: {
        type: 'toggle',
        default: false,
    },
    deleteARR: {
        type: 'toggle',
        default: true,
    },
});
