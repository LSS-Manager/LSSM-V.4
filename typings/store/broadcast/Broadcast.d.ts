interface BroadcastMessage {
    type:
        | 'custom'
        | 'var_request'
        | 'var_response'
        | 'vuex_broadcast'
        | 'vuex_request'
        | 'vuex_response';
    sender: string;
    receiver: string;
    data: unknown;
}

interface VarRequestBroadcastMessage extends BroadcastMessage {
    type: 'var_request';
    data: {
        variablePath: string;
    };
}

interface VarResponseBroadcastMessage<returnType = unknown>
    extends BroadcastMessage {
    type: 'var_response';
    data: {
        variablePath: string;
        value: returnType;
    };
}

interface VuexRequestBroadcastMessage extends BroadcastMessage {
    type: 'vuex_request';
    data: {
        statePath: string;
    };
}

interface VuexResponseBroadcastMessage extends BroadcastMessage {
    type: 'vuex_response';
    data: {
        statePath: string;
        value: unknown;
    };
}

interface VuexBroadcastMessage extends BroadcastMessage {
    type: 'vuex_broadcast';
    data: {
        mutationPath: string;
        payload: unknown;
    };
}

interface CustomBroadcastMessage extends BroadcastMessage {
    type: 'custom';
    name: string;
    handler: string;
    data: Record<string, unknown>;
}

type BroadcastRequestMessageType =
    | VarRequestBroadcastMessage
    | VuexRequestBroadcastMessage;

type BroadcastMessageType =
    | CustomBroadcastMessage
    | VarRequestBroadcastMessage
    | VarResponseBroadcastMessage
    | VuexBroadcastMessage
    | VuexRequestBroadcastMessage
    | VuexResponseBroadcastMessage;
