interface User {
    id: number;
    name: string;
    roles: string[];
    caption: string | null;
    online: boolean;
    role_flags: {
        owner: boolean;
        admin: boolean;
        coadmin: boolean;
        schooling: boolean;
        finance: boolean;
        staff: boolean;
        transport_requests: boolean;
        view_logs: boolean;
    };
}

export interface AllianceInfo {
    credits_total: number;
    credits_current: number;
    user_count: number;
    user_online_count: number;
    rank: number;
    finance_active: boolean;
    users: User[];
}
