import {create} from 'zustand';

interface DomainItem {
    id: string;
    name: string;
    price: number;
    domainName: string;
    newDomain: boolean;
    extensionId: string;
    type: string;
    joined: boolean;
    eppKey?: string;
}

interface HostingItem {
    id: string;
    name: string;
    price: number;
    planId: string;
    domain: string;
    cicle: number;
    cicleId: string;
    newDomain: boolean;
    extensionId: string;
    type: string;
}

interface EmailItem {
    id: string;
    name: string;
    price: number;
    planId: string;
    domain: string;
    emailQuantity: number;
    newDomain: boolean;
    extensionId: string;
    type: string;
}

interface ItemStore {
    domainItem: DomainItem | null;
    hostingItem: HostingItem | null;
    emailItem: EmailItem | null;
    setDomainItem: (item: DomainItem | null) => void;
    setHostingItem: (item: HostingItem | null) => void;
    setEmailItem: (item: EmailItem | null) => void;
}

const useItemStore = create<ItemStore>((set) => ({
    domainItem: null,
    hostingItem: null,
    emailItem: null,
    setDomainItem: (item) => set({ domainItem: item }),
    setHostingItem: (item) => set({ hostingItem: item }),
    setEmailItem: (item) => set({ emailItem: item }),
}));

export default useItemStore;
